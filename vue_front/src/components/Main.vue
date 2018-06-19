<template>
<v-app class="grey darken-4">
  <v-container fluid>
    <v-layout row wrap>
      <v-flex xs5 offset-xs7 id="widget" :class="{isWidgetActive:isActive.widget}">

            <weather></weather>

            <fine-dust></fine-dust>

            <clock></clock>
      </v-flex>
    </v-layout>
  </v-container>
</v-app>

</template>

<script>
import Clock from './Clock';
import Weather from './Weather';
import FineDust from './FineDust';

import Constant from '../Constant.js';
import {mapState} from 'vuex';


export default {
  name: 'Main',
  components: {Clock,Weather,FineDust},
  computed: mapState(['isActive']),

  created: function(){
    console.log('created!!!!!!!!!!!!!!!!!====');
    this.sync();
    // this.setNumberBox();
    // this.$options.sockets.message = (data) => {
    //   console.log('메시지 받았다 !! ',data);
    // }
  },

  data: function(){
    return { keword:'',buttonFlag:{minimization:false,removal:false,widget:false}};
  },
  // sockets: {
  //   connect: function(){
  //     console.log('socket connected');
  //   },
  //   customEmit: function(val){
  //     console.log('this method was fired by the socket server : ',val);
  //   }
  // },
  methods: {
    sync: function(){
      // 채널 정보 localStorage에 저장되어 있는 데이터를 vue에 동기화
      let localChannelLists = JSON.parse(localStorage.localChannelLists);
      this.$store.dispatch(Constant.SYNC_CHANNEL,localChannelLists);
    },
    emitSocket: function(){
      this.$socket.emit('message','hello');
    },
    // hamburgerToggle: function(){
    //   this.$store.dispatch(Constant.TOGGLE_HAMBURGER_ACTIVE);
    // },
    // channelListToggle: function(){
    //   this.$store.dispatch(Constant.TOGGLE_CHANNEL_ACTIVE);
    // },
    // myListToggle: function(){
    //   this.$store.dispatch(Constant.TOGGLE_MYLIST_ACTIVE);
    // },
    // youtubeToggle: function(){
    //   this.$store.dispatch(Constant.TOGGLE_YOUTUBE_ACTIVE);
    //   this.buttonFlag.minimization = !this.buttonFlag.minimization;
    // },
    // removeYoutube: function(){
    //   this.$store.dispatch(Constant.VIDEO_CHANGE,{videoId:''});
    // },
    widgetToggle: function(){
      this.$store.dispatch(Constant.TOGGLE_WIDGET_ACTIVE);
      this.buttonFlag.widget = !this.buttonFlag.widget;
    },

    // youtubeSearch(){
    //   console.log("this is keword",this.keword);
    //   this.$store.dispatch(Constant.YOUTUBE_SEARCH,{keword:this.keword});
    // },
    // setNumberBox(event){ // 현재 윈도우의 width를 알아내어 .number_box의 right값 수정
    //   let temp = Math.floor( (document.body.offsetWidth - 37) / 3 ); // 현재크기에서 - 37 후 나누기 3 결과 값의 소수점은 버리기
    //                                                                  // 37은  <ul class="row white-scale-100"> 의 값이 항상 현재 크기 - 37이기 때문
    //                                                                 // col-md-4 이기때문에 3개의 컬럼이 존재 하기 때문에 나누기 3
    //
    //   let rightValue = ( temp - 320 ) / 2; // col-md-4의 하나 값 - 320(img값) 그리고 이미지 양옆으로 차지하는 공간이 있기 때문에 나누기 2
    //                                        // 결과 값을 right해주면 img 제일 오른쪽으로 .number_box가 붙게됨
    //
    //   this.$store.dispatch(Constant.SET_NUMBERBOX_CSS, rightValue+"px");
    // },

  }
}
</script>

<style lang="css">

.isListActive {
  display: none;
}
.isWidgetActive {
  display: none;
}

body {
  background: rgba(1,1,1,1);
}

.bright-shadow{
  text-shadow: 0 0 20px rgba(10, 175, 230, 1), 0 0 20px rgba(10, 175, 230, 0)
  }

  /* widget */
  #widget{
    margin-top: 30px;
    width: 500px;
    height: 400px;
    border: 1px solid white;
    float: right;
  }

</style>
