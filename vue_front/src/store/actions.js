import Constant from '../Constant.js';
import AxiosAPI from '../api/AxiosAPI.js';
import ForAction from '../api/ForAction.js';

export default {
  /* ===== MIRROR ===== */
  [Constant.SET_DAY]: (store,payload) => {
    store.commit(Constant.SET_DAY, payload);
  },


  /* ===== CONTROLLER ===== */
  // Socket
  [Constant.VIDEO_CHANGE] : (store,payload) => { // 각 컴포넌트에서 영상이 바뀌면 VIDEO_CHANGE 실행
    store.commit(Constant.VIDEO_CHANGE, payload)
  },

  [Constant.SET_VIDEO_LIST] : (store,payload) => { // LIST를 가지는 각 컴포넌트에서 영상이 바뀌면 SET_VIDEO_LIST 실행
    store.commit(Constant.SET_VIDEO_LIST, payload);
    store.dispatch(Constant.VIDEO_CHANGE, {videoId:payload.idArray[payload.num]});
  },

  //  Controller.vue
  [Constant.SET_SNACKBAR] : (store,payload) => { // For System Message
    store.commit(Constant.SET_SNACKBAR,payload);
  },
  [Constant.TOGGLE_YOUTUBESHEET] : (store) => { // For Video Contorller Toggle
    store.commit(Constant.TOGGLE_YOUTUBESHEET);
  },
  [Constant.TOGGLE_LIGHTSHEET] : (store) => {
    store.commit(Constant.TOGGLE_LIGHTSHEET);  
  },
  // YoutubeChannel.vue
  [Constant.GET_PLAY_LISTS] : async (store,payload) => { // Youtube로 부터 PlayList정보 가져오기
    store.dispatch(Constant.SET_SNACKBAR, {flag:true,text:"목록을 불러오는 중입니다.",time:0,progress:true})
    try {
      const response = await AxiosAPI.playLists(payload)
      console.log("RESPONSE: ",response);
      // response 데이터를 가공
      let filteredObject = ForAction.filteredPlayListObject(response.data);

      for (let i = 0; i < filteredObject.items.length; i++) {
        // 해당 PlayList가 가진 ListItem의 개수 세기
        let response = await AxiosAPI.countPlayListItems(filteredObject.items[i].id)
        filteredObject.items[i].totalPage = response.data.pageInfo.totalResults

      }
      console.log("filteredPlayListObject",filteredObject);

      store.dispatch(Constant.ADD_PLAY_LIST,{items:filteredObject.items, nextToken:filteredObject.nextPageToken});
      store.dispatch(Constant.SET_SNACKBAR, {flag:false,text:"목록을 불러오는 중입니다.",time:0,progress:false})

    } catch (err) {
      console.error(err);
    }
  },
  [Constant.GET_PLAY_LIST_ITEMS] : (store,payload) => { // Youtube로 부터 선택된 PlayList의 ListItem정보 가져오기
    store.dispatch(Constant.SET_SNACKBAR, {flag:true,text:"영상을 불러오는 중입니다.",time:0,progress:true})
    AxiosAPI.playListItems(payload)
    .then((response) => {
      console.log("listitmes: ",response.data);
      // 삭제된 영상을 제외한 데이터 가져오기
      let checkedData = ForAction.checkRemovedVideo(response.data);
      store.dispatch(Constant.ADD_PLAY_LIST_ITEMS,checkedData);
      store.dispatch(Constant.SET_SNACKBAR, {flag:false,text:"영상을 불러오는 중입니다.",time:0,progress:false})
    })
  },

  [Constant.ADD_PLAY_LIST] : (store,payload) => { // selectedPlayLists에 payload push하기
    console.log("ADD_PLAY_LIST Called");
    store.commit(Constant.ADD_PLAY_LIST,payload);
  },
  [Constant.ADD_PLAY_LIST_ITEMS] : (store,payload) => { // playListItem에 payload push하기
    store.commit(Constant.ADD_PLAY_LIST_ITEMS,payload);
  },
  [Constant.ADD_CHANNEL] : (store,payload) => { // Server DB에 Channel 정보 추가
   AxiosAPI.postChannel(payload)
    .then((response) => {
      console.log("channelItem: ",response.data);
      store.dispatch(Constant.SET_SNACKBAR, {flag:true,text:"채널이 저장 되었습니다.",time:1000,progress:false})
      store.dispatch(Constant.GET_CHANNEL);
    })
  },

  [Constant.SYNC_CHANNEL_NAVIGATION] : (store,payload) => { // YoutubeChannel.vue에서 bottom-nav component에서 쓰임
    store.commit(Constant.SYNC_CHANNEL_NAVIGATION,payload);
  },
  [Constant.GET_CHANNEL] : (store) => { // Server로부터 Channel 정보 가져오기
    console.log("CALLED GET_CHANNEL");
    AxiosAPI.getChannel()
    .then((response) => {
      console.log("channelList: ",response.data);
      store.commit(Constant.GET_CHANNEL, response.data);
    })
  },
  [Constant.SET_CHANNELID] : (store,payload) => { //selectedChannel 값 변경
    store.commit(Constant.SET_CHANNELID,payload);
  },

  [Constant.REMOVE_PLAY_LIST] : (store) => { // selectedPlayLists 초기화
    store.commit(Constant.REMOVE_PLAY_LIST);
  },
  [Constant.REMOVE_PLAY_LIST_ITEMS] : (store) => { // playListItems 초기화
    store.commit(Constant.REMOVE_PLAY_LIST_ITEMS);
  },
  [Constant.DELETE_CHANNEL] :  (store,payload) => { // Server DB에 있는 Channel 정보 삭제
   AxiosAPI.deleteChannel(payload)
    .then((response) => {
      console.log("DELETE!!");
      console.log(response.data);
      store.dispatch(Constant.SET_SNACKBAR, {flag:true,text:"해당 채널이 삭제되었습니다.",time:1500,progress:false})
      store.dispatch(Constant.GET_CHANNEL);
    })
  },


  //MostPopular.vue
  [Constant.GET_MOSTPOPULAR_VIDEOS] : (store, payload) => { // Youtube로 부터 Most Popular 영상들 받아오기
    console.log("GET_MOSTPOPULAR_VIDEOS: ", payload);
    store.dispatch(Constant.SET_SNACKBAR, {flag:true,text:"영상을 불러오는 중입니다.",time:0,progress:true})
    AxiosAPI.mostPopularVideos(payload)
    .then((response) => {
      console.log("RESPONSE: ");
      console.log(response);
      let payload = ForAction.itemsTokenObject(response.data) // items와 token을 object로 만들어서 반환
      store.dispatch(Constant.ADD_MOSTPOPULAR_LIST,payload);
      store.dispatch(Constant.SET_SNACKBAR, {flag:false,text:"영상을 불러오는 중입니다.",time:0,progress:false})
    })
  },

  [Constant.ADD_MOSTPOPULAR_LIST] : (store, payload) => { //mostPopularVideoLists에 payload push
    store.commit(Constant.ADD_MOSTPOPULAR_LIST, payload);
  },

  [Constant.REMOVE_MOSTPOPULAR_LIST] : (store) => {// mostPopularVideoLists 초기화
    store.commit(Constant.REMOVE_MOSTPOPULAR_LIST);
  },

  //SearchedList.vue
  [Constant.YOUTUBE_SEARCH] :  (store,payload) => { // 검색 키워드를 기반으로 Youtube에서 영상 가져오기
    store.dispatch(Constant.SET_SNACKBAR, {flag:true,text:"영상을 불러오는 중입니다.",time:0,progress:true})
    console.log(payload);
    AxiosAPI.youtubeSearch(payload)
    .then((response) => {
      console.log("RESPONSE: ");
      console.log(response);
      // console.log(response.data.items);
      // console.log(response.data.items[0].snippet.title);
      let payload = ForAction.itemsTokenObject(response.data) // items와 token을 object로 만들어서 반환
      store.dispatch(Constant.ADD_SEARCHED_LIST,payload);
      store.dispatch(Constant.SET_SNACKBAR, {flag:false,text:"영상을 불러오는 중입니다.",time:0,progress:false})
    })
  },
  //
  // [Constant.PLAY_VIDEO_LIST] : (store) => {
  //   store.commit(Constant.PLAY_VIDEO_LIST)
  // },
  [Constant.ADD_SEARCHED_LIST] : (store,payload) => { // searchedLists에 payload push

    store.commit(Constant.ADD_SEARCHED_LIST,payload);
  },
  [Constant.CHANGE_KEYWORD] : (store, payload) => { // 검색명을 searchKeyword에 저장

    store.commit(Constant.CHANGE_KEYWORD, payload); // 검색명 저장 및 수정
  },
  [Constant.REMOVE_SEARCHED_LIST] : (store) => { // searchedLists 초기화
    store.commit(Constant.REMOVE_SEARCHED_LIST);
  },

  //MyList.vue
  [Constant.VIDEO_DATA_SAVE] : (store,payload) => { // videoDataSave에 payload 저장
    console.log("VIDEO_DATA_SAVE called");
    store.commit(Constant.VIDEO_DATA_SAVE,payload);
  },

  [Constant.GET_MYLISTNAMES] : (store) => { // Server로부터 MyListNames 가져오기
    console.log("GET_MYLISTNAMES called");
    AxiosAPI.getMyListNames()
    .then((response) => {
      let data = response.data;
      data.forEach((val) => {
        // 소유한 영상이 없으면 기본 이미지로 셋팅
        val['imgUrl'] = val.content.length > 0 ? val.content[0].imgUrl : '../../static/images/x.png';
      });
      store.commit(Constant.GET_MYLISTNAMES,response.data);
    });
  },
  [Constant.POST_MYLISTNAME] : (store, payload) => { // MyList를 Server에 저장
    AxiosAPI.postMyListName(payload)
    .then((response) => {
      store.dispatch(Constant.GET_MYLISTNAMES);
      let text = payload.name + "목록이 생성되었습니다."
      store.dispatch(Constant.SET_SNACKBAR, {flag:true,text:text,time:1000,progress:false})
    })
  },
  [Constant.PUT_MYLIST] : (store, payload) => { // MyList 업데이트
    AxiosAPI.putMyList(payload)
    .then((response) => {
      store.dispatch(Constant.GET_MYLISTNAMES);
    })
  },
  [Constant.DELETE_MYLIST] : (store, payload) => { // 해당 MyList 삭제
    AxiosAPI.deleteMyList(payload)
    .then((response) => {
      store.dispatch(Constant.GET_MYLISTNAMES);
    })
  },

  [Constant.SET_MYLIST_INDEX] : (store, payload) => { // selectedListIndex에 선택된 index 저장
    store.commit(Constant.SET_MYLIST_INDEX,payload);
  },
  [Constant.SYNC_MYLIST_NAVIGATION] : (store, payload) => { // MyListBridge.vue에서 bottom-nav component에서 쓰임
    store.commit(Constant.SYNC_MYLIST_NAVIGATION, payload);
  },

}
