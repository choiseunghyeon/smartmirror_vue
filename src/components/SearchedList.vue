<template lang="html">
    <transition name="modal">
      <div class="modal-mask">
        <div class="modal-wrapper">
          <div class="modal-container" @scroll="handleScroll">
            <div class="row">
              <button class="modal-default-button" @click="closeYoutubeListModal">
                OK
              </button>
            </div>
              <ul id="youtube-list" class="row">
                <div v-for="searchedList in searchedLists">
                  <li v-for="(data,i) in searchedList.items" @click.stop="changeEvent(data)" class="col-md-4">
                     <span>Number {{i+1}}</span>
                    <span v-if="data.id.channelId">{{data.snippet.title+"채널"}}</span>
                    <figure>
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
    return {scrollHeight:0}
  },
  props: ['selectedPlayLists','listImages'],
  methods: {
    changeEvent: function(data){
      this.$emit('changeYoutube',data);
    },

    handleScroll: function(e){
      e.target.scrollTop == this.scrollHeight ? this.moreYoutubeVideo(this.searchedLists[this.searchedLists.length-1].nextToken) : console.log(e.target.scrollTop);
    },
    moreYoutubeVideo: function(token){
      console.log("moreYoutubeVideo Token: ",token);
      let keword = $("#search_keword").val();
      this.$store.dispatch(Constant.YOUTUBE_SEARCH,{keword:keword,nextPageToken:token});
      /*
      let that = this;
      console.log("Token: ",token);
        let keword = $("#search_keword").val();
        let order = {'최신순':'date','조회수':'viewCount'};
        let api_url="https://www.googleapis.com/youtube/v3/search?part=snippet&q="+keword+"&maxResults=9&pageToken="+token+"&order="+order.조회수+"&"+ApiKey.youtube
        // video중 조회수가 제일 높은 것 상위 5개의 list를 가져옴
        console.log("more_api_url: ",api_url);

        $.ajax({
            url: api_url,
            type: 'get',
            dataType: 'json',
            success:function(data){

              //that.$store.dispatch(Constant.REMOVE_SEARCHED_LIST);
              console.log(data);
              console.log(data.items);
              console.log(data.items[0].snippet.title);
              that.$store.dispatch(Constant.ADD_SEARCHED_LIST,data);
            }
        })
      */

    },
    closeYoutubeListModal: function(){
      this.$store.dispatch(Constant.MODAL_FLAG,'');
      this.$store.dispatch(Constant.REMOVE_SEARCHED_LIST);
    },
  }
}
</script>
