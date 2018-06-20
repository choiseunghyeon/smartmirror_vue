<template>
<v-app dark id="inspire">
  <v-navigation-drawer
    fixed
    clipped
    v-model="drawer"
    app
  >
    <v-list dense>
      <v-list-tile v-for="item in items" :key="item.text" @click="">
        <v-list-tile-action>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>
            {{ item.text }}
          </v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
      <!-- <v-subheader class="mt-3 grey--text text--darken-1">SUBSCRIPTIONS</v-subheader> -->
      <!-- <v-list>
        <v-list-tile v-for="item in items2" :key="item.text" avatar @click="">
          <v-list-tile-avatar>
            <img :src="`https://randomuser.me/api/portraits/men/${item.picture}.jpg`" alt="">
          </v-list-tile-avatar>
          <v-list-tile-title v-text="item.text"></v-list-tile-title>
        </v-list-tile>
      </v-list> -->
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
        v-model="keword"
        hide-details
      ></v-text-field>
    </v-layout>
  </v-toolbar>
  <v-content>
    <v-container fill-height style="padding: 0;">
      <v-layout justify-center>
        <v-flex xs12 shrink>
          <router-view></router-view>
          <!-- <v-card tile flat color="transparent" class="white--text" style="border-bottom: 1px solid white !important;">
              <v-container fluid grid-list-lg>
                <v-layout row>
                  <v-flex xs7>
                    <div>
                      <div class="headline">Halycon Days</div>
                      <div>Ellie Goulding</div>
                    </div>
                  </v-flex>
                  <v-flex xs5>
                    <v-card-media
                      src="./static/images/x.png"
                      height="125px"
                      contain
                    ></v-card-media>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-card> -->
        </v-flex>
      </v-layout>
    </v-container>
  </v-content>
</v-app>
</template>

<script>
import SearchYoutube from './SearchYoutube';
import YoutubeController from './YoutubeController';
import MyList from './MyList';
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
    return { keword:'',buttonFlag:{minimization:false,removal:false,widget:false},drawer: true,
    items: [
        { icon: 'trending_up', text: 'Most Popular' },
        { icon: 'subscriptions', text: '채널' },
        { icon: 'grade', text: 'MyList' },
        { icon: 'visibility_off', text: '최소화' },
        { icon: 'clear', text: '끄기' },
      ],
      items2: [
        { picture: 28, text: 'Joseph' },
        { picture: 38, text: 'Apple' },
        { picture: 48, text: 'Xbox Ahoy' },
        { picture: 58, text: 'Nokia' },
        { picture: 78, text: 'MKBHD' }
      ],
      toolbar_title_lists: [
        "Youtube",
        "Lamp"
      ],
      toolbar_title: "Youtube",
    }
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
      this.$socket.emit('message','data 받아랏!');
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
      console.log("this is keword ",this.keword);
      this.$store.dispatch(Constant.YOUTUBE_SEARCH,{keword:this.keword});
      this.$router.push({name: 'search'});
    },
    setNumberBox(event){ // 현재 윈도우의 width를 알아내어 .number_box의 right값 수정
      let temp = Math.floor( (document.body.offsetWidth - 37) / 3 ); // 현재크기에서 - 37 후 나누기 3 결과 값의 소수점은 버리기
                                                                     // 37은  <ul class="row white-scale-100"> 의 값이 항상 현재 크기 - 37이기 때문
                                                                    // col-md-4 이기때문에 3개의 컬럼이 존재 하기 때문에 나누기 3

      let rightValue = ( temp - 320 ) / 2; // col-md-4의 하나 값 - 320(img값) 그리고 이미지 양옆으로 차지하는 공간이 있기 때문에 나누기 2
                                           // 결과 값을 right해주면 img 제일 오른쪽으로 .number_box가 붙게됨

      this.$store.dispatch(Constant.SET_NUMBERBOX_CSS, rightValue+"px");
    },
    changeToolbarTitle(title){
      this.toolbar_title = title;
    }
  }
}
</script>
