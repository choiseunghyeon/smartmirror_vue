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
  <youtube-controller></youtube-controller>
</div>

</template>

<script>
import Clock from './Clock';
import Weather from './Weather';
import SearchYoutube from './SearchYoutube';
import YoutubeController from './YoutubeController';
import Constant from '../Constant.js';
export default {
  name: 'Main',
  components: {Clock,Weather,SearchYoutube,YoutubeController},
  created: function(){
    this.sync();
  },
  methods: {
    sync: function(){
      // 채널 정보 localStorage에 저장되어 있는 데이터를 vue에 동기화
      let localChannelLists = JSON.parse(localStorage.localChannelLists);
      this.$store.dispatch(Constant.SYNC_CHANNEL,localChannelLists);
    }
  }
}
</script>
