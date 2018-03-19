<template lang="html">
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container" @scroll="handleScroll">
          <div class="row">
            <button class="modal-default-button" @click="closeYoutubeListModal">
              OK
            </button>
            <button class="modal-default-button" @click="toggleList">
              TOGGLE
            </button>

          </div>

          <!-- the begining of palyList
        -->
        <transition name="slide" mode="out-in"
        @before-enter="elasticBeforeEnter"
          @after-enter="elasticAfterEnter"
          @before-leave="elasticBeforeLeave"
          @after-leave="elasticAfterLeave">
          <div v-if="isActive.playList" key="playList">
            <ul id="playlist" class="row">
              <div v-for="list in selectedPlayLists ">
                <li v-for="(data,index) in list.items" class="col-md-4" @click="getListItems(data.id)">
                   <figure>
                     <div class="number_box">
                       <span class="show_number">{{data.totalPage}}</span>
                       <img class="number_image" src="../../static/images/listing-option.svg" alt="">
                     </div>
                     <img :src="data.snippet.thumbnails.medium.url" value="data.id.videoId">
                     <figcaption>{{data.snippet.title}}</figcaption>
                   </figure>
                </li>
              </div>
            </ul>
          </div>
          <!-- the end of playList -->

          <!-- the begining of listItem
        -->
          <div v-if="isActive.listItem" key="listItem">
            <ul id="listItem" class="row">
              <div v-for="list in playListItems ">
                <li v-for="(data,index) in list.items" class="col-md-4">

                   <figure>
                     <img :src="data.snippet.thumbnails.medium.url" @click="setVideoList(data.snippet.resourceId.videoId)" >
                     <figcaption>{{data.snippet.title}}</figcaption>
                   </figure>
                </li>
              </div>
            </ul>
          </div>
        </transition>
        <!-- the end of listItem -->

        </div>
      </div>
    </div>
  </transition>

</template>

<script>
import Constant from '../Constant.js';
import {mapState} from 'vuex';
import ApiKey from '../ApiKey.js';
export default {
  name: "PlayList",
  data: function(){
    return {scrollHeight:0,selectedListId:'',isActive:{playList:true,listItem:false}}
  },
  created: function(){
    this.getPlayList(this.selectedChannel);
  },
  mounted: function(){
    let modalContainer = document.getElementsByClassName('modal-container')[0];
    this.scrollHeight = modalContainer.scrollHeight - modalContainer.clientHeight ;
    console.log("data mounted Height: ",this.scrollHeight);
  },
  updated: function(){ // 데이터가 변경되면 scroll의 길이를 구함
/*
*/
    let modalContainer = document.getElementsByClassName('modal-container')[0];
    this.scrollHeight = modalContainer.scrollHeight - modalContainer.clientHeight;
    console.log("upgrade complete height: ",this.scrollHeight);
  },

  computed: mapState(['selectedChannel','selectedPlayLists','playListItems']),
  methods: {

    elasticBeforeEnter: function(){
      console.log("* BeforeEnter!");
    },
    elasticAfterEnter: function(){

      let modalContainer = document.getElementsByClassName('modal-container')[0];
      this.scrollHeight = modalContainer.scrollHeight - modalContainer.clientHeight;
      console.log("* AfterEnter! height: ",this.scrollHeight);

    },
    elasticBeforeLeave: function(){
      console.log("* BeforeLeave!");
    },
    elasticAfterLeave: function(){
      console.log("@ AfterLeave");
    },

    getPlayList: function(value){
      let channelId=value;
      //this.animation.clickCard=true;
      this.$store.dispatch(Constant.REMOVE_PLAY_LIST_ITEMS);
      this.$store.dispatch(Constant.GET_PLAY_LISTS,{channelId:channelId})
    },
    morePlayList: function(channelId ,token){
      console.log("morePlayList called");
      if(token == "NULL") return;
      this.$store.dispatch(Constant.GET_PLAY_LISTS,{channelId:channelId,nextPageToken:token});
    },
    handleScroll: function(e){
      console.log("scroll!!: ",e.target.scrollTop);
      if (e.target.scrollTop == this.scrollHeight) {
        console.log("I'm in the if state");
        this.isActive.playList == true ? // playList가 켜져 있는 것을 의미
         this.morePlayList(this.selectedChannel,this.selectedPlayLists[this.selectedPlayLists.length-1].nextToken)
        : this.moreListItems(this.selectedListId, this.playListItems[this.playListItems.length-1].nextToken); //
      }
    },
    getListItems: function(id){ // PlayList의 영상 9개를 긁어옴
      console.log("get items!!", id);
      this.selectedListId = id;
      this.$store.dispatch(Constant.REMOVE_PLAY_LIST_ITEMS);
      this.$store.dispatch(Constant.GET_PLAY_LIST_ITEMS,{playlistId:id});
      this.toggleList();
    },
    moreListItems: function(playlistId,token){ // 스크롤이 바닥을 찍으면 PlayList의 영상 9개를 추가적으로 가져옴
      console.log("moreListItems called");
      if(token == "NULL") return;
      this.$store.dispatch(Constant.GET_PLAY_LIST_ITEMS,{playlistId:playlistId,nextPageToken:token});
    },
    setVideoList: function(id){ // 선택된 영상을 실행하고 선택된 영상이 있는 플레이 리스트의 영상을 자동실행으로 setting함
      let oneArray =[];
      for (var i = 0; i < this.playListItems.length; i++){  // 여러개로 나뉘어 져있는 객체 속 배열들을 한 배열로 합치기
        let items = this.playListItems[i].items;
        oneArray = oneArray.concat(items.map(x=>x.snippet.resourceId.videoId));
      }
      console.log("oneArray: ",oneArray);
      let selectedNum = oneArray.findIndex((x) => { // 선택된 id의  index 찾기
        return x == id;
      });
      console.log(selectedNum);
      //console.log(data);
      let payload = {
        idArray:oneArray,
        num:selectedNum,
      };
      this.$store.dispatch(Constant.SET_VIDEO_LIST,payload);
      this.closeYoutubeListModal();
      this.channelListToggle();
    },
    closeYoutubeListModal: function(){
      this.$store.dispatch(Constant.MODAL_FLAG,'');
      this.$store.dispatch(Constant.REMOVE_PLAY_LIST);
      this.$store.dispatch(Constant.REMOVE_PLAY_LIST_ITEMS);
    },
    toggleList: function(){
      this.isActive.playList = !this.isActive.playList;
      this.isActive.listItem = !this.isActive.listItem;
    },
    channelListToggle: function(){
      this.$store.dispatch(Constant.TOGGLE_CHANNEL_ACTIVE);
    },
  }
}
</script>
<style lang="css" scoped>
.slide-enter-active {
  transition: all .3s ease;
}
.slide-leave-active {
  transition: all .4s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-enter, .slide-leave-to {
  transform: translateX(10px);
  opacity: 0;
}
</style>
