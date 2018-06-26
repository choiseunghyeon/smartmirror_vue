<template lang="html">
    <div class="searchedList-container" v-scroll="handleScroll">

      <div v-for="searchedList in searchedLists">
        <v-card tile flat v-for="(data) in searchedList.items" @click.native="changeYoutube(data)" color="transparent" class="white--text" style="border-bottom: 1px solid white !important;">

              <v-card-media
              :src="data.snippet.thumbnails.medium.url"
              :value="data.id.videoId"
              height="200px"
              ></v-card-media>
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
import Constant from '../../Constant.js';
import {mapState} from 'vuex';
import ApiKey from '../../ApiKey.js';

export default {
  name: "SearchedList",
  computed: mapState(['carouselFlag','searchedLists', 'numberBoxRightValue','searchKeyword']),
  mounted: function(){
    console.log("data mounted");
    this.scrollHeight = document.body.scrollHeight - 100; // 바닥을 찍고 데이터를 요청하면 늦어져서 100px 정도 조절함
  },
  updated: function(){ // 데이터가 변경되면 scroll의 길이를 구함
    console.log("upgrade complete");
    this.scrollHeight = document.body.scrollHeight - 100 //- searchContainer.clientHeight;
  },
  data: function(){
    return {scrollHeight:0, }
  },
  methods: {
    // changeEvent: function(data){
    //   console.log('good');
    //   this.$emit('changeYoutube',data);
    // },
    changeYoutube: function(data){
      console.log("change",data);
      data.id.hasOwnProperty("channelId") ? this.$store.dispatch(Constant.ADD_CHANNEL,{snippet: data.snippet})
        : this.$store.dispatch(Constant.VIDEO_CHANGE,{videoId:data.id.videoId});
      // this.removeSearchedList();
      //
      // this.closeYoutubeListModal();
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
    // closeYoutubeListModal: function(){
    //   this.$store.dispatch(Constant.MODAL_FLAG,'');
    //   this.$store.dispatch(Constant.REMOVE_SEARCHED_LIST);
    // },
    saveVideo: function(data){
      let obj = {
        saveFlag:true,
        data:{
          title: data.snippet.title, videoId: data.id.videoId,imgUrl: data.snippet.thumbnails.medium.url
        }
      };
      this.$store.dispatch(Constant.TOGGLE_MYLIST_ACTIVE);
      this.$store.dispatch(Constant.VIDEO_DATA_SAVE,obj);
    },

  }
}
</script>
