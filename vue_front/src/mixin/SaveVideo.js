import Constant from '@/Constant.js';
export default {
  methods: {
    saveVideo: function(data){ // 나의목록을 modal로 키고 목록 클릭시 저장
      //ListItem.vue 에서 videoId가 data.snippet.resourceId.videoId 여기에 있음
      let videoId = data.id.hasOwnProperty('videoId') ? data.id.videoId : data.snippet.resourceId.videoId;
      let obj = {
        saveFlag:true,
        data:{
          title: data.snippet.title, videoId: videoId, imgUrl: data.snippet.thumbnails.medium.url
        }
      };
      this.$store.dispatch(Constant.VIDEO_DATA_SAVE,obj);
    },
  }
}
