<template lang="html">
  <div class="col-md-12">
    <!--<input id="search_keword" type="text" name="" value="">-->
    <div id="channellist" :class="{channellist_active:isActive.channellists}">
        <div v-for="(list,index) in channelLists" @click.stop="showPlayList(index)" class="col-md-3">
            <figure :class="'card-ui'+' card-in ' +{card_click:true}">
              <img :src="list.snippet.thumbnails.medium.url">
              <figcaption>{{list.snippet.channelTitle}}</figcaption>
              <button id="channel_delete" @click.stop="deleteChannel(index)" type="button" name="button">&#10006;</button>
            </figure>
        </div>
    </div>


    <searched-list v-if="modalFlag == 'SearchedList'" @changeYoutube="changeYoutube"></searched-list>
    <play-list v-if="modalFlag == 'PlayList'" ></play-list>



  <!--<button @click="channelListToggle" type="button" name="button">쇼미 채널</button>-->
  </div> <!-- the end -->
</template>

<script>
import Constant from '../Constant.js';
import ApiKey from '../ApiKey.js';
import SearchedList from './SearchedList';
import PlayList from './PlayList';
import {mapState} from 'vuex';

export default {
  name:"SearchYoutube",
  components: {SearchedList,PlayList},
  mounted: function(){
    this.init();
  },
  computed:  mapState(['channelLists','isActive','modalFlag']),
  methods: {
    init: function(){
      let that = this;
      console.log('dd');
      //검색
      $("#search_keword").on("blur",function(){
        console.log("called search_keword");
        let keword = $("#search_keword").val();
        let order = {'최신순':'date','조회수':'viewCount'};
        var api_url="https://www.googleapis.com/youtube/v3/search?part=snippet&q="+keword+"&maxResults=9&order="+order.조회수+"&"+ApiKey.youtube
        // video중 조회수가 제일 높은 것 상위 5개의 list를 가져옴
        console.log("api_url: ",api_url);

        $.ajax({
            url: api_url,
            type: 'get',
            dataType: 'json',
            success:function(data){

              //that.$store.dispatch(Constant.REMOVE_SEARCHED_LIST);
              console.log(data);
              console.log(data.items);
              console.log(data.items[0].snippet.title);
              that.$store.dispatch(Constant.SEARCHED_LIST,data);
              that.$store.dispatch(Constant.MODAL_FLAG,"SearchedList");
            }
        })

      })
      // 검색 끝
    },
    changeYoutube: function(data){
      console.log("change",data);
      data.id.hasOwnProperty("channelId") ? this.$store.dispatch(Constant.ADD_CHANNEL,{snippet: data.snippet})
        : this.$store.dispatch(Constant.VIDEO_CHANGE,{videoId:data.id.videoId});
      this.removeSearchedList();

      this.closeYoutubeListModal();
    },
    deleteChannel: function(index){
      this.$store.dispatch(Constant.DELETE_CHANNEL,index);
    },
    showPlayList: function(index){
      let channelId=this.channelLists[index].snippet.channelId
      this.$store.dispatch(Constant.SET_CHANNELID,channelId);
      this.$store.dispatch(Constant.MODAL_FLAG,"PlayList");
    },
    removeSearchedList: function(){
      this.$store.dispatch(Constant.REMOVE_SEARCHED_LIST);
    },
    closeYoutubeListModal: function(){
      this.$store.dispatch(Constant.MODAL_FLAG,'');
    },
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
