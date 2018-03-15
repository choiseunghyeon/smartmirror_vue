let BASE_URL = "https://www.googleapis.com/youtube/v3";

export default {
  // 채널이 가진 재생목록
  PLAY_LISTS: BASE_URL + "/playlists",

  // 재생목록 안의 영상들 요청
  PLAY_LIST_ITEMS: BASE_URL + "/playlistItems",

  //유트브 검색
  YOUTUBE_SEARCH: BASE_URL+"/search",
}
