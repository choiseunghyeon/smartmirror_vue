<template lang="html">


<div class="channel-container" v-scroll="" style="height: 100%;">
<v-card color="transparent" height="100%" flat>
  <router-view></router-view>

  <v-bottom-nav fixed shift :value="true" :active.sync="syncVal" color="red">
    <v-btn flat color="teal" value="recent" @click="test()">
      <span>Recent</span>
      <v-icon>history</v-icon>
    </v-btn>
    <v-btn flat color="teal" value="playlist" @click="routePlayList()">
      <span>Favorites</span>
      <v-icon>favorite</v-icon>
    </v-btn>
    <v-btn flat color="teal" value="listitem" @click="routeListItem()">
      <span>Nearby</span>
      <v-icon>place</v-icon>
    </v-btn>
  </v-bottom-nav>
</v-card>
</div>
</template>

<script>
import Constant from '../../Constant.js';
import {mapState} from 'vuex';
import Loading from '../Loading'
import ApiKey from '../../ApiKey.js';

export default {
  name: "YoutubeChannel",
  data: function(){
    return {scrollHeight:0,selectedListId:''
    ,syncVal:'playlist'}
  },
  components: {Loading },
  created: function(){
    console.log('channel created');
    this.routePlayList();
  },
  mounted: function(){
    console.log('channel mounted');
  },
  beforeUpdate: function(){
    console.log(" channel beforeUpdate!!");
    // this.routePlayList();
  },
  watch: {
    '$route' (to, from){
      console.log('watching route');
      console.log('from :');
      console.log(from);
      console.log('to: ');
      console.log(to);
      this.routePlayList();
    }
  },
  computed: mapState(['selectedChannel','selectedPlayLists','playListItems', 'numberBoxRightValue',]),
  methods: {
    routePlayList: function(){
      // this.$store.dispatch(Constant.REMOVE_PLAY_LIST_ITEMS);
      // this.$store.dispatch(Constant.GET_PLAY_LISTS,{channelId:channelId})
      // this.$store.dispatch(Constant.REMOVE_PLAY_LIST);
      this.$router.push({name:'playlist', params:{name: this.selectedChannel.title}});
    },
    routeListItem: function(){

    },

  }
}
</script>
