<template lang="html">
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container" @scroll="handleScroll">
          <div class="row">
            <button class="modal-default-button" @click="closeYoutubeListModal">
              OK
            </button>
          </div>

          <div>
            <ul id="playlist" class="row">
              <div v-for="list in selectedPlayLists ">
                <li v-for="(data,index) in list.items" class="col-md-4">
                  <!-- <p>{{(index+1)+'번째 리스트'}}</p>-->
                  <!--
                  <p>{{list.snippet.title}}</p>
                  <div v-for="(data,i) in listImages[index]" class="col-md-3">
                    <img :src="data.image.url" @click="setVideoList(listImages[index],i)" style="width:260px;">

                  </div>
                -->
                    <span>Number {{index+1}}</span>
                   <figure>
                     <img :src="data.snippet.thumbnails.medium.url" value="data.id.videoId"><figcaption>{{data.snippet.title}}</figcaption>
                   </figure>
                </li>
              </div>
            </ul>
          </div>

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
    return {selectedPlayLists:[],listImages:[],scrollHeight:0,playListUrl:''}
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
      this.playListUrl = api_url;
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
      let that = this;
      console.log("Token:  ", token);
      let api_url = this.playListUrl+'&pageToken='+token;
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
    handleScroll: function(e){
      e.target.scrollTop == this.scrollHeight ? this.morePlayList(this.selectedPlayLists[this.selectedPlayLists.length-1].nextToken) : console.log(e.target.scrollTop);
    },
    validatePlayList: function(data){
      console.log(data);
      let arr = data.items.filter((x) => {
        let url = x.snippet.thumbnails.medium.url
        let validatedValue = url.search('no_thumbnail');
        return validatedValue == -1 ? true : false;
      }); // the end of filter
      console.log("arr: ",arr);
      return {items:arr,nextPageToken:data.nextPageToken};
    },
    getListItems: function(id,index){ // PlayList의 영상 5개를 긁어옴
      console.log("get items!!", id);
      let playlistId = id;
      let that = this;
      let payload;
      $.ajax({
        url:'https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId='+playlistId+'&'+ApiKey.youtube,
        type: 'get',
        dataType:"json",
        success:function(data){
          console.log(data.items);
          /*
          console.log(data);
          console.log(data.items[0].snippet.resourceId.videoId);
          */
          payload = data.items.map((x) => { return {id:x.snippet.resourceId.videoId,image:x.snippet.thumbnails.medium} }),

          that.listImages.push(payload);
        }
      }) // the end of ajax

      console.log(payload);
      return payload;
    },
    setVideoList: function(data,num){ // 선택된 영상을 실행하고 선택된 영상이 있는 플레이 리스트의 영상을 자동실행으로 setting함
      let selectedNum = num;
      console.log(data);
      let payload = {
        idArray:data.map(x=>x.id),
        num:selectedNum,
      };
      this.$store.dispatch(Constant.SET_VIDEO_LIST,payload);
      this.listImages=[];
      this.selectedPlayLists='';
      this.closeYoutubeListModal();
    },
    closeYoutubeListModal: function(){
      this.$store.dispatch(Constant.MODAL_FLAG,'');
    },
  }
}
</script>

<style lang="css">
</style>
