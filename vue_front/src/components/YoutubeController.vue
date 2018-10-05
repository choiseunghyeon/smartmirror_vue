<template lang="html">

  <div>
    <youtube v-if="videoId !== '' " :class="{'youtube_active':isActive}"
      :video-id="videoId" @ready="ready" @ended="ended" :player-vars="{autoplay:1}"
      :playerWidth="youtubeSize.width" :playerHeight="youtubeSize.height"
      @buffering="buffering" @playing="playing">
    </youtube>
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
    console.log("YoutubeController Created!!");
    // VIDEO
    // Controller로 부터 영상 정보 받기
    this.$options.sockets.changeVideo = (data) => {
      console.log('videoData 받았다!! : ',data);
      this.videoId=data;
      this.videoInfoFlag=0;
    },
    // Controller로 부터 영상 목록 받기
    this.$options.sockets.changeVideoList = (data) => {
      console.log('changeVideoList 받았다!! : ',data);
      this.videoList=data;
    },

    // Controller로 부터 video 멈춤 및 실행 데이터 받기
    this.$options.sockets.pauseOrPlay = (data) => {
      console.log('pauseOrPlay 받았다!! : ',data);
      data == "pause" ? this.player.target.pauseVideo() : this.player.target.playVideo();
    },
    // 특정시간대 부터 영상 재생
    this.$options.sockets.playAt = (seconds) => {
      console.log('playAt 받았다!! : ',seconds);
      this.player.target.seekTo(seconds);
    },
    // 영상 10초 앞으로
    this.$options.sockets.forward = () => {
      console.log('forward 받았다!! : ');
      this.player.target.seekTo(this.player.target.getMediaReferenceTime() + 10);
    },
    // 영상 10초 뒤로
    this.$options.sockets.rewind = () => {
      console.log('rewind 받았다!! : ');
      this.player.target.seekTo(this.player.target.getMediaReferenceTime() - 10);
    },
    // 영상 소리 조절
    this.$options.sockets.videoVolume = (volume) => {
      this.player.target.setVolume(volume);
    },
    // 영상 숨기기 또는 보이기
    this.$options.sockets.toggleYoutube = () => {
      console.log('toggleYoutube 받았다!! ');
      this.isActive = !this.isActive;
    },
    // 영상 정보 및 영상 목록 삭제
    this.$options.sockets.removeYoutube = () => {
      console.log('removeYoutube 받았다!! ');
      this.videoId = '';
      this.videoList =  {};
    },
    // 영상정보 동기화
    this.$options.sockets.syncInfo = () => {
      console.log('syncInfo 받았다!! ');
      this.sendVideoInfoToController();
    }
    // youtube api에서 지원하지 않는 관계로 우선 주석처리
    // this.$options.sockets.changeQuality = (quality) => {
    //   console.log('changeQuality 받았다!! ');
    //   // this.isActive = !this.isActive;
    //   this.player.target.setPlaybackQuality("small");
    // }
  },
  methods: {

    ready: function(player){
      console.log('video ready');
      this.player=player;
    },
    // 끝나면 저장 되어 있는 다음 비디오 실행
    ended: function(){
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
    },
    // 영상 목록에서 다음 영상 재생
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

    }
  } // the end of methods
}
</script>

<style lang="css" scoped>
  .youtube_active {display: none;}
</style>
