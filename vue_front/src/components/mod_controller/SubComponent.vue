<template lang="html">
<div>
  <!-- 시스템 메시지 -->
  <v-snackbar
    v-model="snackbar.flag"
    :timeout="snackbar.time"
    top="top"
  >
    {{ snackbar.text }}
    <v-progress-circular v-if="snackbar.progress == true"
        indeterminate
        color="red"
      ></v-progress-circular>
    <v-btn
      color="pink"
      flat
      @click="setSnackBar"
    >
      Close
    </v-btn>
  </v-snackbar>

<!-- 나의 목록 토글 -->
<v-layout row justify-center >
  <v-dialog
  v-model="videoDataSave.saveFlag"
  fullscreen hide-overlay
  transition="dialog-bottom-transition"
  scrollable
  content-class="grey darken-4"
  >
    <my-list></my-list>
  </v-dialog>
</v-layout>
<!-- 유튜브 컨트롤러 -->
<v-bottom-sheet inset v-model="youtubeSheet">

  <v-card tile>

    <v-progress-linear
    :value="50"
    class="my-0"
    height="5"
    ></v-progress-linear>

    <v-list>
      <v-list-tile>
        <v-list-tile-content>
          <v-list-tile-title>The Walker</v-list-tile-title>
          <v-list-tile-sub-title>Fitz & The Trantrums</v-list-tile-sub-title>
        </v-list-tile-content>
        <v-list-tile-action>
          <v-btn icon>
            <v-icon>fast_rewind</v-icon>
          </v-btn>
        </v-list-tile-action>

        <v-list-tile-action :class="{ 'mx-5': $vuetify.breakpoint.mdAndUp }">
          <v-btn icon>
            <v-icon>pause</v-icon>
          </v-btn>
        </v-list-tile-action>

        <v-list-tile-action :class="{ 'mr-3': $vuetify.breakpoint.mdAndUp }">
          <v-btn icon>
            <v-icon>fast_forward</v-icon>
          </v-btn>
        </v-list-tile-action>
        <v-list-tile-action :class="{ 'mr-3': $vuetify.breakpoint.mdAndUp }">
          <v-menu top offset-y :close-on-content-click="false" >
            <v-btn slot="activator"
            color="primary" dark icon>
              <v-icon>settings</v-icon>
            </v-btn>
            <v-expansion-panel
              expand
            >
              <v-expansion-panel-content
                v-for="(item, i) in panelItems"
                :key="i"
              >
                <div slot="header">{{item.title}}</div>
                <v-card v-for="(item, index) in qualityMenuItems" :key="index" style="text-align: right;" >
                  <v-card-text>{{ item.title}}</v-card-text>
                </v-card>
              </v-expansion-panel-content>
            </v-expansion-panel>
            <v-list>
              <v-list-tile
              v-for="(item, index) in settingMenuItems"
              :key="index"
              @click=""
              >
              <v-list-tile-title>{{ item.title }}</v-list-tile-title>
              {{ item.iconText }}
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-tile>

          </v-list>
        </v-menu>
      </v-list-tile-action>
    </v-list-tile>
  </v-list>
  </v-card>
</v-bottom-sheet>
</div>
</template>

<script>
import MyList from './MyList/MyList';
import Constant from '@/Constant.js';
import {mapState} from 'vuex';

export default {
  name:"SubComponent",
  components: {MyList},
  computed: mapState(['snackbar','videoDataSave']),
  data: function(){
    return {  youtubeSheet:true,
              settingMenuItems: [
                // {title: "품질", icon:"arrow_forward_ios", iconText:"자동 720HD", menu:"quality"},
                {title: "토글"},
                {title: "소리조절"},
              ],
              panelItems: [
                {title:"품질"},
                {title:"자막"},
              ],
              qualityMenuItems: [
                {title: "HD 1080p"},
                {title: "HD 720p"},
                {title: "480p"},
              ],
          }
  },
  methods:{
    setSnackBar(){ //snackbar 끄기
      this.$store.dispatch(Constant.SET_SNACKBAR,{flag:false,text:"",time:1000,progress:false});
    },
    showAnotherMenu(item){
      if(item.hasOwnProperty('menu'))
        if (item.menu=="quality") {
          this.settingMenuItems = [
            {icon:"arrow_back_ios",menu:"main"},
            {title: "HD 1080p"},
            {title: "HD 720p"},
            {title: "480p"},
          ]
        } else {
          this.settingMenuItems = [
            {title: "품질", icon:"arrow_forward_ios", iconText:"자동 720HD", menu:"quality"},
            {title: "토글"},
            {title: "소리조절"},
          ]
        }
    },
  }
}
</script>

<style lang="css">
</style>
