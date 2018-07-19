<template lang="html">

  <div>
    <youtube v-if="videoId !== '' " :class="{'youtube_active':isActive}"
      :video-id="videoId" @ready="ready" @ended="ended" :player-vars="{autoplay:1}"
      :playerWidth="youtubeSize.width" :playerHeight="youtubeSize.height"
      @buffering="buffering" @playing="playing">
    </youtube>
    <!-- <button @click="skip" type="button" name="button">10초앞으로</button> -->
    <button @click="pause" type="button" name="button">스탑</button>
    <button @click="playing" type="button" name="button">시작</button>
    <button @click="test" type="button" name="button">test</button>
    <!--
    <button @click="change" type="button" name="button">바꾸기</button>
    <button @click="displayToggle" type="button" name="button">최소화</button>
    <button @click="sizeUp" type="button" name="button">크게</button>
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
        isActive: false,
        player:{},
        videoInfoFlag: 0, // 0이면 controller에 video 정보를 안보낸 것
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
    },
    this.$options.sockets.toggleYoutube = () => {
      console.log('toggleYoutube 받았다!! ');
      this.isActive = !this.isActive;
    },
    this.$options.sockets.changeQuality = (quality) => {
      console.log('changeQuality 받았다!! ');
      // this.isActive = !this.isActive;
      this.player.setPlaybackQuality("small");
    }
  },
  methods: {
    ready: function(player){

      this.player=player;
      this.videoInfoFlag=0;
    },
    ended: function(){ // 끝나면 저장 되어 있는 다음 비디오 실행
      console.log('끝');
      this.change()
    },
    playing: function(event){
      if(this.videoInfoFlag == 0){
        this.sendVideoInfoToController();
        this.videoInfoFlag=1;
      } else {

      }
      // console.log("playing 중");
      // this.player.playVideo();
    },
    pause: function(){
      this.player.pauseVideo();
    },
    // addList: function(videoId){
    //   console.log('list 추가완료');
    //   this.youtubeListItems.myList.push(videoId);
    // },
    change: function(){
      this.videoList.num+=1;
      if(this.videoList.num > this.videoList.idArray.length-1) // 마지막 영상이 종료되면 처음부터 실행
        this.videoList.num=0;
      this.videoId=this.videoList.idArray[this.videoList.num];
    },
    buffering:function(event){
      console.log(event);
    },
    sendVideoInfoToController: function(){
      console.log("sendVideoInfoToController 실행");
      let videoInfo = {
        qualityLevels: this.player.getAvailableQualityLevels(),
        duration: this.player.getDuration(),
        quality: this.player.getPlaybackQuality(),
        data: this.player.getVideoData(),
        volume: this.player.getVolume(),
      }
      this.$socket.emit('getVideoInfo',videoInfo);
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
    test: function(){
      console.log("test");
      // this.player.seekTo(287.548141);
      // console.log(this.player.getVideoData());
      // console.log(this.player.getAvailableQualityLevels());
      // console.log(this.player.getPlaybackQuality());
      console.log(this.player.setPlaybackQuality);
    }
  } // the end of methods
}
</script>

<style lang="css" scoped>
  .youtube_active {display: none;}
</style>
