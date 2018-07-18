export default {

  /* ===== MIRROR ===== */
  dayObject:{today:'',tomorrow:''},

  /* ===== CONTROLLER ===== */
  // Socket
  currentVideoId:"",
  videoList:{idArray:[],num:0},

  // Controller.vue
    // flag는 snackbar의 나타남과 사라짐의 여부 text는 표시할 내용
    // time은 몇초간 표시할 것인지의 여부(0이면 안사라짐) progress는 loading 표시를 해줌
  snackbar:{flag:false,text:"",time:1000,progress:false},
  youtubeSheet: false,
  // YoutubeChannel.vue
  channelLists:[],
  selectedChannel:'', // 선택된 채널의 id
  selectedPlayLists:[], // 선택된 채널이 가진 재생 목록들
  playListItems:[], //선택된 재생목록이 가진 영상들
  channelNavVal: "playlist", //YoutubeChannel.vue 에서 bottom navigation의 값을 조절

  //MostPopular.vue
  mostPopularVideoLists: [],

  //SearchedList.vue
  searchedLists:[],
  searchKeyword:"",

  // MyList.vue
  videoDataSave:{saveFlag:false, data:''}, //videoDataSave.saveFlag면은 MyList Modal로 띄움
  myListNames:[], // db에 저장된 mylistname들
  selectedListIndex:-1,
  myListNavVal: "mylist", // MyListBridge.vue에서 bottom navigation의 값을 조절
}
