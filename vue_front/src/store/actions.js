import Constant from '../constant';
import AxiosAPI from '../api/AxiosAPI.js';
import ForAction from '../api/ForAction.js';

export default {
  /* ===== MIRROR ===== */
  [Constant.SET_DAY]: (store,payload) => {
    store.commit(Constant.SET_DAY, payload);
  },


  /* ===== CONTROLLER ===== */

  // YoutubeChannel.vue
  [Constant.GET_PLAY_LISTS] : async (store,payload) => {
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
  [Constant.GET_PLAY_LIST_ITEMS] : (store,payload) => {
    AxiosAPI.playListItems(payload)
    .then((response) => {
      console.log("listitmes: ",response.data);
      let checkedData = ForAction.checkRemovedVideo(response.data);
      store.dispatch(Constant.ADD_PLAY_LIST_ITEMS,checkedData);
    })
  },

  [Constant.ADD_PLAY_LIST] : (store,payload) => {
    console.log("ADD_PLAY_LIST Called");
    store.commit(Constant.ADD_PLAY_LIST,payload);
  },
  [Constant.ADD_PLAY_LIST_ITEMS] : (store,payload) => {
    store.commit(Constant.ADD_PLAY_LIST_ITEMS,payload);
  },
  [Constant.ADD_CHANNEL] : (store,payload) => {
    store.commit(Constant.ADD_CHANNEL, payload)
  },

  [Constant.SYNC_CHANNEL_NAVIGATION] : (store,payload) => {
    store.commit(Constant.SYNC_CHANNEL_NAVIGATION,payload);
  },
  [Constant.SYNC_CHANNEL] : (store, payload) => {
    store.commit(Constant.SYNC_CHANNEL, payload);
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
  [Constant.DELETE_CHANNEL] : (store,payload) => {
    store.commit(Constant.DELETE_CHANNEL,payload);
  },




  //MostPopular.vue
  [Constant.GET_MOSTPOPULAR_VIDEOS] : (store, payload) => {
    console.log("GET_MOSTPOPULAR_VIDEOS: ", payload);
    AxiosAPI.mostPopularVideos(payload)
    .then((response) => {
      console.log("RESPONSE: ");
      console.log(response);
      let payload = ForAction.itemsTokenObject(response.data) // items와 token을 object로 만들어서 반환
      store.dispatch(Constant.ADD_MOSTPOPULAR_LIST,payload);
    })
  },

  [Constant.ADD_MOSTPOPULAR_LIST] : (store, payload) => {
    store.commit(Constant.ADD_MOSTPOPULAR_LIST, payload);
  },

  [Constant.REMOVE_MOSTPOPULAR_LIST] : (store) => {
    store.commit(Constant.REMOVE_MOSTPOPULAR_LIST);
  },

  //SearchedList.vue
  [Constant.YOUTUBE_SEARCH] : (store,payload) => {
    console.log(payload);
    AxiosAPI.youtubeSearch(payload)
    .then((response) => {
      console.log("RESPONSE: ");
      console.log(response);
      // console.log(response.data.items);
      // console.log(response.data.items[0].snippet.title);
      let payload = ForAction.itemsTokenObject(response.data) // items와 token을 object로 만들어서 반환
      store.dispatch(Constant.ADD_SEARCHED_LIST,payload);
    })
  },
  [Constant.VIDEO_CHANGE] : (store,payload) => {
    store.commit(Constant.VIDEO_CHANGE, payload)
  },
  [Constant.SET_VIDEO_LIST] : (store,payload) => {
    store.commit(Constant.SET_VIDEO_LIST, payload);
    store.dispatch(Constant.VIDEO_CHANGE, {videoId:payload.idArray[payload.num]});
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


  [Constant.VIDEO_DATA_SAVE] : (store,payload) => {
    console.log("VIDEO_DATA_SAVE called");
    store.commit(Constant.VIDEO_DATA_SAVE,payload);
  },

}
