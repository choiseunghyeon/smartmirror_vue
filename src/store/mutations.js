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
  [Constant.SEARCHED_LIST] : (state,payload) => {
    console.log("SEARCHED_LIST called");
    state.searchedLists=payload;
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
  }
}
