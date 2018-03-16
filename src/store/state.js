export default {
  /* Youtube !! */
  currentVideoId:"",
  videoList:{idArray:[],num:0},
  searchedLists:[],

  // about Channel
  channelLists:[],
  selectedChannel:'', // 선택된 채널의 id
  selectedPlayLists:[], // 선택된 채널이 가진 재생 목록들
  // selectedListId:'', //선택된 재생목록의 id
  playListItems:[], //선택된 재생목록이 가진 영상들

  dayObject:{today:'',tomorrow:''},
  isActive: {channellists:false,hamburger:false, youtube:false, widget:false},
  modalFlag:''
}
