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
          <!-- the begining of palyList -->
          <div :class="{active_none:isActive.playList}">
            <ul id="playlist" class="row">
              <div v-for="list in selectedPlayLists ">
                <li v-for="(data,index) in list.items" class="col-md-4" @click="getListItems(data.id)">
                   <figure>
                     <img :src="data.snippet.thumbnails.medium.url" value="data.id.videoId">
                     <figcaption>{{data.snippet.title}}</figcaption>
                   </figure>
                </li>
              </div>
            </ul>
          </div>
          <!-- the end of playList -->

          <!-- the begining of listItem -->
          <div :class="{active_none:isActive.listItem}">
            <ul id="listItem" class="row">
              <div v-for="list in listImages ">
                <li v-for="(data,index) in list.items" class="col-md-4">
                  <!-- <p>{{(index+1)+'번째 리스트'}}</p>-->
                  <!--
                  <p>{{list.snippet.title}}</p>
                  <div v-for="(data,i) in listImages" class="col-md-3">

                  </div>
                  <span>Number {{index+1}}</span>
                -->
                   <figure>
                     <img :src="data.snippet.thumbnails.medium.url" @click="setVideoList(data.snippet.resourceId.videoId)" >
                     <figcaption>{{data.snippet.title}}</figcaption>
                   </figure>
                </li>
              </div>
            </ul>
          </div>
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
    return {selectedPlayLists:[],listImages:[],scrollHeight:0,apiUrl:{playListUrl:'',listItemUrl:''},isActive:{playList:false,listItem:true}}
  },
  created: function(){
    this.getPlayList(this.selectedChannel);
  },
  mounted: function(){
    console.log("data mounted");
    let modalContainer = document.getElementsByClassName('modal-container')[0];
    this.scrollHeight = modalContainer.scrollHeight - modalContainer.clientHeight ;
  },
  updated: function(){ // 데이터가 변경되면 scroll의 길이를 구함
    console.log("upgrade complete");
    let modalContainer = document.getElementsByClassName('modal-container')[0];
    this.scrollHeight = modalContainer.scrollHeight - modalContainer.clientHeight;
  },
  computed: mapState(['selectedChannel']),
  methods: {
    getPlayList: function(value){
      let channelId=value;
      //this.animation.clickCard=true;
      let that = this;
      this.listImages=[];
      let api_url = 'https://www.googleapis.com/youtube/v3/playlists?part=snippet&channelId='+channelId+'&maxResults=9&'+ApiKey.youtube;
      this.apiUrl.playListUrl = api_url;
      console.log(api_url);
      $.ajax({
        url: api_url,
        type: 'get',
        dataType:"json",
        success:function(data){
          console.log(data);
          let validatedObject = that.validatePlayList(data);
          console.log("validatedObject",validatedObject);
          that.selectedPlayLists.push({items:validatedObject.items, nextToken:validatedObject.nextPageToken});
          /*
          for (var i = 0; i < that.selectedPlayLists.length; i++) {
            that.getListItems(that.selectedPlayLists[i].id,i);
          }
          */
        } // the end of success
      }) // the end of ajax

    },
    morePlayList: function(token){
      if(token == "NULL") return;
      let that = this;
      console.log("Token:  ", token);
      let api_url = this.apiUrl.playListUrl+'&pageToken='+token;
      console.log("morePlayList URL: ",api_url);
      $.ajax({
        url: api_url,
        type: 'get',
        dataType:"json",
        success:function(data){
          let validatedObject = that.validatePlayList(data);
          console.log("validatedObject",validatedObject);
          that.selectedPlayLists.push({items:validatedObject.items, nextToken:validatedObject.nextPageToken});
        /*
          for (var i = 0; i < that.selectedPlayLists.length; i++) {
            that.getListItems(that.selectedPlayLists[i].id,i);
          }
          */
        } // the end of success
      }) // the end of ajax
    },
    getItemsNumber: function(playListId){
      // part=id로 해서 해당 playlist id를 요청후 totalResults로 하면 될듯
      //"https://www.googleapis.com/youtube/v3/playlistItems?part=id&playlistId=PLVXsWLG72QDaeAKIbvC1zKdxkueUWEhWr"+api.key
    },
    handleScroll: function(e){
      if (e.target.scrollTop == this.scrollHeight) {
        console.log("I'm in the if state");
        this.isActive.playList == false ? // playList가 켜져 있는 것을 의미
         this.morePlayList(this.selectedPlayLists[this.selectedPlayLists.length-1].nextToken)
        : this.moreListItems(this.listImages[this.listImages.length-1].nextToken); //
      }
    },
    validatePlayList: function(data){
      console.log(data);
      let arr = data.items.filter((x) => {
        let url = x.snippet.thumbnails.medium.url
        let validatedValue = url.search('no_thumbnail');
        return validatedValue == -1 ? true : false;
      }); // the end of filter
      console.log("arr: ",arr);
      let nToken = data.hasOwnProperty("nextPageToken") ? data.nextPageToken : 'NULL';
      return {items:arr,nextPageToken:nToken};
    },
    checkRemovedVideo: function(data){ //재생목록의 영상을 가져오는 과정에서 영상이 삭제될 경우 thumbnails property가 없는 경우가 있음 이것을 없애 주기 위한 함수
      let result = data.items.filter((x) => {
        return x.snippet.hasOwnProperty("thumbnails") ? true : false;
      });
      return result;
    },
    getListItems: function(id){ // PlayList의 영상 9개를 긁어옴
      console.log("get items!!", id);
      this.listImages=[];
      let playlistId = id;
      let that = this;
      let api_url = 'https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId='+playlistId+'&maxResults=9&'+ApiKey.youtube;
      this.apiUrl.listItemUrl = api_url;
      $.ajax({
        url:api_url,
        type: 'get',
        dataType:"json",
        success:function(data){
          console.log("listitmes: ",data);
          /*
          console.log(data);
          console.log(data.items[0].snippet.resourceId.videoId);
          payload = data.items.map((x) => { return {id:x.snippet.resourceId.videoId,image:x.snippet.thumbnails.medium} });
          */
          let checkedItems = that.checkRemovedVideo(data);
          let nToken = data.hasOwnProperty("nextPageToken") ? data.nextPageToken : 'NULL';
          that.listImages.push({items:checkedItems,nextToken:nToken});
        }
      }) // the end of ajax
      this.toggleList();
    },
    moreListItems: function(token){ // 스크롤이 바닥을 찍으면 PlayList의 영상 9개를 추가적으로 가져옴
      if(token == "NULL") return;
      let that = this;
      let api_url = this.apiUrl.listItemUrl+'&pageToken='+token;
      $.ajax({
        url: api_url,
        type: 'get',
        dataType:"json",
        success:function(data){
          console.log("listitmes: ",data);
          /*
          console.log(data);
          console.log(data.items[0].snippet.resourceId.videoId);
          payload = data.items.map((x) => { return {id:x.snippet.resourceId.videoId,image:x.snippet.thumbnails.medium} });
          */
          let checkedItems = that.checkRemovedVideo(data);
          let nToken = data.hasOwnProperty("nextPageToken") ? data.nextPageToken : 'NULL';
          that.listImages.push({items:checkedItems,nextToken:nToken});
        }
      }) // the end of ajax

    },
    setVideoList: function(id){ // 선택된 영상을 실행하고 선택된 영상이 있는 플레이 리스트의 영상을 자동실행으로 setting함
      let oneArray =[];
      for (var i = 0; i < this.listImages.length; i++){  // 여러개로 나뉘어 져있는 객체 속 배열들을 한 배열로 합치기
        let items = this.listImages[i].items;
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
      this.listImages=[];
      this.selectedPlayLists=[];
      this.closeYoutubeListModal();
      this.channelListToggle();
    },
    closeYoutubeListModal: function(){
      this.$store.dispatch(Constant.MODAL_FLAG,'');
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

.active_none {
  display: none;
}
</style>
