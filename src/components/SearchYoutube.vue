<template lang="html">
  <div class="col-md-12">
    <!--<input id="search_keword" type="text" name="" value="">-->
    <div id="channellist" :class="{channellist_active:isActive.channellists}">
        <div v-for="(list,index) in channelLists" @click.stop="getPlayList(index)" class="col-md-3">
            <figure :class="'card-ui'+' card-in ' +{card_click:true}">
              <img :src="list.snippet.thumbnails.medium.url">
              <figcaption>{{list.snippet.channelTitle}}</figcaption>
              <button id="channel_delete" @click.stop="deleteChannel(index)" type="button" name="button">&#10006;</button>
            </figure>
        </div>
    </div>

    <transition name="modal">
      <div v-if="modal.searchedYoutubeList" class="modal-mask">
        <div class="modal-wrapper">
          <div class="modal-container">
            <div class="row">
              <button class="modal-default-button" @click="closeYoutubeListModal">
                OK
              </button>
            </div>
            <ul id="youtube-list" class="row">
              <li v-for="(data,i) in searchedLists" @click.stop="changeYoutube(i)" class="col-md-4">
                <!-- <span>Number {{i+1}}</span>
                <span v-if="data.id.channelId">{{data.snippet.title+"채널"}}</span>-->
                <figure>
                  <img :src="data.snippet.thumbnails.medium.url" value="data.id.videoId"><figcaption>{{data.snippet.title}}</figcaption>
                </figure>
              </li>
            </ul>

          </div>
        </div>
      </div>
    </transition>


    <div id="playlist" class="row">
      <ul>
        <li v-for="(list,index) in selectedPlayLists" class="row">
          <!-- <p>{{(index+1)+'번째 리스트'}}</p>-->
          <p>{{list.snippet.title}}</p>
          <div v-for="(data,i) in listImages[index]" class="col-md-3">
            <img :src="data.image.url" @click="setVideoList(listImages[index],i)" style="width:240px;">

          </div>
        </li>
      </ul>
    </div>
  <!--<button @click="channelListToggle" type="button" name="button">쇼미 채널</button>-->
  </div> <!-- the end -->
</template>

<script>
import Constant from '../Constant.js';
import ApiKey from '../ApiKey.js';
import {mapState} from 'vuex';

export default {
  name:"SearchYoutube",
  data: function(){
    return {selectedPlayLists:'',listImages:[],animation:{clickCard:false}}
  },
  mounted: function(){
    this.init();
  },
  computed: mapState(['searchedLists','channelLists','isActive','modal']),
  methods: {
    init: function(){
      let that = this;
      console.log('dd');
      //검색
      $("#search_keword").on("blur",function(){
        console.log("called search_keword");
        var keword = $("#search_keword").val();
        let order = {'최신순':'date','조회수':'viewCount'};
        var api_url="https://www.googleapis.com/youtube/v3/search?part=snippet&q="+keword+"&maxResults=6&order="+order.조회수+"&"+ApiKey.youtube
        // video중 조회수가 제일 높은 것 상위 5개의 list를 가져옴
        console.log(api_url);

        $.ajax({
            url: api_url,
            type: 'get',
            dataType: 'json',
            success:function(data){

              console.log(data);
              console.log(data.items);
              console.log(data.items[0].snippet.title);
              that.$store.dispatch(Constant.SEARCHED_LIST,data.items);
              that.$store.dispatch(Constant.MODAL_SEARCHED_YOUTUBE_LIST);
            }
        })

      })
      // 검색 끝
    },
    changeYoutube: function(index){
      let data = this.searchedLists[index];
      console.log("change",data);
      if (data.id.hasOwnProperty('channelId')) {
        this.$store.dispatch(Constant.ADD_CHANNEL,{snippet: data.snippet});
      }
      else this.$store.dispatch(Constant.VIDEO_CHANGE,{videoId:data.id.videoId});
      this.removeSearchedList();

      this.closeYoutubeListModal();
    },
    deleteChannel: function(index){
      this.$store.dispatch(Constant.DELETE_CHANNEL,index);
    },
    getPlayList: function(index){
      let channelId=this.channelLists[index].snippet.channelId
      this.animation.clickCard=true;
      let that = this;
      this.listImages=[];
      $.ajax({
        url:'https://www.googleapis.com/youtube/v3/playlists?part=snippet&channelId='+channelId+'&'+ApiKey.youtube,
        type: 'get',
        dataType:"json",
        success:function(data){
          console.log(data);
          that.selectedPlayLists=data.items;
          for (var i = 0; i < that.selectedPlayLists.length; i++) {
            that.getListItems(that.selectedPlayLists[i].id,i);
          }

        } // the end of success
      }) // the end of ajax

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
    },
    removeSearchedList: function(){
      this.$store.dispatch(Constant.SEARCHED_LIST,"");
    },
    closeYoutubeListModal: function(){
      this.$store.dispatch(Constant.MODAL_SEARCHED_YOUTUBE_LIST);
    }
  }
}
</script>

<style lang="css" scoped>
.channellist_active {display:none;}
.search_active {display: none;}
.card-in{
  animation: card-in 0.5s;
}
.card_click {
  animation: card_click 0.5s;
}
.card-out {
  animation: card-out 0.5s;
}
@keyframes card_click {
  0% {transform: scale(0.3); opacity:0.4; }
  70% {transform: scale(1.3); opacity:0.7;}
  100% {transform: scale(0); opacity:1;}
}
@keyframes card-in {
  0% {opacity:0.1; }
  70% {opacity:0.7;}
  100% {opacity:1;}
}
@keyframes card-out {
  0% {transform: scale(1);opacity:0.8; }
  70% {transform: scale(0.6);opacity:0.7;}
  100% {transform: scale(0);opacity:0;}
}
</style>
