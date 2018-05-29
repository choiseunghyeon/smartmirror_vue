import Constant from '../constant';
import AxiosAPI from '../api/AxiosAPI.js';
import ForAction from '../api/ForAction.js';

export default {
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
  [Constant.ADD_PLAY_LIST] : (store,payload) => {
    console.log("ADD_PLAY_LIST Called");
    store.commit(Constant.ADD_PLAY_LIST,payload);
  },
  [Constant.ADD_PLAY_LIST_ITEMS] : (store,payload) => {
    store.commit(Constant.ADD_PLAY_LIST_ITEMS,payload);
  },
  [Constant.REMOVE_SEARCHED_LIST] : (store) => {
    store.commit(Constant.REMOVE_SEARCHED_LIST);
  },
  [Constant.REMOVE_PLAY_LIST] : (store) => {
    store.commit(Constant.REMOVE_PLAY_LIST);
  },
  [Constant.REMOVE_PLAY_LIST_ITEMS] : (store) => {
    store.commit(Constant.REMOVE_PLAY_LIST_ITEMS);
  },
  [Constant.ADD_CHANNEL] : (store,payload) => {
    store.commit(Constant.ADD_CHANNEL, payload)
  },
  [Constant.DELETE_CHANNEL] : (store,payload) => {
    store.commit(Constant.DELETE_CHANNEL,payload);
  },
  [Constant.SYNC_CHANNEL] : (store, payload) => {
    store.commit(Constant.SYNC_CHANNEL, payload);
  },
  [Constant.SET_DAY]: (store,payload) => {
    store.commit(Constant.SET_DAY, payload);
  },

  [Constant.TOGGLE_CHANNEL_ACTIVE] : (store) => {
    store.commit(Constant.TOGGLE_CHANNEL_ACTIVE);
  },
  [Constant.TOGGLE_MYLIST_ACTIVE] : (store) => {
    store.commit(Constant.TOGGLE_MYLIST_ACTIVE);
  },
  [Constant.TOGGLE_HAMBURGER_ACTIVE] : (store) => {
    store.commit(Constant.TOGGLE_HAMBURGER_ACTIVE);
  },
  [Constant.TOGGLE_YOUTUBE_ACTIVE] : (store) => {
    store.commit(Constant.TOGGLE_YOUTUBE_ACTIVE);
  },
  [Constant.TOGGLE_WIDGET_ACTIVE] : (store) => {
    store.commit(Constant.TOGGLE_WIDGET_ACTIVE);
  },

  [Constant.MODAL_FLAG] : (store,payload) => {
    console.log("FLAG CALLED",payload);
    store.commit(Constant.MODAL_FLAG,payload);
  },
  [Constant.SET_CHANNELID] : (store,payload) => {
    store.commit(Constant.SET_CHANNELID,payload);
  },

  // about Axios
  [Constant.GET_LIST_COUNT] : (store,payload) => {
    AxiosAPI.countPlayListItems(payload)
    .then((response) => {
      console.log("axiose res: ",response);
    })
    .catch((ex) => {
      console.log("ERROR!!!!", ex);
    })
  },

  [Constant.YOUTUBE_SEARCH] : (store,payload) => {
    AxiosAPI.youtubeSearch(payload)
    .then((response) => {
      console.log(response);
      console.log(response.data.items);
      console.log(response.data.items[0].snippet.title);
      let payload = ForAction.itemsTokenObject(response.data) // items와 token을 object로 만들어서 반환
      store.dispatch(Constant.ADD_SEARCHED_LIST,payload);
      store.dispatch(Constant.MODAL_FLAG,"SearchedList");
    })
  },

  [Constant.GET_PLAY_LISTS] : async (store,payload) => {

      try {
        store.commit(Constant.SET_LOADING_STATE,true);
        const response = await AxiosAPI.playLists(payload)
        console.log("RESPONSE: ",response);
        let filteredObject = ForAction.filteredPlayListObject(response.data);

        for (let i = 0; i < filteredObject.items.length; i++) {
          let response = await AxiosAPI.countPlayListItems(filteredObject.items[i].id)
          filteredObject.items[i].totalPage = response.data.pageInfo.totalResults

        }
        console.log("filteredPlayListObject",filteredObject);

        await store.commit(Constant.SET_LOADING_STATE,false);
        await store.dispatch(Constant.ADD_PLAY_LIST,{items:filteredObject.items, nextToken:filteredObject.nextPageToken});

      } catch (e) {
        console.error(error);
      }



  },

  [Constant.GET_PLAY_LIST_ITEMS] : (store,payload) => {
    AxiosAPI.playListItems(payload)
    .then((response) => {
      console.log("listitmes: ",response.data);
      let checkedData = ForAction.checkRemovedVideo(response.data);
      store.dispatch(Constant.ADD_PLAY_LIST_ITEMS,checkedData);
    })
  },

  [Constant.SET_LOADING_STATE] : (store, payload) => {
    store.commit(Constant.SET_LOADING_STATE,payload);
  },

  [Constant.VIDEO_DATA_SAVE] : (store,payload) => {
    console.log("VIDEO_DATA_SAVE called");
    store.commit(Constant.VIDEO_DATA_SAVE,payload);
  },

}
