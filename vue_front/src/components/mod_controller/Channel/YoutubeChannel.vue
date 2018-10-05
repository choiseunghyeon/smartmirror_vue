<template lang="html">


<div class="channel-container" v-scroll="" style="height: 100%;">
<v-card color="transparent" height="100%" flat>
  <!-- key를 넣지 않으면 같은 url로 가는 path에 대해서 같은 것으로 인식 component들을 reload하지 않음
       key를 넣으면 다른 값으로 인식 component -->
  <router-view :key="$route.fullPath"></router-view>

  <v-bottom-nav fixed shift :value="true" :active.sync="localNavVal" color="grey darken-4">
    <v-btn flat color="teal" value="playlist" @click="routePlayList()">
      <span>재생목록</span>
      <v-icon>view_week</v-icon>
    </v-btn>
    <v-btn flat color="teal" value="listitem" @click="routeListItem()">
      <span>동영상</span>
      <v-icon>video_library</v-icon>
    </v-btn>
  </v-bottom-nav>
</v-card>
</div>
</template>

<script>
import Constant from '@/Constant.js';
import {mapState} from 'vuex';

export default {
  name: "YoutubeChannel",
  data: function(){
    return {scrollHeight:0,localNavVal:'playlist'};
  },
  created: function(){
    console.log('channel created');
    this.routePlayList();
  },
  watch: {
    // selectedChannel을 관찰 속성으로 하는 이유: channel로 route된 이후 목록을 가져와야 하지만
    // channel은 created 이후에 새로 만들지 않음 updated은 다른 컴포넌트로 연결할 때도 쓰이기 때문에 안됨
    selectedChannel: function() {
      console.log('i\'m watching you');
      this.routePlayList();
    },
    channelNavVal: function(){
      return this.localNavVal = this.channelNavVal;
    },
  },
  computed: mapState(['selectedChannel','channelNavVal']),
  methods: {
    routePlayList: function(){
      console.log("called routerPlayList");
      this.$store.dispatch(Constant.SYNC_CHANNEL_NAVIGATION,"playlist");
      this.$router.push({name:'playlist', params:{id: this.selectedChannel.id}});
    },
    routeListItem: function(){
      this.$store.dispatch(Constant.SYNC_CHANNEL_NAVIGATION,"listitem");
      this.$router.push({name:'listitem'});
    },

  }
}
</script>
