<template>
<div class="row">
  <span class="oi oi-list" style="width:32px; height:32px; color: white;"></span>
  <span class="oi oi-list" title="oi-list" aria-hidden="true"></span>
  <div id="mirror_controller" class="col-md-6">
    <div id="hamburger" :class="{isHamActive: isActive.hamburger}" @click="hamburgerToggle">
      <div class="bar"></div>
      <div class="bar"></div>
      <div class="bar"></div>
    </div>
    <ul id="control_list" :class="{isListActive: !isActive.hamburger}">
      <li>
        <input id="search_keword" type="text" name="" v-model="keword">
        <span @click="youtubeSearch">
          검색
        </span>
      </li><!-- SearchYoutube에 있는 거를 일단 가져옴 기능상 문제는 없음 다만 유지보수 때 문제가 생길 수 있으니 수정 요망 -->
      <li @click="channelListToggle"><span>구독중인 채널 보기</span></li>
      <li @click="youtubeToggle"><span>유튜브</span></li>
      <li @click="widgetToggle"><span>위젯</span></li>
      <!--<li @click="test"><span>test</span></li>-->
    </ul>
  </div>
  <div id="widget" :class="{isWidgetActive:isActive.widget,'col-md-6':true}">
    <div class="row">
      <weather></weather>
    </div>
    <div class="row">
      <fine-dust></fine-dust>
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
import FineDust from './FineDust';
import SearchYoutube from './SearchYoutube';
import YoutubeController from './YoutubeController';
import Constant from '../Constant.js';
import {mapState} from 'vuex';


export default {
  name: 'Main',
  components: {Clock,Weather,FineDust,SearchYoutube,YoutubeController},
  computed: mapState(['isActive']),
  created: function(){
    this.sync();
  },
  data: function(){
    return { keword:''};
  },
  methods: {
    sync: function(){
      // 채널 정보 localStorage에 저장되어 있는 데이터를 vue에 동기화
      let localChannelLists = JSON.parse(localStorage.localChannelLists);
      this.$store.dispatch(Constant.SYNC_CHANNEL,localChannelLists);
    },
    hamburgerToggle: function(){
      this.$store.dispatch(Constant.TOGGLE_HAMBURGER_ACTIVE);
    },
    channelListToggle: function(){
      this.$store.dispatch(Constant.TOGGLE_CHANNEL_ACTIVE);
    },
    youtubeToggle: function(){
      this.$store.dispatch(Constant.TOGGLE_YOUTUBE_ACTIVE);
    },
    widgetToggle: function(){
      this.$store.dispatch(Constant.TOGGLE_WIDGET_ACTIVE);
    },

    youtubeSearch(){
      console.log("this is keword",this.keword);
      this.$store.dispatch(Constant.YOUTUBE_SEARCH,{keword:this.keword});
    },
    /*
    test: function(){
      this.$store.dispatch(Constant.GET_LIST_COUNT,{playlistId:"PLVXsWLG72QDaeAKIbvC1zKdxkueUWEhWr"});
    },
    */
  }
}
</script>

<style lang="css" scoped>
/*hamburger*/

#hamburger.isHamActive .bar:nth-child(1){
  -webkit-transform: translateY(13px);
  -ms-transform: translateY(13px);
  -o-transform: translateY(13px);
  transform: translateY(13px);
}

#hamburger.isHamActive .bar:nth-child(3){
  -webkit-transform: translateY(-13px);
  -ms-transform: translateY(-13px);
  -o-transform: translateY(-13px);
  transform: translateY(-13px);
}
.bar{
  width: 50px;
  height: 5px;
  background-color: #ecf0f1;
  display: block;
  margin: 8px;
  -webkit-transition: all 0.3s ease-in-out;
  -o-transition: all 0.3s ease-in-out;
  transition: all 0.3s ease-in-out;
  text-align: left;
}
.isListActive {
  display: none;
}
.isWidgetActive {
  display: none;
}

#control_list li{
  margin: 25px auto;
  color: white;
  font-size: 25px;
  text-align: left;
}
#control_list input{
  background-color: inherit;
}

</style>
