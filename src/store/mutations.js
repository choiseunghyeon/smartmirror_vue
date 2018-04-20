import Constant from '../Constant.js';

export default {
  [Constant.VIDEO_CHANGE] : (state, payload) => {
    console.log("VIDEO_CHANGE "+payload);
    state.currentVideoId=payload.videoId;
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
  [Constant.ADD_SEARCHED_LIST] : (state,payload) => {
    console.log("ADD_SEARCHED_LIST called");

    state.searchedLists.push(payload);
  },
  [Constant.ADD_PLAY_LIST] : (state, payload) => {
    state.selectedPlayLists.push(payload)
  },
  [Constant.ADD_PLAY_LIST_ITEMS] : (state,payload) => {
    state.playListItems.push(payload);
  },
  [Constant.REMOVE_SEARCHED_LIST] : (state) => {
    state.searchedLists=[];
  },
  [Constant.REMOVE_PLAY_LIST] : (state) => {
    state.selectedPlayLists=[];
  },
  [Constant.REMOVE_PLAY_LIST_ITEMS] : (state) => {
    state.playListItems=[];
  },
  [Constant.ADD_CHANNEL] : (state,payload) => {
    console.log("ADD_CHANNEL called");
    state.channelLists.push(payload);
    localStorage.localChannelLists=JSON.stringify(state.channelLists)
  },
  [Constant.DELETE_CHANNEL] : (state, payload) => {
    state.channelLists.splice(payload,1);
    localStorage.localChannelLists=JSON.stringify(state.channelLists)
  },
  [Constant.SYNC_CHANNEL] : (state, payload) => {
    console.log("SYNC_CHANNEL called");
    state.channelLists = payload;
  },
  [Constant.SET_DAY] : (state, payload) => {
    console.log("SET DAY called");
    state.dayObject=payload;
  },

  // about isActive of state
  [Constant.TOGGLE_CHANNEL_ACTIVE] : (state) => {
    state.isActive.channellists = !state.isActive.channellists;
  },
  [Constant.TOGGLE_HAMBURGER_ACTIVE] : (state) => {
    state.isActive.hamburger = !state.isActive.hamburger;
  },
  [Constant.TOGGLE_YOUTUBE_ACTIVE] : (state) => {
    state.isActive.youtube = !state.isActive.youtube;
  },
  [Constant.TOGGLE_WIDGET_ACTIVE] : (state) => {
    state.isActive.widget = !state.isActive.widget;
  },
  [Constant.MODAL_FLAG] : (state,payload) => {
    console.log("MODAL_FLAG called");
    state.modalFlag = payload;
  },
  [Constant.SET_CHANNELID] : (state, payload) => {
    state.selectedChannel = payload;
  },

  [Constant.SET_LOADING_STATE] : (state, payload) => {
    state.isActive.loading = payload;
  },
}
