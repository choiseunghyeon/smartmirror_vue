<template lang="html">
<div class="popular-container" v-scroll="handleScroll">

  <div v-for="list in mostPopularVideoLists">
    <v-card tile flat v-for="(data,index) in list.items" @click.native="changeYoutube(data)" color="transparent" class="white--text" style="border-bottom: 1px solid white !important;">

      <v-card-media
      :src="data.snippet.thumbnails.medium.url"
      :value="data.id.videoId"
      height="200px"
      >
      <div class="number_box" @click.stop="saveVideo(data)">
        <span class="show_number">저장</span>
        <v-icon x-large >list</v-icon>
      </div>
      </v-card-media>
      <v-card-title>
        <div>
          <div>{{data.snippet.title}}
          </div>
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
export default {
  name: "Popular",
  mixins: [ScrollHeight, SaveVideo],

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
        console.log(e);
        let result = e.target.scrollingElement.scrollTop + e.target.scrollingElement.clientHeight - 100; // 문서 전체의 높이와 같음
        result == this.scrollHeight ? this.morePopularList(this.mostPopularVideoLists[this.mostPopularVideoLists.length-1].nextToken) : console.log(result);

    },
    changeYoutube: function(data){
      console.log("change",data);
      this.$store.dispatch(Constant.VIDEO_CHANGE,{videoId:data.id.videoId});
    },

  },

}

</script>
