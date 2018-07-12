<template>
<v-app dark id="inspire">
  <v-navigation-drawer
    fixed
    clipped
    v-model="drawer"
    app
  >
    <v-list dense>
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
    <v-menu :nedge-width="100">
      <v-toolbar-title slot="activator" class="mr-3">
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
</v-app>
</template>

<script>
import MyList from './MyList/MyList';
import Constant from '@/Constant.js';
import {mapState} from 'vuex';


export default {
  name: 'Controller',
  components: {MyList},
  computed: mapState(['channelLists','videoDataSave','snackbar','currentVideoId','videoList']),

  created: function(){
    console.log('created!!!!!!!!!!!!!!!!!====');
    this.sync();
    this.$router.push({name:'popular'});
  },

  data: function(){
    return { keyword:'',drawer: true,
    items: [
        { icon: 'trending_up', text: 'Most Popular' ,routeName: 'popular'},
        { icon: 'grade', text: '나의 목록' ,routeName:'mylistbridge'},
        { icon: 'visibility_off', text: '최소화' ,routeName:'toggleYoutube'},
        { icon: 'clear', text: '끄기' ,routeName:'removeYoutube'},
      ],
      toolbar_title_lists: [
        {title:"Youtube", routeName: 'popular'},
        {title:"Lamp", routeName: 'lamp'},
      ],
      toolbar_title: "Youtube",
    }
  },
  // sockets: {
  //   connect: function(){ //server와 socket연결 맺음
  //     console.log('socket connected');
  //   },
  // },
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
    sync: function(){
      // server db에 있는 channel과 mylist 정보를 가져옴
      this.$store.dispatch(Constant.GET_CHANNEL);
      this.$store.dispatch(Constant.GET_MYLISTNAMES);
    },
    toggleYoutube: function(){
      // server에 toggleYoutube event 발생
      this.$socket.emit('toggleYoutube');
    },
    routeFromTollBar: function(routeName,index){ // 3,4번째는 함수를 실행
      if(index < 2)
        this.$router.push({name: routeName});
      else {
        this[routeName]();
      }
    },
    removeYoutube: function(){ // server로 이벤트 발생과 값 전달
      this.$store.dispatch(Constant.VIDEO_CHANGE,{videoId:''});
    },
    youtubeSearch(){ // routing 및 검색된 정보 보여주기
      console.log("this is keword ",this.keyword);
      this.$store.dispatch(Constant.REMOVE_SEARCHED_LIST);
      this.$store.dispatch(Constant.CHANGE_KEYWORD,{keyword:this.keyword}); // 검색명 저장
      this.$store.dispatch(Constant.YOUTUBE_SEARCH,{keyword:this.keyword}); // 검색명을 통해 유튜브 영상 불러오기
      this.$router.push({name: 'search'});
    },
    showPlayList(channelInfo){ // routing 및 채널이 가진 playList 보여주기
      console.log('channelInfo: ');
      console.dir(channelInfo);
      // this.$store.dispatch(Constant.REMOVE_PLAY_LIST);
      this.$store.dispatch(Constant.SET_CHANNELID,{id:channelInfo.snippet.channelId,title:channelInfo.snippet.channelTitle});
      this.$router.push({name:'channel'});
    },
    removeChannel(id){ //채널 삭제
      this.$store.dispatch(Constant.DELETE_CHANNEL,id);
    },
    setSnackBar(){ //snackbar 끄기
      this.$store.dispatch(Constant.SET_SNACKBAR,{flag:false,text:"",time:1000,progress:false});
    },
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
