export default {
  /* ===== MIRROR ===== */
  dayObject:{today:'',tomorrow:''},

  /* ===== CONTROLLER ===== */
  // YoutubeChannel.vue
  channelLists:[],
  selectedChannel:'', // 선택된 채널의 id
  selectedPlayLists:[], // 선택된 채널이 가진 재생 목록들
  playListItems:[], //선택된 재생목록이 가진 영상들
  channelNavVal: "playlist", //YoutubeChannel.vue 에서 bottom navigation의 값을 조절

  //MostPopular.vue
  mostPopularVideoLists: [],

  //SearchedList.vue
  currentVideoId:"",
  videoList:{idArray:[],num:0},
  searchedLists:[],
  searchKeyword:"",

  // about MyList
  videoDataSave:{saveFlag:false, data:''}, //videoDataSave.saveFlag면은 MyList Modal로 띄움
  selectedMyListName:'',
  myListNavVal: "mylist", // MyListBridge.vue에서 bottom navigation의 값을 조절
}
