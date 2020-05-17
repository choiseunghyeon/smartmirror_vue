let BASE_URL = "https://www.googleapis.com/youtube/v3";
// let SERVER_URL = "http://172.20.10.5:3000" // IPhone
let SERVER_URL = "http://localhost:3000"
export default {
  // 채널이 가진 재생목록
  PLAY_LISTS: BASE_URL + "/playlists",

  // 재생목록 안의 영상들 요청
  PLAY_LIST_ITEMS: BASE_URL + "/playlistItems",

  //유트브 검색
  YOUTUBE_SEARCH: BASE_URL+"/search",

  /* SERVER */
  // 채널
  CHANNEL: SERVER_URL+"/channel",
  //나의목록
  MYLIST: SERVER_URL+"/mylist",
}
