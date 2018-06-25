export default {
  /* Youtube !! */
  currentVideoId:"",
  videoList:{idArray:[],num:0},
  searchedLists:[],
  searchKeyword:"",
  // about Channel
  channelLists:[],
  selectedChannel:'', // 선택된 채널의 id
  selectedPlayLists:[], // 선택된 채널이 가진 재생 목록들
  // selectedListId:'', //선택된 재생목록의 id
  playListItems:[], //선택된 재생목록이 가진 영상들

  dayObject:{today:'',tomorrow:''},
  isActive: {channellists:false,mylists:false,hamburger:false, youtube:false, widget:false,loading:true},
  modalFlag:'',

  // about MyList
  videoDataSave:{saveFlag:false, data:''},

  // about CSS
  numberBoxRightValue:"", // .number_box css의 값 설정
}
