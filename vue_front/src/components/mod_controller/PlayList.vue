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
        <!-- <img class="number_image" src="../../../static/images/listing-option.svg" alt=""> -->
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
import Constant from '../../Constant.js';
import {mapState} from 'vuex';
import Loading from '../Loading'

export default {
  name: "PlayList",
  data: function(){
    return {scrollHeight:0};
  },
  components: {Loading },
  created: function(){
    console.log("playlist created!!");
    this.getPlayList(this.$route.params.id);
  },
  mounted: function(){
    console.log("playlist mounted");
    this.scrollHeight = document.body.scrollHeight - 100; // 바닥을 찍고 데이터를 요청하면 늦어져서 100px 정도 조절함

  },
  updated: function(){ // 데이터가 변경되면 scroll의 길이를 구함
    console.log("playlist updated");
    this.scrollHeight = document.body.scrollHeight - 100 //- searchContainer.clientHeight;
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
