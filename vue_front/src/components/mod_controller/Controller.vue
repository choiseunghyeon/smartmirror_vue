<template>
<v-app dark id="inspire">
  <v-navigation-drawer
    fixed
    clipped
    v-model="drawer"
    app
  >
    <v-list dense>
      <v-subheader class="mt-3 grey--text text--darken-1">FUNCTIONS</v-subheader>
      <v-list-tile v-for="(item,index) in items" :key="item.text" @click="routeFromTollBar(item.routeName,index)">
        <v-list-tile-action>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>
            {{ item.text }}
          </v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>

      <v-subheader class="mt-3 grey--text text--darken-1">SUBSCRIPTIONS</v-subheader>
      <v-list>
        <v-list-tile v-for="(item,index) in channelLists" :key="item._id" avatar @click="showPlayList(item)">
          <v-list-tile-avatar>
            <img :src="item.snippet.thumbnails.default.url" alt="">
          </v-list-tile-avatar>
          <v-list-tile-title v-text="item.snippet.channelTitle"></v-list-tile-title>
          <v-icon color="red lighten-2" @click.stop="removeChannel(item._id)">clear</v-icon>
        </v-list-tile>
      </v-list>
    </v-list>
  </v-navigation-drawer>
  <v-toolbar
    color="blue-grey darken-4" dense
    fixed clipped-left app >
    <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
    <v-menu :nedge-width="100">
      <v-toolbar-title slot="activator" class="mr-1">
        <span class="title">{{ toolbar_title }}</span>
        <v-icon dark>arrow_drop_down</v-icon>
      </v-toolbar-title>
      <v-list>
        <v-list-tile v-for="obj in toolbar_title_lists" :key="obj.title" @click="changeToolbar(obj)">
          <v-list-tile-title v-text="obj.title"></v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-menu>
    <v-spacer></v-spacer>
    <v-layout row align-center style="max-width: 650px;">
      <v-text-field
        style="padding: 0px !important;"
        placeholder="Search..."
        single-line
        append-icon="search"
        :append-icon-cb="() => {this.youtubeSearch()}"
        color="white"
        v-model="keyword"
        hide-details
      ></v-text-field>
    </v-layout>
  </v-toolbar>
  <v-content>
    <v-container fill-height style="padding: 0;">
      <v-layout justify-center>
        <v-flex xs12 shrink>
          <router-view></router-view>

        </v-flex>
      </v-layout>
    </v-container>
  </v-content>

<sub-component></sub-component>
<video-controller></video-controller>
<mood-light-controller></mood-light-controller>
</v-app>
</template>

<script>
import MyList from './MyList/MyList';
import SubComponent from './SubComponent';
import VideoController from './VideoController';
import MoodLightController from './MoodLightController';
import Constant from '@/Constant.js';
import ApiKey from '@/ApiKey.js';
import {mapState} from 'vuex';


export default {
  name: 'Controller',
  components: {SubComponent, VideoController, MoodLightController},
  computed: mapState(['channelLists','currentVideoId','videoList']),
  created: function(){
    console.log('Controller created!!!!!!!!!!!!!====');
    this.GetMyListAndChannelInfo();
    this.$router.push({name:'popular'});
  },

  data: function(){
    return { keyword:'',drawer: true,
    items: [ // routing 해주거나 함수 실행
        { icon: 'trending_up', text: 'Most Popular' ,routeName: 'popular'},
        { icon: 'grade', text: '나의 목록' ,routeName:'mylistbridge'},
        { icon: 'gamepad', text: '유튜브 컨트롤러' ,routeName:'toggleVideoController'},
        { icon: 'far fa-lightbulb', text: '무드등 컨트롤러' ,routeName:'toggleMoodLightController'},
      ],
      toolbar_title_lists: [ // youtube 또는 lamp
        {title:"Youtube", routeName: 'popular'},
      ],
      toolbar_title: "Youtube",
    }
  },

  watch: { // state의 값이 바뀌면 바뀐 값을 server로 넘겨줌
    currentVideoId: function(){
      console.log('Im watching videoId');
      this.$socket.emit('changeVideo',this.currentVideoId);
    },
    videoList: function(){
      console.log('Im watching videoList');
      this.$socket.emit('changeVideoList',this.videoList);
    }
  },
  methods: {
    // server db에 있는 channel과 mylist 정보를 가져옴
    GetMyListAndChannelInfo: function(){
      this.$store.dispatch(Constant.GET_CHANNEL);
      this.$store.dispatch(Constant.GET_MYLISTNAMES);
    },
    // VideoController 숨기기 및 보이기
    toggleVideoController: function(){
      console.log('toggleVideoController');
      this.$store.dispatch(Constant.TOGGLE_YOUTUBESHEET);
    },
    // MoodLightController 숨기기 및 보이기
    toggleMoodLightController: function(){
      console.log('toggleMoodLightController');
      this.$store.dispatch(Constant.TOGGLE_LIGHTSHEET);
    },
    // Tollbar 클릭시 조건에 따라 라우팅 및 함수 실행
    routeFromTollBar: function(routeName,index){ // 3,4번째는 함수를 실행
      if(index < 2)
        this.$router.push({name: routeName});
      else {
        this[routeName]();
      }
    },
    // server로 이벤트 발생 및 유튜브 영상 끄기
    removeYoutube: function(){
      this.$store.dispatch(Constant.VIDEO_CHANGE,{videoId:''});
    },
    // routing 및 검색된 정보 보여주기
    youtubeSearch(){
      console.log("this is keword ",this.keyword);
      this.$store.dispatch(Constant.REMOVE_SEARCHED_LIST);
      this.$store.dispatch(Constant.CHANGE_KEYWORD,{keyword:this.keyword}); // 검색명 저장
      this.$store.dispatch(Constant.YOUTUBE_SEARCH,{keyword:this.keyword}); // 검색명을 통해 유튜브 영상 불러오기
      this.$router.push({name: 'search'});
    },

    // routing 및 채널이 가진 playList 보여주기
    showPlayList(channelInfo){
      console.log('channelInfo: ');
      console.dir(channelInfo);
      // this.$store.dispatch(Constant.REMOVE_PLAY_LIST);
      this.$store.dispatch(Constant.SET_CHANNELID,{id:channelInfo.snippet.channelId,title:channelInfo.snippet.channelTitle});
      this.$router.push({name:'channel'});
    },
    //채널 삭제
    removeChannel(id){
      this.$store.dispatch(Constant.DELETE_CHANNEL,id);
    },

    // 현재는 Youtube 또는 Lamp
    changeToolbar(obj){
      // this.toolbar_title = obj.title;
      this.$router.push({name: obj.routeName});
    },

  }
}
</script>
<style lang="css">
#inspire{
background-color: #212121 !important;
font-size: 16px;
}
/*  video Controller style */
#slider .v-input__slot + .v-messages {
  display: none;
  margin-bottom: 0px;
}
.v-list__tile__title{
  font-size: 15px;
}
.number_box {
  display: flex;
  flex-direction: column;
  position: absolute;
  height: 200px;
  width: 100px;
  right: 0; border: 0;
  text-align: center;
  justify-content: center;
  align-items: center;
  background-color: rgba(26, 26, 27,0.7);
  color: white;
  font-size: 1.0rem;
}
.show_number {
  font-size: 1.5rem;
}
</style>
