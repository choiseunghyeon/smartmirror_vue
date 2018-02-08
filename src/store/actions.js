import Constant from '../constant';

export default {
  [Constant.VIDEO_CHANGE] : (store,payload) => {
    store.commit(Constant.VIDEO_CHANGE, payload)
  },
  [Constant.VIDEO_LIST] : (store,payload) => {
    store.commit(Constant.VIDEO_LIST, payload)
  },
  [Constant.SEARCHED_LIST] : (store,payload) => {
    store.commit(Constant.SEARCHED_LIST,payload)
  },
  [Constant.ADD_CHANNEL] : (store,payload) => {
    store.commit(Constant.ADD_CHANNEL, payload)
  }

}
