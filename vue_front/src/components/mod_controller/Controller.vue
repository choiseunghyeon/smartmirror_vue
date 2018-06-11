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
      <li @click="emitSocket">
        <span>소켓io <toggle-button id="changed-font" @change="channelListToggle" :sync="true" :value="isActive.channellists"
               :labels="{checked: 'ON', unchecked: 'OFF'}"
               :width="80" :height="33"/>
        </span>
      </li>
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
  <search-youtube></search-youtube>
  <my-list></my-list>
  <div class="col-md-8">
    <youtube-controller></youtube-controller>
  </div>
</div>

</template>

<script>
import SearchYoutube from '../SearchYoutube';
import YoutubeController from '../YoutubeController';
import MyList from '../MyList';
import Constant from '../../Constant.js';
import {mapState} from 'vuex';


export default {
  name: 'Controller',
  components: {SearchYoutube,YoutubeController,MyList},
  computed: mapState(['isActive']),

  created: function(){
    console.log('created!!!!!!!!!!!!!!!!!====');
    this.sync();
    this.setNumberBox();
    this.$options.sockets.message = (data) => {
      console.log('메시지 받았다 !! ',data);
    }
  },

  data: function(){
    return { keword:'',buttonFlag:{minimization:false,removal:false,widget:false}};
  },
  sockets: {
    connect: function(){
      console.log('socket connected');
    },
    customEmit: function(val){
      console.log('this method was fired by the socket server : ',val);
    }
  },
  methods: {
    sync: function(){
      // 채널 정보 localStorage에 저장되어 있는 데이터를 vue에 동기화
      let localChannelLists = JSON.parse(localStorage.localChannelLists);
      this.$store.dispatch(Constant.SYNC_CHANNEL,localChannelLists);
    },
    emitSocket: function(){
      this.$socket.emit('message','hello');
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
    setNumberBox(event){ // 현재 윈도우의 width를 알아내어 .number_box의 right값 수정
      let temp = Math.floor( (document.body.offsetWidth - 37) / 3 ); // 현재크기에서 - 37 후 나누기 3 결과 값의 소수점은 버리기
                                                                     // 37은  <ul class="row white-scale-100"> 의 값이 항상 현재 크기 - 37이기 때문
                                                                    // col-md-4 이기때문에 3개의 컬럼이 존재 하기 때문에 나누기 3

      let rightValue = ( temp - 320 ) / 2; // col-md-4의 하나 값 - 320(img값) 그리고 이미지 양옆으로 차지하는 공간이 있기 때문에 나누기 2
                                           // 결과 값을 right해주면 img 제일 오른쪽으로 .number_box가 붙게됨

      this.$store.dispatch(Constant.SET_NUMBERBOX_CSS, rightValue+"px");
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
