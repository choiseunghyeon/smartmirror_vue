<template lang="html">

  <div>
    <youtube v-if="videoId !== '' "
      :video-id="videoId" @ready="ready" @ended="ended" :player-vars="{autoplay:1}"
      :playerWidth="youtubeSize.width" :playerHeight="youtubeSize.height">
    </youtube>
    <!--
    <button @click="pause" type="button" name="button">멈춤</button>
    <button @click="stop" type="button" name="button">스탑</button>
    <button @click="play" type="button" name="button">시작</button>
    <button @click="change" type="button" name="button">바꾸기</button>
    <button @click="displayToggle" type="button" name="button">최소화</button>
    <button @click="sizeUp" type="button" name="button">크게</button>
    <button @click="test" type="button" name="button">test</button>
  -->
  </div>
</template>

<script>
import Constant from '@/Constant.js';

import {mapState} from 'vuex';

export default {
  name:"YoutubeController",
  data: function(){
    return {
        youtubeSize:{width:"840", height:"490"},
        videoId: "",
        videoList: {},
    }
  },
  created: function(){
    this.$options.sockets.changeVideo = (data) => {
      console.log('videoData 받았다!! : ',data);
      this.videoId=data;
    },
    this.$options.sockets.changeVideoList = (data) => {
      console.log('changeVideoList 받았다!! : ',data);
      this.videoList=data;
    }
  },
  methods: {
    ready: function(player){
      this.player=player;
    },
    ended: function(){ // 끝나면 저장 되어 있는 다음 비디오 실행
      console.log('끝');
      this.change()
    },
    addList: function(videoId){
      console.log('list 추가완료');
      this.youtubeListItems.myList.push(videoId);
    },
    change: function(){
      this.videoList.num+=1;
      this.videoId=this.videoList.idArray[this.videoList.num];
    },
    /* 핸드폰 조작시 유튜브 영상으로 직접 컨트롤 할 수 있기 때문에 우선 주석처리
    pause: function(){
      this.player.pauseVideo()
    },
    stop: function(){
      this.player.stopVideo()
    },
    play: function(){
      this.player.playVideo()
    },
    sizeUp: function(){
      let width = parseInt(this.youtubeSize.width)
      let height = parseInt(this.youtubeSize.height);

      this.youtubeSize.width=''+(width+100);
      this.youtubeSize.height=''+(height+100);
    },
    */
    displayToggle: function(){
      this.$store.dispatch(Constant.TOGGLE_YOUTUBE_ACTIVE);
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
</style>
