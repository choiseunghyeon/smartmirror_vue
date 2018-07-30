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

export default {
  name: "Popular",
  data: function(){
    return {scrollHeight:0};
  },
  created: function(){
    console.log("Popular created!!");
    this.getPopularList();
  },
  mounted: function(){
    console.log("Popular mounted");
    this.scrollHeight = document.body.scrollHeight - 100; // 바닥을 찍고 데이터를 요청하면 늦어져서 100px 정도 조절함

  },
  updated: function(){ // 데이터가 변경되면 scroll의 길이를 구함
    console.log("Popular updated");
    this.scrollHeight = document.body.scrollHeight - 100 //- searchContainer.clientHeight;
  },
  computed: mapState(['mostPopularVideoLists']),
  methods: {
    getPopularList: function(){ // mostpopular 영상들 6개 가져오기
      this.$store.dispatch(Constant.REMOVE_MOSTPOPULAR_LIST);
      this.$store.dispatch(Constant.GET_MOSTPOPULAR_VIDEOS,{});
    },
    morePopularList: function(token){ //추가로 6개의 영상 가져오기
      console.log("morePopularList called");
      if(token == "NULL") return;
      this.$store.dispatch(Constant.GET_MOSTPOPULAR_VIDEOS,{nextPageToken:token});
    },

    handleScroll: function(e){
        console.log(e);
        let result = e.target.scrollingElement.scrollTop + e.target.scrollingElement.clientHeight - 100; // 문서 전체의 높이와 같음
        result == this.scrollHeight ? this.morePopularList(this.mostPopularVideoLists[this.mostPopularVideoLists.length-1].nextToken) : console.log(result);

    },
    changeYoutube: function(data){
      console.log("change",data);
      this.$store.dispatch(Constant.VIDEO_CHANGE,{videoId:data.id.videoId});
      // this.removeSearchedList();
    },
    saveVideo: function(data){  // 나의목록을 modal로 키고 목록 클릭시 저장
      let obj = {
        saveFlag:true,
        data:{
          title: data.snippet.title, videoId: data.id.videoId, imgUrl: data.snippet.thumbnails.medium.url
        }
      };
      this.$store.dispatch(Constant.VIDEO_DATA_SAVE,obj);
    },
  },

}

</script>
