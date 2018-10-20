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
  [Constant.VIDEO_CHANGE] : (store,payload) => {
    store.commit(Constant.VIDEO_CHANGE, payload)
  },

  [Constant.SET_VIDEO_LIST] : (store,payload) => {
    store.commit(Constant.SET_VIDEO_LIST, payload);
    store.dispatch(Constant.VIDEO_CHANGE, {videoId:payload.idArray[payload.num]});
  },

  //  Controller.vue
  [Constant.SET_SNACKBAR] : (store,payload) => {
    store.commit(Constant.SET_SNACKBAR,payload);
  },
  [Constant.TOGGLE_YOUTUBESHEET] : (store) => {
    store.commit(Constant.TOGGLE_YOUTUBESHEET);
  },
  // YoutubeChannel.vue
  [Constant.GET_PLAY_LISTS] : async (store,payload) => {
    store.dispatch(Constant.SET_SNACKBAR, {flag:true,text:"목록을 불러오는 중입니다.",time:0,progress:true})
    try {
      const response = await AxiosAPI.playLists(payload)
      console.log("RESPONSE: ",response);
      let filteredObject = ForAction.filteredPlayListObject(response.data);

      for (let i = 0; i < filteredObject.items.length; i++) {
        let response = await AxiosAPI.countPlayListItems(filteredObject.items[i].id)
        filteredObject.items[i].totalPage = response.data.pageInfo.totalResults

      }
      console.log("filteredPlayListObject",filteredObject);

      await store.dispatch(Constant.ADD_PLAY_LIST,{items:filteredObject.items, nextToken:filteredObject.nextPageToken});

    } catch (e) {
      console.error(error);
    }
    store.dispatch(Constant.SET_SNACKBAR, {flag:false,text:"목록을 불러오는 중입니다.",time:0,progress:false})
  },
  [Constant.GET_LIST_COUNT] : (store,payload) => {
    AxiosAPI.countPlayListItems(payload)
    .then((response) => {
      console.log("axiose res: ",response);
    })
    .catch((ex) => {
      console.log("ERROR!!!!", ex);
    })
  },
  [Constant.GET_PLAY_LIST_ITEMS] : async (store,payload) => {
    store.dispatch(Constant.SET_SNACKBAR, {flag:true,text:"영상을 불러오는 중입니다.",time:0,progress:true})
    await AxiosAPI.playListItems(payload)
    .then((response) => {
      console.log("listitmes: ",response.data);
      let checkedData = ForAction.checkRemovedVideo(response.data);
      store.dispatch(Constant.ADD_PLAY_LIST_ITEMS,checkedData);
    })
    store.dispatch(Constant.SET_SNACKBAR, {flag:false,text:"영상을 불러오는 중입니다.",time:0,progress:false})
  },

  [Constant.ADD_PLAY_LIST] : (store,payload) => {
    console.log("ADD_PLAY_LIST Called");
    store.commit(Constant.ADD_PLAY_LIST,payload);
  },
  [Constant.ADD_PLAY_LIST_ITEMS] : (store,payload) => {
    store.commit(Constant.ADD_PLAY_LIST_ITEMS,payload);
  },
  [Constant.ADD_CHANNEL] : async (store,payload) => {
    await AxiosAPI.postChannel(payload)
    .then((response) => {
      console.log("channelItem: ",response.data);
      store.dispatch(Constant.SET_SNACKBAR, {flag:true,text:"채널이 저장 되었습니다.",time:1000,progress:false})
    })
    store.dispatch(Constant.GET_CHANNEL);
  },

  [Constant.SYNC_CHANNEL_NAVIGATION] : (store,payload) => {
    store.commit(Constant.SYNC_CHANNEL_NAVIGATION,payload);
  },
  [Constant.GET_CHANNEL] : (store) => {
    console.log("CALLED GET_CHANNEL");
    AxiosAPI.getChannel()
    .then((response) => {
      console.log("channelList: ",response.data);
      store.commit(Constant.GET_CHANNEL, response.data);
    })
  },
  [Constant.SET_CHANNELID] : (store,payload) => {
    store.commit(Constant.SET_CHANNELID,payload);
  },

  [Constant.REMOVE_PLAY_LIST] : (store) => {
    store.commit(Constant.REMOVE_PLAY_LIST);
  },
  [Constant.REMOVE_PLAY_LIST_ITEMS] : (store) => {
    store.commit(Constant.REMOVE_PLAY_LIST_ITEMS);
  },
  [Constant.DELETE_CHANNEL] : async (store,payload) => {
    await AxiosAPI.deleteChannel(payload)
    .then((response) => {
      console.log("DELETE!!");
      console.log(response.data);
      store.dispatch(Constant.SET_SNACKBAR, {flag:true,text:"해당 채널이 삭제되었습니다.",time:1500,progress:false})
    })
    await store.dispatch(Constant.GET_CHANNEL);
  },


  //MostPopular.vue
  [Constant.GET_MOSTPOPULAR_VIDEOS] : async (store, payload) => {
    console.log("GET_MOSTPOPULAR_VIDEOS: ", payload);
    store.dispatch(Constant.SET_SNACKBAR, {flag:true,text:"영상을 불러오는 중입니다.",time:0,progress:true})
    await AxiosAPI.mostPopularVideos(payload)
    .then((response) => {
      console.log("RESPONSE: ");
      console.log(response);
      let payload = ForAction.itemsTokenObject(response.data) // items와 token을 object로 만들어서 반환
      store.dispatch(Constant.ADD_MOSTPOPULAR_LIST,payload);
    })
    store.dispatch(Constant.SET_SNACKBAR, {flag:false,text:"영상을 불러오는 중입니다.",time:0,progress:false})
  },

  [Constant.ADD_MOSTPOPULAR_LIST] : (store, payload) => {
    store.commit(Constant.ADD_MOSTPOPULAR_LIST, payload);
  },

  [Constant.REMOVE_MOSTPOPULAR_LIST] : (store) => {
    store.commit(Constant.REMOVE_MOSTPOPULAR_LIST);
  },

  //SearchedList.vue
  [Constant.YOUTUBE_SEARCH] : async (store,payload) => {
    store.dispatch(Constant.SET_SNACKBAR, {flag:true,text:"영상을 불러오는 중입니다.",time:0,progress:true})
    console.log(payload);
    await AxiosAPI.youtubeSearch(payload)
    .then((response) => {
      console.log("RESPONSE: ");
      console.log(response);
      // console.log(response.data.items);
      // console.log(response.data.items[0].snippet.title);
      let payload = ForAction.itemsTokenObject(response.data) // items와 token을 object로 만들어서 반환
      store.dispatch(Constant.ADD_SEARCHED_LIST,payload);
    })
    store.dispatch(Constant.SET_SNACKBAR, {flag:false,text:"영상을 불러오는 중입니다.",time:0,progress:false})
  },

  [Constant.PLAY_VIDEO_LIST] : (store) => {
    store.commit(Constant.PLAY_VIDEO_LIST)
  },
  [Constant.ADD_SEARCHED_LIST] : (store,payload) => {

    store.commit(Constant.ADD_SEARCHED_LIST,payload);
  },
  [Constant.CHANGE_KEYWORD] : (store, payload) => {

    store.commit(Constant.CHANGE_KEYWORD, payload); // 검색명 저장 및 수정
  },
  [Constant.REMOVE_SEARCHED_LIST] : (store) => {
    store.commit(Constant.REMOVE_SEARCHED_LIST);
  },

  //MyList.vue
  [Constant.VIDEO_DATA_SAVE] : (store,payload) => {
    console.log("VIDEO_DATA_SAVE called");
    store.commit(Constant.VIDEO_DATA_SAVE,payload);
  },

  [Constant.GET_MYLISTNAMES] : (store) => {
    console.log("GET_MYLISTNAMES called");
    AxiosAPI.getMyListNames()
    .then((response) => {
      let data = response.data;
      data.forEach((val) => {
        val['imgUrl'] = val.content.length > 0 ? val.content[0].imgUrl : '../../static/images/x.png';
      });
      store.commit(Constant.GET_MYLISTNAMES,response.data);
    });
  },
  [Constant.POST_MYLISTNAME] : (store, payload) => {
    AxiosAPI.postMyListName(payload)
    .then((response) => {
      store.dispatch(Constant.GET_MYLISTNAMES);
      let text = payload.name + "목록이 생성되었습니다."
      store.dispatch(Constant.SET_SNACKBAR, {flag:true,text:text,time:1000,progress:false})
    })
  },
  [Constant.PUT_MYLIST] : (store, payload) => {
    AxiosAPI.putMyList(payload)
    .then((response) => {
      store.dispatch(Constant.GET_MYLISTNAMES);
    })
  },
  [Constant.DELETE_MYLIST] : (store, payload) => {
    AxiosAPI.deleteMyList(payload)
    .then((response) => {
      store.dispatch(Constant.GET_MYLISTNAMES);
    })
  },

  [Constant.SET_MYLIST_INDEX] : (store, payload) => {
    store.commit(Constant.SET_MYLIST_INDEX,payload);
  },
  [Constant.SYNC_MYLIST_NAVIGATION] : (store, payload) => {
    store.commit(Constant.SYNC_MYLIST_NAVIGATION, payload);
  },

}
