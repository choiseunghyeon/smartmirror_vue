<template>
<v-app class="grey darken-4">
  <v-container fluid>
    <v-layout row wrap>
      <v-flex md5 offset-md7 id="widget">
        <!--  날씨 컴포넌트 -->
        <weather></weather>
        <!-- 미세먼지 컴포넌트 -->
        <fine-dust></fine-dust>
        <!-- 시계 컴포넌트 -->
        <clock></clock>

      </v-flex>
    </v-layout>
    <v-layout row wrap>
      <v-flex md8>
        <!-- 유튜브 영상 컴포넌트 -->
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
    console.log('Main created!!!!!!!!!!====');
  },

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
    height: 500px;
  }

</style>
