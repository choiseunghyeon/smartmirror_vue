<template lang="html">
  <div class="row">
    <input id="search_keword" type="text" name="" value="">
    <ul id="youtube-list" class="col-md-4">
      <li v-for="(data,i) in searchedLists" @click.stop="changeYoutube(i)">
        <span>Number {{i+1}}</span>
        <span v-if="data.id.channelId">{{data.snippet.title+"채널"}}</span>
        <figure>
          <img :src="data.snippet.thumbnails.medium.url" value="data.id.videoId"><figcaption>{{data.snippet.title}}</figcaption>
        </figure>
      </li>
    </ul>
    <div id="channellist">
      <ul v-if="channelLists.length > 0">
        <li v-for="(list,index) in channelLists" @click.stop="getPlayList(index)">
          <figure>
            <img :src="list.snippet.thumbnails.medium.url"><figcaption>{{list.snippet.channelTitle}}</figcaption>
          </figure>
        </li>
      </ul>
    </div>
    <div id="playlist">
      <ul>
        <li v-for="(list,index) in selectedPlayLists" @click="getListItems(list.id)">
          <p>{{(index+1)+'번째 리스트'}}</p>
          <p>{{list.snippet.title}}</p>
          <img :src="list.snippet.thumbnails.medium.url" alt="">
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import Constant from '../Constant.js';
import ApiKey from '../ApiKey.js';
import {mapState} from 'vuex';

export default {
  name:"SearchYoutube",
  data: function(){
    return {selectedPlayLists:''}
  },
  mounted: function(){
    this.init();
  },
  computed: mapState(['searchedLists','channelLists']),
  methods: {
    init: function(){
      let that = this;
      console.log('dd');
      //검색
      $("#search_keword").on("blur",function(){
        console.log("called search_keword");
        var keword = $("#search_keword").val();
        let order = {'최신순':'date','조회수':'viewCount'};
        var api_url="https://www.googleapis.com/youtube/v3/search?part=snippet&q="+keword+"&maxResults=5&order="+order.조회수+"&"+ApiKey.youtube
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
    },
    getPlayList: function(index){
      let channelId=this.channelLists[index].snippet.channelId
      let that = this;
      $.ajax({
        url:'https://www.googleapis.com/youtube/v3/playlists?part=snippet&channelId='+channelId+'&'+ApiKey.youtube,
        type: 'get',
        dataType:"json",
        success:function(data){
          console.log(data);
          that.selectedPlayLists=data.items;
        }
      }) // the end of ajax

    },
    getListItems: function(id){ // 플레이 리스트중 선택된 것의 동영상 정보들을 가져옴
      console.log("get items!!", id);
      let playlistId = id;
      let that = this;
      $.ajax({
        url:'https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId='+playlistId+'&'+ApiKey.youtube,
        type: 'get',
        dataType:"json",
        success:function(data){
          console.log(data);
          console.log(data.items);
          console.log(data.items[0].snippet.resourceId.videoId);
          that.$store.dispatch(Constant.VIDEO_LIST,data.items.map(x=>x.snippet.resourceId.videoId));
        }
      }) // the end of ajax
    },
    removeSearchedList: function(){
      this.$store.dispatch(Constant.SEARCHED_LIST,"");
    }
  }
}
</script>

<style lang="css">
</style>
