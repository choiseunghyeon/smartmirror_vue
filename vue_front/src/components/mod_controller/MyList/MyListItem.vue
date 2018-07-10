<template lang="html">

<div class="listItem-container" v-scroll="handleScroll" style="height: 100%;">
    <v-card tile flat v-for="(data,index) in myListItems" @click.native="setVideoList(index)" color="transparent" class="white--text" style="border-bottom: 1px solid white !important;">

      <v-card-media
      :src="data.imgUrl"
      :value="data.videoId"
      height="200px"
      >
      <div class="number_box" >
        <span class="show_number">저장</span>
        <v-icon x-large >list</v-icon>
      </div>
      </v-card-media>
      <v-card-title>
        <div>
          <div>{{data.title}}
          </div>
        </div>
      </v-card-title>
    </v-card>

</div>

</template>

<script>
import Constant from '@/Constant.js';
import {mapState} from 'vuex';

export default {
  name: "myListItem",
  data: function(){
    return {scrollHeight:0,myListItems:[]}
  },
  created: function(){
    console.log("myListItem created!!");
    if (this.selectedMyListId != '') {
      this.getMyListItems();
    }
  },
  // mounted: function(){
  //   console.log("listItem mounted");
  //   this.scrollHeight = document.body.scrollHeight - 100; // 바닥을 찍고 데이터를 요청하면 늦어져서 100px 정도 조절함
  // },
  // updated: function(){ // 데이터가 변경되면 scroll의 길이를 구함
  //   console.log("listItem updated");
  //   this.scrollHeight = document.body.scrollHeight - 100 //- searchContainer.clientHeight;
  // },

  computed: mapState(['selectedListIndex','myListNames']),
  methods: {

    handleScroll: function(e){
      console.log(e);
      // let result = e.target.scrollingElement.scrollTop + e.target.scrollingElement.clientHeight - 100; // 문서 전체의 높이와 같음
      // result == this.scrollHeight ? this.moreListItems(this.selectedListId, this.playListItems[this.playListItems.length-1].nextToken) : console.log(result);
      //
    },

    getMyListItems: function(){ // 선택된 mylist 영상 6개를 긁어옴
      this.myListItems = this.myListNames[this.selectedListIndex].content;
    },

    // moreListItems: function(playlistId,token){ // 스크롤이 바닥을 찍으면 PlayList의 영상 9개를 추가적으로 가져옴
    //   console.log("moreListItems called");
    //   if(token == "NULL") return;
    //   this.$store.dispatch(Constant.GET_PLAY_LIST_ITEMS,{playlistId:playlistId,nextPageToken:token});
    // },
    //

    // 선택된 영상을 실행하고 선택된 영상이 있는 목록의 영상을 자동실행으로 setting함
    setVideoList: function(index){
      let tempArr = this.myListNames[this.selectedListIndex].content;
      let oneArray = tempArr.reduce((acc,val) => {
        acc.push(val.videoId);
        return acc;
      },[]);
      console.log("oneArray: ",oneArray);
      let payload = {
        idArray:oneArray,
        num:index,
      };
      this.$store.dispatch(Constant.SET_VIDEO_LIST,payload);
      // this.closeYoutubeListModal();
      // this.channelListToggle();
    },
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
