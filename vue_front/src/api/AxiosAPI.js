import CONF from '../ConfigUrl.js';
import axios from 'axios';
import ApiKey from '../ApiKey.js';

export default {
  /* SERVER */
  getChannel: function(){
    return axios.get(CONF.CHANNEL);
  },
  postChannel: function(payload){
    console.log("postChannel payload: ",payload);
    return axios.post(CONF.CHANNEL,{
      data: payload
    })
  },
  deleteChannel: function(payload){
    console.log("deleteChannel payload: ",payload);
    return axios.delete(CONF.CHANNEL,{
      data: {id: payload}
    })
  },
  getMyListNames: function(){ // MyList 목록들 가져오기
    return axios.get(CONF.MYLIST);
  },
  postMyListName: function(payload){ // MyList 목록 생성
    console.log("postMyList payload: ",payload);
    return axios.post(CONF.MYLIST,{
      data: payload
    })
  },
  putMyList: function(payload){ // MyList 목록 생성
    console.log("putMyList payload: ",payload);
    return axios.put(CONF.MYLIST,{
      data: { id:payload.id, content: payload.content }
    })
  },
  deleteMyList: function(payload){
    console.log("deleteMyList payload: ",payload);
    return axios.delete(CONF.MYLIST,{
      data: {id: payload}
    })
  },
  playLists: function(payload){
    let request = {
      part:'snippet',
      channelId: payload.channelId,
      maxResults: 6,
      key: ApiKey.youtube,
    };
    // 추가적인 요청이면 token을 넣어서 다음 데이터 요청
    if( payload.hasOwnProperty("nextPageToken") )  request.pageToken = payload.nextPageToken;
    console.log("playList payload: ",request);
    return axios.get(CONF.PLAY_LISTS,{
      params: request
    })
  },
  playListItems: function(payload){
    let request = {
      part:'snippet',
      playlistId: payload.playlistId,
      maxResults: 6,
      key: ApiKey.youtube,
    };
    // 추가적인 요청이면 token을 넣어서 다음 데이터 요청
    if( payload.hasOwnProperty("nextPageToken") )  request.pageToken = payload.nextPageToken;

    return axios.get(CONF.PLAY_LIST_ITEMS, {
      params: request
    })
  },
  countPlayListItems : function(playlistId){
    return axios.get(CONF.PLAY_LIST_ITEMS,{
      params : {
        part:'id',
        playlistId: playlistId,
        key: ApiKey.youtube,
      }
    }) // the end of axios
  },
  youtubeSearch: function(payload){
    let order = {'최신순':'date','조회수':'viewCount'};
    let request = {
      part:'snippet',
      q: payload.keyword,
      maxResults: 6,
      order: order.조회수,
      key: ApiKey.youtube,
    };
    // 추가적인 요청이면 token을 넣어서 다음 데이터 요청
    if( payload.hasOwnProperty("nextPageToken") )  request.pageToken = payload.nextPageToken;
    console.log("youtubeSearch payload: ",request);
    return axios.get(CONF.YOUTUBE_SEARCH, {
      params: request
    })
  },
  mostPopularVideos: function(payload){
    console.log("In mostPopularVideos: ",payload);
    let request = {
      part:'snippet',
      chart: "mostPopular",
      maxResults: 6,
      key: ApiKey.youtube
    };
    // 추가적인 요청이면 token을 넣어서 다음 데이터 요청
    if( payload.hasOwnProperty("nextPageToken") )  request.pageToken = payload.nextPageToken;
    console.log("mostPopularVideos payload: ",request);
    return axios.get(CONF.YOUTUBE_SEARCH, {
      params: request
    });
  },

}
