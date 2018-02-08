import Constant from '../Constant.js';

export default {
  [Constant.VIDEO_CHANGE] : (state, payload) => {
    console.log("VIDEO_CHANGE "+payload);
    state.currentVideoId=payload.videoId;
  },
  [Constant.VIDEO_LIST] : (state,payload) => {
    state.videoList.idArray=payload;
    state.videoList.num=0;
    state.currentVideoId=state.videoList.idArray[state.videoList.num]
  },
  [Constant.SEARCHED_LIST] : (state,payload) => {
    console.log("SEARCHED_LIST called");
    state.searchedLists=payload;
  },
  [Constant.ADD_CHANNEL] : (state,payload) => {
    console.log("ADD_CHANNEL called");
    state.channelLists.push(payload);
  }
}
