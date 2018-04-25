<template lang="html">
    <transition name="modal">
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
                      <div class="number_box" v-if="!data.id.channelId" @click.stop="saveVideo(data)">
                        <span class="show_number">저장</span>
                        <img class="number_image" src="../../static/images/listing-option.svg" alt="">
                      </div>
                      <img :src="data.snippet.thumbnails.medium.url" value="data.id.videoId"><figcaption>{{data.snippet.title}}</figcaption>
                    </figure>
                  </li>
                </div>
              </ul>


          </div>
        </div>
      </div>
    </transition>


</template>

<script>
import Constant from '../Constant.js';
import {mapState} from 'vuex';
import ApiKey from '../ApiKey.js';

export default {
  name: "SearchedList",
  computed: mapState(['carouselFlag','searchedLists']),
  mounted: function(){
    console.log("data mounted");
    let modalContainer = document.getElementsByClassName('modal-container')[0];
    this.scrollHeight = modalContainer.scrollHeight - modalContainer.clientHeight ;
  },
  updated: function(){ // 데이터가 변경되면 scroll의 길이를 구함
    console.log("upgrade complete");
    let modalContainer = document.getElementsByClassName('modal-container')[0];
    this.scrollHeight = modalContainer.scrollHeight - modalContainer.clientHeight;
  },
  data: function(){
    return {scrollHeight:0, modal_top_value:""}
  },
  props: ['selectedPlayLists','listImages'],
  methods: {
    changeEvent: function(data){
      this.$emit('changeYoutube',data);
    },

    handleScroll: function(e){
      e.target.scrollTop !== 0 ? this.modal_top_value="modal_top" : this.modal_top_value="";
      e.target.scrollTop == this.scrollHeight ? this.moreYoutubeVideo(this.searchedLists[this.searchedLists.length-1].nextToken) : console.log(e.target.scrollTop);
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
    }
  }
}
</script>
<style scoped media="screen">
  .modal_top {
    position: fixed;

    z-index: 1111;
  }
</style>
