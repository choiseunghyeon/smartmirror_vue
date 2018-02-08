<template lang="html">
<div class="">

  <div id="youtube">
    <youtube v-if="currentVideoId !== '' " :class="{youtube_active:isActive.youtube}" :video-id="currentVideoId" @ready="ready" @ended="ended" :player-vars="{autoplay:1}"></youtube>
    <button @click="pause" type="button" name="button">멈춤</button>
    <button @click="stop" type="button" name="button">스탑</button>
    <button @click="play" type="button" name="button">시작</button>
    <button @click="change" type="button" name="button">바꾸기</button>
    <button @click="displayToggle" type="button" name="button">최소화</button>
    <button @click="test" type="button" name="button">test</button>
  </div>
</div>
</template>

<script>
import ApiKey from '../ApiKey.js';
import Constant from '../Constant.js';

import {mapState} from 'vuex';

export default {
  name:"YoutubeController",
  created: function(){
    eventBus.$on('changeVideo', this.change);
    //this.getPlayList();
  },
  data: function(){
    return {
        isActive:{youtube: false, search: false},
    }
  },
  computed: mapState(['currentVideoId','videoList']),
  methods: {
    ready: function(player){
      this.player=player;
    },
    ended: function(){
      console.log('끝');
      this.videoList.num+=1;
      this.change(this.videoList.idArray[this.videoList.num]);
    },
    addList: function(videoId){
      console.log('list 추가완료');
      this.youtubeListItems.myList.push(videoId);
    },
    change: function(videoId){
      this.$store.dispatch(Constant.VIDEO_CHANGE,{videoId:videoId});
    },
    pause: function(){
      this.player.pauseVideo()
    },
    stop: function(){
      this.player.stopVideo()
    },
    play: function(){
      this.player.playVideo()
    },
    displayToggle: function(){
      this.isActive.youtube = !this.isActive.youtube;
    },
    searchToggle: function(){
      this.isActive.search = !this.isActive.search;
    },
    test: function(){
      console.log("state --- "+this.player.getPlayerState());
      this.player.getPlayerState();
      this.text=this.player.cuePlaylist();

    }
  } // the end of methods
}
</script>

<style lang="css" scoped>
  .youtube_active {display: none;}
  .search_active {display: none;}
</style>
