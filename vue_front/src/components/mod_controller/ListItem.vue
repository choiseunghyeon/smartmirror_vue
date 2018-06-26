<template lang="html">
  <!-- <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container" @scroll="handleScroll">
          <div :class="'row ' + modal_top_value">
            <button class="modal-default-button" @click="closeYoutubeListModal">
              OK
            </button>
            <button class="modal-default-button" @click="toggleList">
              {{toggle.message}}
            </button>
            <loading v-if="isActive.loading" ></loading>
          </div> -->

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

          <!-- the begining of listItem-->
          <!-- <div class="white-scale-100" v-if="isLocalActive.listItem" key="listItem">
            <ul class="row">
              <div v-for="(list,index) in playListItems ">
                <li v-for="(data) in list.items" class="col-md-4">
                  <div class="number_box" :style="{ right: numberBoxRightValue }" @click.stop="saveVideo(data)">
                    <span class="show_number">저장</span>
                    <img class="number_image" src="../../../static/images/listing-option.svg" alt="">
                  </div>
                   <figure>
                     <img :src="data.snippet.thumbnails.medium.url" @click="setVideoList(data.snippet.resourceId.videoId,index)" >
                     <figcaption>{{data.snippet.title}}</figcaption>
                   </figure>
                </li>
              </div>
            </ul>
          </div>
        </transition> -->
        <!-- the end of listItem -->

        <!-- </div>
      </div>
    </div>
  </transition> -->

<div class="playList-container" v-scroll="" style="height: 100%;">
<v-card color="transparent" height="100%" flat>

  <div class="headline text-xs-center pa-5">Active: {{ e1 }}</div>
  <v-bottom-nav absolute :value="true" :active.sync="syncVal" color="transparent">
    <v-btn flat color="teal" value="recent" @click="test()">
      <span>Recent</span>
      <v-icon>history</v-icon>
    </v-btn>
    <v-btn flat color="teal" value="playlist">
      <span>Favorites</span>
      <v-icon>favorite</v-icon>
    </v-btn>
    <v-btn flat color="teal" value="listitem">
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
    console.log("created!!");
    console.log(this.$route.params);
    this.getPlayList(this.$route.params.snippet.channelId);
  },
  mounted: function(){
    let modalContainer = document.getElementsByClassName('modal-container')[0];
    this.scrollHeight = modalContainer.scrollHeight - modalContainer.clientHeight ;
    console.log("data mounted Height: ",this.scrollHeight);
  },
  updated: function(){ // 데이터가 변경되면 scroll의 길이를 구함

    let modalContainer = document.getElementsByClassName('modal-container')[0];
    this.scrollHeight = modalContainer.scrollHeight - modalContainer.clientHeight;
    console.log("upgrade complete height: ",this.scrollHeight);
  },

  computed: mapState(['selectedChannel','selectedPlayLists','playListItems','isActive', 'numberBoxRightValue',]),
  methods: {
    getPlayList: function(value){
      let channelId=value;
      // this.$store.dispatch(Constant.REMOVE_PLAY_LIST_ITEMS);
      this.$store.dispatch(Constant.GET_PLAY_LISTS,{channelId:channelId})
    },
    // morePlayList: function(channelId ,token){
    //   console.log("morePlayList called");
    //   if(token == "NULL") return;
    //   this.$store.dispatch(Constant.GET_PLAY_LISTS,{channelId:channelId,nextPageToken:token});
    // },
    //
    // handleScroll: function(e){
    //   //console.log("scroll!!: ",e.target.scrollTop);
    //   e.target.scrollTop !== 0 ? this.modal_top_value="modal_top" : this.modal_top_value="";
    //   if (Math.floor(e.target.scrollTop) == this.scrollHeight) {
    //     this.isLocalActive.playList == true ? // playList가 켜져 있는 것을 의미
    //      this.morePlayList(this.selectedChannel,this.selectedPlayLists[this.selectedPlayLists.length-1].nextToken)
    //     : this.moreListItems(this.selectedListId, this.playListItems[this.playListItems.length-1].nextToken); //
    //   }
    // },
    //
    // getListItems: function(id,title){ // PlayList의 영상 6개를 긁어옴
    //   console.log("get items!!", id);
    //   this.selectedListId = id;
    //   this.$store.dispatch(Constant.REMOVE_PLAY_LIST_ITEMS);
    //   this.$store.dispatch(Constant.GET_PLAY_LIST_ITEMS,{playlistId:id});
    //   this.toggle.title = title;
    //   this.toggleList();
    // },
    //
    // moreListItems: function(playlistId,token){ // 스크롤이 바닥을 찍으면 PlayList의 영상 9개를 추가적으로 가져옴
    //   console.log("moreListItems called");
    //   if(token == "NULL") return;
    //   this.$store.dispatch(Constant.GET_PLAY_LIST_ITEMS,{playlistId:playlistId,nextPageToken:token});
    // },
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
