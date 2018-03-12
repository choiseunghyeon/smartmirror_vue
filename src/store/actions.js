import Constant from '../constant';

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
  [Constant.SEARCHED_LIST] : (store,payload) => {
    store.commit(Constant.SEARCHED_LIST,payload)
  },
  [Constant.REMOVE_SEARCHED_LIST] : (store) => {
    store.commit(Constant.REMOVE_SEARCHED_LIST);
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
}
