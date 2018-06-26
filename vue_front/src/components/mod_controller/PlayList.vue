<template lang="html">


          <!-- the begining of palyList-->
        <!-- <transition name="slide" mode="out-in"
          @after-enter="slideAfterEnter">
          <div class="white-scale-100" v-if="isLocalActive.playList" key="playList">
            <ul class="row">
              <div v-for="list in selectedPlayLists ">
                <li v-for="(data,index) in list.items" class="col-md-4" @click="getListItems(data.id,data.snippet.title)">
                   <figure>
                     <div class="number_box" :style="{ right: numberBoxRightValue }" >
                       <span class="show_number">{{data.totalPage}}</span>
                       <img class="number_image" src="../../../static/images/listing-option.svg" alt="">
                     </div>
                     <img :src="data.snippet.thumbnails.medium.url" value="data.id.videoId">
                     <figcaption>{{data.snippet.title}}</figcaption>
                   </figure>
                </li>
              </div>
            </ul>
          </div> -->
          <!-- the end of playList -->



        <!-- </div>
      </div>
    </div>
  </transition> -->


<div class="playList-container" v-scroll="handleScroll">

  <div v-for="list in selectedPlayLists">
    <v-card tile flat v-for="(data,index) in list.items" @click.native="routeListItem()" color="transparent" class="white--text" style="border-bottom: 1px solid white !important;">

      <v-card-media
      :src="data.snippet.thumbnails.medium.url"
      :value="data.id.videoId"
      height="200px"
      ></v-card-media>
      <v-card-title>
        <div>
          <div>{{data.snippet.title}}</div>
        </div>
      </v-card-title>
    </v-card>
  </div>

</div>
</template>

<script>
import Constant from '../../Constant.js';
import {mapState} from 'vuex';
import Loading from '../Loading'
import ApiKey from '../../ApiKey.js';

export default {
  name: "PlayList",
  data: function(){
    return {scrollHeight:0};
  },
  components: {Loading },
  created: function(){
    console.log("playlist created!!");
    this.getPlayList(this.selectedChannel.id);
  },
  mounted: function(){
    console.log("data mounted");
    this.scrollHeight = document.body.scrollHeight - 100; // 바닥을 찍고 데이터를 요청하면 늦어져서 100px 정도 조절함

  },
  updated: function(){ // 데이터가 변경되면 scroll의 길이를 구함
    console.log("upgrade complete");
    this.scrollHeight = document.body.scrollHeight - 100 //- searchContainer.clientHeight;
  },
  watch: {
    '$route' (to, from){
      console.log('watching route');
      console.log('from :');
      console.log(from);
      console.log('to: ');
      console.log(to);
      this.getPlayList(this.selectedChannel.id);
    }
  },
  computed: mapState(['selectedChannel','selectedPlayLists', 'numberBoxRightValue',]),
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
  },


}

</script>
