<template lang="html">

<div class="listItem-container" v-scroll="handleScroll" style="height: 100%;">
  <div v-for="(list,index) in playListItems">
    <v-card tile flat v-for="(data) in list.items" @click.native="" color="transparent" class="white--text" style="border-bottom: 1px solid white !important;">

      <v-card-media
      :src="data.snippet.thumbnails.medium.url"
      :value="data.id.videoId"
      height="200px"
      >
      <div class="number_box" >
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
import Constant from '../../Constant.js';
import {mapState} from 'vuex';
import Loading from '../Loading'

export default {
  name: "ListItem",
  data: function(){
    return {scrollHeight:0,selectedListId:'',}
  },
  components: {Loading },
  created: function(){
    console.log("created!!");
    let listId = this.$route.params.listId
    if (listId != undefined) {
      this.getListItems(this.$route.params.listId);
    }
  },
  mounted: function(){
    console.log("listItem mounted");
    this.scrollHeight = document.body.scrollHeight - 100; // 바닥을 찍고 데이터를 요청하면 늦어져서 100px 정도 조절함
  },
  updated: function(){ // 데이터가 변경되면 scroll의 길이를 구함
    console.log("listItem updated");
    this.scrollHeight = document.body.scrollHeight - 100 //- searchContainer.clientHeight;
  },

  computed: mapState(['selectedPlayLists','playListItems',]),
  methods: {

    handleScroll: function(e){
      console.log(e);
      let result = e.target.scrollingElement.scrollTop + e.target.scrollingElement.clientHeight - 100; // 문서 전체의 높이와 같음
      result == this.scrollHeight ? this.moreListItems(this.selectedListId, this.playListItems[this.playListItems.length-1].nextToken) : console.log(result);

    },

    getListItems: function(id){ // PlayList의 영상 6개를 긁어옴
      console.log("get items!!", id);
      this.selectedListId = id;
      this.$store.dispatch(Constant.REMOVE_PLAY_LIST_ITEMS);
      this.$store.dispatch(Constant.GET_PLAY_LIST_ITEMS,{playlistId:id});
    },

    moreListItems: function(playlistId,token){ // 스크롤이 바닥을 찍으면 PlayList의 영상 9개를 추가적으로 가져옴
      console.log("moreListItems called");
      if(token == "NULL") return;
      this.$store.dispatch(Constant.GET_PLAY_LIST_ITEMS,{playlistId:playlistId,nextPageToken:token});
    },
    //
    // setVideoList: function(id,index){ // 선택된 영상을 실행하고 선택된 영상이 있는 플레이 리스트의 영상을 자동실행으로 setting함
    //   let oneArray =[];
    //   for (var i = index; i < this.playListItems.length; i++){  // 여러개로 나뉘어 져있는 객체 속 배열들을 한 배열로 합치기
    //     let items = this.playListItems[i].items;
    //     items.forEach(function(x){
    //       oneArray.push(x.snippet.resourceId.videoId);
    //     });
    //   }
    //   console.log("oneArray: ",oneArray);
    //   let selectedNum = oneArray.indexOf(id);
    //   let payload = {
    //     idArray:oneArray,
    //     num:selectedNum,
    //   };
    //   this.$store.dispatch(Constant.SET_VIDEO_LIST,payload);
    //   this.closeYoutubeListModal();
    //   this.channelListToggle();
    // },
    // saveVideo: function(data){
    //   let obj = {
    //     saveFlag:true,
    //     data:{
    //       title: data.snippet.title, videoId: data.snippet.resourceId.videoId,imgUrl: data.snippet.thumbnails.medium.url
    //     }
    //   };
    //   this.$store.dispatch(Constant.TOGGLE_MYLIST_ACTIVE);
    //   this.$store.dispatch(Constant.VIDEO_DATA_SAVE,obj);
    // },
  }
}
</script>
