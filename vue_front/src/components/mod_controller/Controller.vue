<template>
<v-app dark id="inspire">
  <v-navigation-drawer
    fixed
    clipped
    v-model="drawer"
    app
  >
    <v-list dense>
      <v-list-tile v-for="item in items" :key="item.text" @click="routeFromTollBar(item.routeName)">
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
        <v-list-tile v-for="(item,index) in channelLists" :key="item.snippet.channelTitle" avatar @click="showPlayList(item)">
          <v-list-tile-avatar>
            <img :src="item.snippet.thumbnails.default.url" alt="">
          </v-list-tile-avatar>
          <v-list-tile-title v-text="item.snippet.channelTitle"></v-list-tile-title>
          <v-icon color="red lighten-2" @click.stop="removeChannel(index)">clear</v-icon>
        </v-list-tile>
      </v-list>
      <v-list-tile class="mt-3" @click="">
        <v-list-tile-action>
          <v-icon color="grey darken-1">add_circle_outline</v-icon>
        </v-list-tile-action>
        <v-list-tile-title class="grey--text text--darken-1">Browse Channels</v-list-tile-title>
      </v-list-tile>
      <v-list-tile @click="">
        <v-list-tile-action>
          <v-icon color="grey darken-1">settings</v-icon>
        </v-list-tile-action>
        <v-list-tile-title class="grey--text text--darken-1">Manage Subscriptions</v-list-tile-title>
      </v-list-tile>
    </v-list>
  </v-navigation-drawer>
  <v-toolbar
    color="red" dense
    fixed clipped-left app >
    <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
    <!-- <v-icon class="mx-3">fab fa-youtube</v-icon> -->
    <v-menu :nedge-width="100">
      <v-toolbar-title slot="activator" class="mr-3">
        <span class="title">{{ toolbar_title }}</span>
        <v-icon dark>arrow_drop_down</v-icon>
      </v-toolbar-title>
      <v-list>
        <v-list-tile v-for="title in toolbar_title_lists" :key="title" @click="changeToolbarTitle(title)">
          <v-list-tile-title v-text="title"></v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-menu>
    <v-spacer></v-spacer>
    <v-layout row align-center style="max-width: 650px">
      <v-text-field
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
</v-app>
</template>

<script>
import YoutubeController from './YoutubeController';
import MyList from './MyList';
import Constant from '../../Constant.js';
import {mapState} from 'vuex';


export default {
  name: 'Controller',
  components: {YoutubeController,MyList},
  computed: mapState(['channelLists']),

  created: function(){
    console.log('created!!!!!!!!!!!!!!!!!====');
    this.sync();
    this.$router.push({name:'popular'});
    // this.$options.sockets.message = (data) => {
    //   console.log('메시지 받았다 !! ',data);
    // }
  },

  data: function(){
    return { keyword:'',buttonFlag:{minimization:false,removal:false,widget:false},drawer: true,
    items: [
        { icon: 'trending_up', text: 'Most Popular' ,routeName: 'popular'},
        { icon: 'grade', text: '나의 목록' ,routeName:'mostPopular'},
        { icon: 'visibility_off', text: '최소화' ,routeName:'mostPopular'},
        { icon: 'clear', text: '끄기' ,routeName:'mostPopular'},
      ],
      toolbar_title_lists: [
        "Youtube",
        "Lamp"
      ],
      toolbar_title: "Youtube",
    }
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
      this.$socket.emit('message','data 받아랏!');
    },
    routeFromTollBar: function(routeName){
      this.$router.push({name: routeName});
    },
    removeYoutube: function(){
      this.$store.dispatch(Constant.VIDEO_CHANGE,{videoId:''});
    },
    youtubeSearch(){
      console.log("this is keword ",this.keyword);
      this.$store.dispatch(Constant.REMOVE_SEARCHED_LIST);
      this.$store.dispatch(Constant.CHANGE_KEYWORD,{keyword:this.keyword}); // 검색명 저장
      this.$store.dispatch(Constant.YOUTUBE_SEARCH,{keyword:this.keyword}); // 검색명을 통해 유튜브 영상 불러오기
      this.$router.push({name: 'search'});
    },
    showPlayList(channelInfo){
      console.log('channelInfo: ');
      console.dir(channelInfo);
      // this.$store.dispatch(Constant.REMOVE_PLAY_LIST);
      this.$store.dispatch(Constant.SET_CHANNELID,{id:channelInfo.snippet.channelId,title:channelInfo.snippet.channelTitle});
      this.$router.push({name:'channel'});
    },
    removeChannel(index){
      this.$store.dispatch(Constant.DELETE_CHANNEL,index);
    },

    changeToolbarTitle(title){
      this.toolbar_title = title;
    }
  }
}
</script>
<style lang="css">
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
