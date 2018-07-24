<template lang="html">

  <div>
    <youtube v-if="videoId !== '' " :class="{'youtube_active':isActive}"
      :video-id="videoId" @ready="ready" @ended="ended" :player-vars="{autoplay:1}"
      :playerWidth="youtubeSize.width" :playerHeight="youtubeSize.height"
      @buffering="buffering" @playing="playing">
    </youtube>
    <button @click="test" type="button" name="button">test</button>
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
    // VIDEO
    this.$options.sockets.changeVideo = (data) => {
      console.log('videoData 받았다!! : ',data);
      this.videoId=data;
      this.videoInfoFlag=0;
    },
    this.$options.sockets.changeVideoList = (data) => {
      console.log('changeVideoList 받았다!! : ',data);
      this.videoList=data;
    },

    // Controller
    this.$options.sockets.pauseOrPlay = (data) => {
      console.log('pauseOrPlay 받았다!! : ',data);
      data == "pause" ? this.player.target.pauseVideo() : this.player.target.playVideo();
    },
    this.$options.sockets.playAt = (seconds) => { // 영상 10초 뒤로
      console.log('playAt 받았다!! : ',seconds);
      this.player.target.seekTo(seconds);
    },
    this.$options.sockets.forward = () => { // 영상 10초 앞으로
      console.log('forward 받았다!! : ');
      this.player.target.seekTo(this.player.target.getMediaReferenceTime() + 10);
    },
    this.$options.sockets.rewind = () => { // 영상 10초 뒤로
      console.log('rewind 받았다!! : ');
      this.player.target.seekTo(this.player.target.getMediaReferenceTime() - 10);
    },
    this.$options.sockets.videoVolume = (volume) => {
      this.player.target.setVolume(volume);
    },
    this.$options.sockets.toggleYoutube = () => {
      console.log('toggleYoutube 받았다!! ');
      this.isActive = !this.isActive;
    },
    this.$options.sockets.syncInfo = () => {
      console.log('syncInfo 받았다!! ');
      this.sendVideoInfoToController();
    },
    this.$options.sockets.changeQuality = (quality) => {
      console.log('changeQuality 받았다!! ');
      // this.isActive = !this.isActive;
      this.player.target.setPlaybackQuality("small");
    }
  },
  methods: {
    ready: function(player){
      console.log('video ready');
      this.player=player;
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
        // 현재 영상 시각을 소숫점 버리고 보냄
        this.$socket.emit('syncVideoTime',this.player.target.getMediaReferenceTime());
      }
      // console.log("playing 중");
      // this.player.target.playVideo();
    },
    change: function(){
      this.videoInfoFlag=0;
      this.videoList.num+=1;
      if(this.videoList.num > this.videoList.idArray.length-1) // 마지막 영상이 종료되면 처음부터 실행
        this.videoList.num=0;
      this.videoId=this.videoList.idArray[this.videoList.num];
    },
    buffering:function(event){
      // console.log(event);
    },
    sendVideoInfoToController: function(){
      console.log("sendVideoInfoToController 실행");
      let videoInfo = {
        qualityLevels: this.player.target.getAvailableQualityLevels(),
        duration: this.player.target.getDuration(),
        currentTime: this.player.target.getMediaReferenceTime(),
        quality: this.player.target.getPlaybackQuality(),
        data: this.player.target.getVideoData(),
        volume: this.player.target.getVolume(),
        videoToggle: this.isActive,
      }
      this.$socket.emit('getVideoInfo',videoInfo);
    },

    test: function(){
      console.log("test");
       this.player.target.stopVideo()
       this.player.target.setPlaybackQuality("small");
       this.player.target.playVideo();
       this.player.target.seekTo(100, false);
      // this.player.target.setOption(480);
      // this.player.target.setPlaybackRate(1.5);
      // this.player.target.setShuffle(480);
      // this.player.target.setSphericalProperties(480);
      // console.dir(this.player.target.seekTo);
      // console.log(this.player.target.getApiInterface());
      // console.log(this.player.target.getPlaybackQuality());
      // console.log(this.player.target.getPlaybackQuality());
      // console.log(this.player.target.getMediaReferenceTime());
      // console.log(this.player.target.seekTo);
    }
  } // the end of methods
}
</script>

<style lang="css" scoped>
  .youtube_active {display: none;}
</style>
