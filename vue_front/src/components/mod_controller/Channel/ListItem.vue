<template lang="html">

<div class="listItem-container" v-scroll="handleScroll" style="height: 100%;">
  <div v-for="(list,index) in playListItems">
    <v-card tile flat v-for="(data) in list.items" @click.native="setVideoList(data.snippet.resourceId.videoId,index)" color="transparent" class="white--text" style="border-bottom: 1px solid white !important;">

      <v-card-media
      :src="data.snippet.thumbnails.medium.url"
      :value="data.snippet.resourceId.videoId"
      height="200px"
      >
      <div class="number_box" @click.stop="saveVideo(data)">
        <span class="show_number">저장</span>
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
</div>
</template>

<script>
import Constant from '@/Constant.js';
import {mapState} from 'vuex';
import ScrollHeight from '@/mixin/ScrollHeight.js';
import SaveVideo from '@/mixin/SaveVideo.js';
export default {
  name: "ListItem",
  mixins: [ScrollHeight, SaveVideo],
  data: function(){
    return {selectedListId:'',}
  },
  created: function(){
    console.log("created!!");
    let listId = this.$route.params.listId
    if (listId != undefined) { // 선택된 playlist ID로 해당 palylist의 영상들을 가져옴
      this.getListItems(this.$route.params.listId);
    }
  },


  computed: mapState(['selectedPlayLists','playListItems',]),
  methods: {

    handleScroll: function(e){
      console.log(e);
      let result = Math.ceil(e.target.scrollingElement.scrollTop + e.target.scrollingElement.clientHeight) // 문서 전체의 높이와 같음
      result >= this.scrollHeight ? this.moreListItems(this.selectedListId, this.playListItems[this.playListItems.length-1].nextToken) : console.log(result);

    },

    // PlayList의 영상 6개를 긁어옴
    getListItems: function(id){
      console.log("get items!!", id);
      this.selectedListId = id;
      this.$store.dispatch(Constant.REMOVE_PLAY_LIST_ITEMS);
      this.$store.dispatch(Constant.GET_PLAY_LIST_ITEMS,{playlistId:id});
    },

    // 스크롤이 바닥을 찍으면 PlayList의 영상 6개를 추가적으로 가져옴
    moreListItems: function(playlistId,token){
      console.log("moreListItems called");
      if(token == "NULL") return;
      this.$store.dispatch(Constant.GET_PLAY_LIST_ITEMS,{playlistId:playlistId,nextPageToken:token});
    },

    // 영상 목록을 만들어 mirror에 영상 목록들과 어느 영상부터 실행할지 전달
    setVideoList: function(id,index){
      let oneArray =[];
      for (var i = index; i < this.playListItems.length; i++){  // 여러개로 나뉘어 져있는 객체 속 배열들을 한 배열로 합치기
        let items = this.playListItems[i].items;
        items.forEach(function(x){
          oneArray.push(x.snippet.resourceId.videoId);
        });
      }
      console.log("oneArray: ",oneArray);
      console.log(id);
      let selectedNum = oneArray.indexOf(id);
      let payload = {
        idArray:oneArray,
        num:selectedNum,
      };
      this.$store.dispatch(Constant.SET_VIDEO_LIST,payload);
    },

  }
}
</script>
