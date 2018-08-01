<template lang="html">
    <div class="searchedList-container" v-scroll="handleScroll">

      <div v-for="searchedList in searchedLists">
        <v-card tile flat v-for="(data) in searchedList.items" @click.native="changeYoutube(data)" color="transparent" class="white--text" style="border-bottom: 1px solid white !important;">

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
                  <span v-if="data.id.channelId">{{data.snippet.title+"채널"}}</span>
                  <div>{{data.snippet.title}}</div>
                </div>
              </v-card-title>
        </v-card>
        </div>

      </div>

</template>

<script>
import Constant from '@/Constant.js';
import {mapState} from 'vuex';
import ScrollHeight from '@/mixin/ScrollHeight.js';
import SaveVideo from '@/mixin/SaveVideo';
export default {
  name: "YoutubeSearch",
  computed: mapState(['searchedLists','searchKeyword']),
  mixins: [ScrollHeight, SaveVideo],
  created: function(){
    console.log("SearchedList created!!");
  },
  methods: {
    changeYoutube: function(data){
      console.log("change",data);
      data.id.hasOwnProperty("channelId") ? this.$store.dispatch(Constant.ADD_CHANNEL,{snippet: data.snippet})
        : this.$store.dispatch(Constant.VIDEO_CHANGE,{videoId:data.id.videoId});
      // this.removeSearchedList();
    },
    handleScroll: function(e){
      console.log(e);
      let result = e.target.scrollingElement.scrollTop + e.target.scrollingElement.clientHeight - 100; // 문서 전체의 높이와 같음
      result == this.scrollHeight ? this.moreYoutubeVideo(this.searchedLists[this.searchedLists.length-1].nextToken) : console.log(result);
    },
    moreYoutubeVideo: function(token){

      console.log("moreYoutubeVideo Token: ",token);
      let keyword = this.searchKeyword;
      this.$store.dispatch(Constant.YOUTUBE_SEARCH,{keyword:keyword,nextPageToken:token});

    },

  }
}
</script>
