<template lang="html">
<div class="popular-container" v-scroll="handleScroll" @click="containerClick">

  <div v-for="(list,listIndex) in mostPopularVideoLists">
    <v-card tile flat v-for="(data,itemsIndex) in list.items" :value="listIndex+' '+itemsIndex" color="transparent" class="white--text youtube-card" style="border-bottom: 1px solid white !important;">

      <v-card-media
      :src="data.snippet.thumbnails.medium.url"
      height="200px"
      >
      <div class="number_box">
        <span class="show_number">저장</span>
        <v-icon x-large >list</v-icon>
      </div>
      </v-card-media>
      <v-card-title>
          <div>
            {{data.snippet.title}}
          </div>
      </v-card-title>
    </v-card>
  </div>
</div> <!-- the end of playList-containe -->
</template>

<script>
import Constant from '@/Constant.js';
import {mapState} from 'vuex';
import ScrollHeight from '@/mixin/ScrollHeight.js';
import SaveVideo from '@/mixin/SaveVideo.js';
import FindYoutubeCardClass from '@/mixin/FindYoutubeCardClass';
export default {
  name: "Popular",
  mixins: [ScrollHeight, SaveVideo, FindYoutubeCardClass],

  created: function(){
    console.log("Popular created!!");
    this.getPopularList();
  },
  computed: mapState(['mostPopularVideoLists']),
  methods: {
    // mostpopular 영상들 6개 가져오기
    getPopularList: function(){
      this.$store.dispatch(Constant.REMOVE_MOSTPOPULAR_LIST);
      this.$store.dispatch(Constant.GET_MOSTPOPULAR_VIDEOS,{});
    },
    //추가로 6개의 영상 가져오기
    morePopularList: function(token){
      console.log("morePopularList called");
      if(token == "NULL") return;
      this.$store.dispatch(Constant.GET_MOSTPOPULAR_VIDEOS,{nextPageToken:token});
    },
    // 스크롤이 바닥에서 -100px을 찍으면 morePopularList 실행
    handleScroll: function(e){
        // console.log(e);
        let result = e.target.scrollingElement.scrollTop + e.target.scrollingElement.clientHeight - 100; // 문서 전체의 높이와 같음
        if(result == this.scrollHeight)
          this.morePopularList(this.mostPopularVideoLists[this.mostPopularVideoLists.length-1].nextToken);
        // console.log(result);

    },
    containerClick: function(e){
      let className = e.target.className; // 클릭된 요소의 className 가져오기
      let path = event.path;
      let listIndex, itemsIndex, data;

      [listIndex, itemsIndex] = this.findYoutubeCardClass(path); // return값 배열을 비구조화해 저장

      data = this.mostPopularVideoLists[listIndex].items[itemsIndex];

      className === 'number_box' || className === 'show_number' || className.indexOf('v-icon') !== -1
      ? this.saveVideo(data) : this.changeYoutube(data); // 분기

    },
    changeYoutube: function(data){
      this.$store.dispatch(Constant.VIDEO_CHANGE,{videoId:data.id.videoId});
    },

  },

}

</script>
