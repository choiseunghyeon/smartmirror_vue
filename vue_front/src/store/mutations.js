import Constant from '../Constant.js';

export default {
  /* ===== MIRROR ===== */
  [Constant.SET_DAY] : (state, payload) => {
    console.log("SET DAY called");
    state.dayObject=payload;
  },

  /* ===== CONTROLLER ===== */

  // YoutubeChannel.vue
  [Constant.ADD_PLAY_LIST] : (state, payload) => {
    state.selectedPlayLists.push(payload)
  },
  [Constant.ADD_PLAY_LIST_ITEMS] : (state,payload) => {
    state.playListItems.push(payload);
  },
  [Constant.ADD_CHANNEL] : (state,payload) => {
    console.log("ADD_CHANNEL called");
    state.channelLists.push(payload);
    localStorage.localChannelLists=JSON.stringify(state.channelLists)
  },

  [Constant.SYNC_CHANNEL] : (state, payload) => {
    console.log("SYNC_CHANNEL called");
    state.channelLists = payload;
  },
  [Constant.SYNC_CHANNEL_NAVIGATION] : (state, payload) => {
    state.channelNavVal = payload;
  },

  [Constant.SET_CHANNELID] : (state, payload) => {
    state.selectedChannel = payload;
  },

  [Constant.DELETE_CHANNEL] : (state, payload) => {
    state.channelLists.splice(payload,1);
    localStorage.localChannelLists=JSON.stringify(state.channelLists)
  },
  [Constant.REMOVE_PLAY_LIST] : (state) => {
    state.selectedPlayLists=[];
  },
  [Constant.REMOVE_PLAY_LIST_ITEMS] : (state) => {
    state.playListItems=[];
  },

  //MostPopular.vue
  [Constant.ADD_MOSTPOPULAR_LIST] : (state, payload) => {
    console.log("ADD_MOSTPOPULAR_LIST called");
    state.mostPopularVideoLists.push(payload);
  },

  [Constant.REMOVE_MOSTPOPULAR_LIST] : (state) => {
    state.mostPopularVideoLists=[];
  },

  //SearchedList.vue
  [Constant.ADD_SEARCHED_LIST] : (state,payload) => {
    console.log("ADD_SEARCHED_LIST called");

    state.searchedLists.push(payload);
  },

  [Constant.VIDEO_CHANGE] : (state, payload) => {
    console.log("VIDEO_CHANGE "+payload);
    state.currentVideoId=payload.videoId;
  },
  [Constant.CHANGE_KEYWORD] : (state, payload) => {
    console.log("mutation "+payload);
    state.searchKeyword = payload.keyword;
  },
  [Constant.SET_VIDEO_LIST] : (state,payload) => {
    state.videoList=payload;
  },
  [Constant.PLAY_VIDEO_LIST] : (state) => {
    if (state.videoList.num == state.videoList.length-1 ) {
      state.videoList.num=0;
    } else {
      state.videoList.num+=1;
      state.currentVideoId=state.videoList.idArray[state.videoList.num]
    }
  },

  [Constant.REMOVE_SEARCHED_LIST] : (state) => {
    state.searchedLists=[];
  },


  //about MyList
  [Constant.VIDEO_DATA_SAVE] : (state,payload) => {
    state.videoDataSave = payload;
  },
  [Constant.SET_MYLIST_NAME] : (state, payload) => {
    state.selectedMyListName = payload;
  },
  [Constant.SYNC_MYLIST_NAVIGATION] : (state, payload) => {
    state.myListNavVal = payload;
  },

}
