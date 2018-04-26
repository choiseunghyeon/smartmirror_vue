<template>
<div class="row">
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
      <li @click="channelListToggle">
        <span>구독중인 채널 보기 <toggle-button id="changed-font" @change="channelListToggle" :sync="true" :value="isActive.channellists"
               :labels="{checked: 'ON', unchecked: 'OFF'}"
               :width="80" :height="33"/>
        </span>
      </li>

      <li @click="myListToggle">
        <span>나의 목록 <toggle-button id="changed-font" @change="myListToggle" :sync="true" :value="isActive.mylists"
          :labels="{checked: 'ON', unchecked: 'OFF'}"
          :width="80" :height="33"/>
        </span>
      </li>

      <li @click="youtubeToggle">
        <span>유튜브(최소화) <toggle-button id="changed-font" @change="youtubeToggle" :sync="true" :value="buttonFlag.minimization"
               :labels="{checked: 'ON', unchecked: 'OFF'}"
               :width="80" :height="33"/>
        </span>
      </li>

      <li @click="removeYoutube">
        <span>유튜브(제거)</span>
      </li>
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
  <my-list></my-list>
  <div class="col-md-8">
    <youtube-controller></youtube-controller>
  </div>
</div>

</template>

<script>
import Clock from './Clock';
import Weather from './Weather';
import FineDust from './FineDust';
import SearchYoutube from './SearchYoutube';
import YoutubeController from './YoutubeController';
import MyList from './MyList';
import Constant from '../Constant.js';
import {mapState} from 'vuex';


export default {
  name: 'Main',
  components: {Clock,Weather,FineDust,SearchYoutube,YoutubeController,MyList},
  computed: mapState(['isActive']),
  created: function(){
    this.sync();
  },
  data: function(){
    return { keword:'',buttonFlag:{minimization:false,removal:false,widget:false}};
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
    myListToggle: function(){
      this.$store.dispatch(Constant.TOGGLE_MYLIST_ACTIVE);
    },
    youtubeToggle: function(){
      this.$store.dispatch(Constant.TOGGLE_YOUTUBE_ACTIVE);
      this.buttonFlag.minimization = !this.buttonFlag.minimization;
    },
    removeYoutube: function(){
      this.$store.dispatch(Constant.VIDEO_CHANGE,{videoId:''});
    },
    widgetToggle: function(){
      this.$store.dispatch(Constant.TOGGLE_WIDGET_ACTIVE);
      this.buttonFlag.widget = !this.buttonFlag.widget;
    },
    youtubeSearch(){
      console.log("this is keword",this.keword);
      this.$store.dispatch(Constant.YOUTUBE_SEARCH,{keword:this.keword});
    },

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
  width: 60px;
  height: 8px;
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
  font-size: 30px;
  text-align: left;
}
#control_list input{
  background-color: inherit;
}
#mirror_controller {
  margin: 20px 0px 0px 10px;
  height: 400px;
}

.vue-js-switch#changed-font { /* changing font-size of toggle-button  */
  font-size: 16px;
}

</style>
