<template>
<div class="">
  <div id="widget" class="container">
    <div class="row">
      <weather></weather>
    </div>
    <div class="row">
      <clock></clock>
    </div>
  </div>
  <search-youtube></search-youtube>
  <div id="youtube">
    <youtube :class="{youtube_active:isActive.youtube}" :video-id="videoId" @ready="ready" :player-vars="{autoplay:1}"></youtube>
    <button @click="pause" type="button" name="button">멈춤</button>
    <button @click="stop" type="button" name="button">스탑</button>
    <button @click="play" type="button" name="button">시작</button>
    <button @click="change" type="button" name="button">바꾸기</button>
    <button @click="displayToggle" type="button" name="button">최소화</button>
  </div>
</div>

</template>

<script>
import Clock from './Clock';
import Weather from './Weather';
import SearchYoutube from './SearchYoutube';
import eventBus from './EventBus.vue'

export default {
  name: 'Main',
  components: {Clock,Weather,SearchYoutube},
  created: function(){
    eventBus.$on('changeVideo', this.change);
  },
  data: function(){
    return { videoId:"HaMq2nn5ac0", isActive:{youtube: false, search: false} }
  },
  methods: {
    ready: function(player){
      this.player=player
    },
    change: function(videoId){
      this.videoId=videoId;
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
    }
  }
}
</script>
<style scoped>
  .youtube_active {display: none;}
  .search_active {display: none;}
</style>
