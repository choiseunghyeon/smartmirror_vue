<template lang="html">
    <!-- <transition name="modal">
      <div class="modal-mask">
        <div class="modal-wrapper">
          <div class="modal-container" @scroll="handleScroll">
            <div :class="'row ' + modal_top_value">
              <button class="modal-default-button" @click="closeYoutubeListModal">
                OK
              </button>
            </div>
              <ul class="row white-scale-100">
                <div v-for="searchedList in searchedLists">
                  <li v-for="(data) in searchedList.items" @click.stop="changeEvent(data)" class="col-md-4">
                    <span v-if="data.id.channelId">{{data.snippet.title+"채널"}}</span>
                    <figure>
                      <div class="number_box" :style="{ right: numberBoxRightValue }" v-if="!data.id.channelId" @click.stop="saveVideo(data)">
                        <span class="show_number">저장</span>
                        <img class="number_image" src="../../../static/images/listing-option.svg" alt="">
                      </div>
                      <img :src="data.snippet.thumbnails.medium.url" value="data.id.videoId"><figcaption>{{data.snippet.title}}</figcaption>
                    </figure>
                  </li>
                </div>
              </ul>


          </div>
        </div>
      </div>
    </transition> -->
    <div class="searchedList-container" @scroll="handleScroll">

      <div v-for="searchedList in searchedLists">
        <v-card tile flat v-for="(data) in searchedList.items" @click.stop="changeEvent(data)" color="transparent" class="white--text" style="border-bottom: 1px solid white !important;">

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
    <!-- <v-card>
      <v-card-media src="/static/doc-images/cards/desert.jpg" height="200px">
      </v-card-media>
      <v-card-title primary-title>
        <div>
          <h3 class="headline mb-0">Kangaroo Valley Safari</h3>
          <div>Located two hours south of Sydney in the <br>Southern Highlands of New South Wales, ...</div>
        </div>
      </v-card-title>
      <v-card-actions>
        <v-btn flat color="orange">Share</v-btn>
        <v-btn flat color="orange">Explore</v-btn>
      </v-card-actions>
    </v-card> -->
</template>

<script>
import Constant from '../../Constant.js';
import {mapState} from 'vuex';
import ApiKey from '../../ApiKey.js';

export default {
  name: "SearchedList",
  computed: mapState(['carouselFlag','searchedLists', 'numberBoxRightValue',]),
  mounted: function(){
    console.log("data mounted");
    let searchContainer = document.getElementsByClassName('searchedList-container')[0];
    this.scrollHeight = searchContainer.scrollHeight;
  },
  updated: function(){ // 데이터가 변경되면 scroll의 길이를 구함
    console.log("upgrade complete");
    let searchContainer = document.getElementsByClassName('searchedList-container')[0];
    this.scrollHeight = searchContainer.scrollHeight //- searchContainer.clientHeight;
  },
  data: function(){
    return {scrollHeight:0, modal_top_value:"",}
  },
  props: ['selectedPlayLists','listImages',],
  methods: {
    changeEvent: function(data){
      this.$emit('changeYoutube',data);
    },

    handleScroll: function(e){
      console.log(e);
      e.target.scrollTop !== 0 ? this.modal_top_value="modal_top" : this.modal_top_value="";
      Math.floor(e.target.scrollTop) == this.scrollHeight ? this.moreYoutubeVideo(this.searchedLists[this.searchedLists.length-1].nextToken) : console.log(e.target.scrollTop);
    },
    moreYoutubeVideo: function(token){

      console.log("moreYoutubeVideo Token: ",token);
      let keword = $("#search_keword").val();
      this.$store.dispatch(Constant.YOUTUBE_SEARCH,{keword:keword,nextPageToken:token});

    },
    closeYoutubeListModal: function(){
      this.$store.dispatch(Constant.MODAL_FLAG,'');
      this.$store.dispatch(Constant.REMOVE_SEARCHED_LIST);
    },
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
<style scoped media="screen">
  .modal_top {
    position: fixed;

    z-index: 1111;
  }
</style>
