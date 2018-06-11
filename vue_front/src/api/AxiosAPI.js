import CONF from '../ConfigUrl.js';
import axios from 'axios';
import ApiKey from '../ApiKey.js';

export default {
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
      q: payload.keword,
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

}
