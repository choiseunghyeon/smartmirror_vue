<template lang="html">
<div class="playList-container" v-scroll="handleScroll">

  <div v-for="list in selectedPlayLists">
    <v-card tile flat v-for="(data,index) in list.items" @click.native="routeListItem(data.id)" color="transparent" class="white--text" style="border-bottom: 1px solid white !important;">

      <v-card-media
      :src="data.snippet.thumbnails.medium.url"
      :value="data.id.videoId"
      height="200px"
      >
      <div class="number_box" >
        <span class="show_number">{{data.totalPage}}</span>
        <v-icon x-large >list</v-icon>
      </div>
      </v-card-media>
      <v-card-title>
        <div>
          <div>{{data.snippet.title}}
          </div>
        </div>
      </v-card-title>
    </v-card>
  </div>
  <!-- 밑에 bottom navigation의 height가 56px임 이게 없으면 navigation이 card일부를 가리게 됨 -->
  <div class="box-56" style="height: 56px;">
  </div>
</div> <!-- the end of playList-containe -->
</template>

<script>
import Constant from '@/Constant.js';
import {mapState} from 'vuex';
import ScrollHeight from '@/mixin/ScrollHeight.js';
export default {
  name: "PlayList",

  created: function(){
    console.log("playlist created!!");
    this.getPlayList(this.$route.params.id); // Channel ID를 받아 playList 목록들 보여줌
  },
  computed: mapState(['selectedChannel','selectedPlayLists']),
  methods: {
    getPlayList: function(value){
      let channelId=value;
      this.$store.dispatch(Constant.REMOVE_PLAY_LIST);
      this.$store.dispatch(Constant.GET_PLAY_LISTS,{channelId:channelId})
    },
    morePlayList: function(channelId ,token){
      console.log("morePlayList called");
      if(token == "NULL") return;
      this.$store.dispatch(Constant.GET_PLAY_LISTS,{channelId:channelId,nextPageToken:token});
    },

    handleScroll: function(e){
        console.log(e);
        let result = e.target.scrollingElement.scrollTop + e.target.scrollingElement.clientHeight - 100; // 문서 전체의 높이와 같음
        result == this.scrollHeight ? this.morePlayList(this.selectedChannel.id,this.selectedPlayLists[this.selectedPlayLists.length-1].nextToken) : console.log(result);

    },
    routeListItem: function(id){
        this.$store.dispatch(Constant.SYNC_CHANNEL_NAVIGATION,"listitem");
        this.$router.push({name:'listitem', params:{listId:id}});
    },
  },

}

</script>
