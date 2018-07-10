<template>
<v-app class="grey darken-4">
  <v-container fluid>
    <v-layout row wrap>
      <v-flex md4 offset-md8 id="widget">

            <weather></weather>

            <fine-dust></fine-dust>

            <clock></clock>

      </v-flex>
    </v-layout>
    <v-layout row wrap>
      <v-flex md8>
        <youtube-controller></youtube-controller>
      </v-flex>
    </v-layout>
  </v-container>
</v-app>

</template>

<script>
import Clock from './Clock';
import Weather from './Weather';
import FineDust from './FineDust';
import YoutubeController from './YoutubeController';
import Constant from '@/Constant.js';
import {mapState} from 'vuex';


export default {
  name: 'Main',
  components: {Clock,Weather,FineDust,YoutubeController},

  created: function(){
    console.log('created!!!!!!!!!!!!!!!!!====');
    // this.$options.sockets.changeVideo = (data) => {
    //   console.log('videoData 받았다!! : ',data);
    // }
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
    // widgetToggle: function(){
    //   this.$store.dispatch(Constant.TOGGLE_WIDGET_ACTIVE);
    //   this.buttonFlag.widget = !this.buttonFlag.widget;
    // },


  }
}
</script>

<style lang="css">

body {
  background: rgba(1,1,1,1);
}

.bright-shadow{
  text-shadow: 0 0 20px rgba(10, 175, 230, 1), 0 0 20px rgba(10, 175, 230, 0)
  }

  /* widget */
  #widget{
    width: 500px;
    height: 400px;
  }

</style>
