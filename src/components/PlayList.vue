<template lang="html">
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          <div class="row">
            <button class="modal-default-button" @click="closeYoutubeListModal">
              OK
            </button>
          </div>

          <div id="playlist" class="row">
            <ul>
              <li v-for="(list,index) in selectedPlayLists" class="row">
                <!-- <p>{{(index+1)+'번째 리스트'}}</p>-->
                <p>{{list.snippet.title}}</p>
                <div v-for="(data,i) in listImages[index]" class="col-md-3">
                  <img :src="data.image.url" @click="setVideoList(listImages[index],i)" style="width:260px;">

                </div>
              </li>
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
    return {selectedPlayLists:'',listImages:[]}
  },
  mounted: function(){
    this.getPlayList(this.selectedChannel);
  },
  computed: mapState(['selectedChannel']),
  methods: {
    getPlayList: function(value){
      let channelId=value;
      //this.animation.clickCard=true;
      let that = this;
      this.listImages=[];
      let api_url = 'https://www.googleapis.com/youtube/v3/playlists?part=snippet&channelId='+channelId+'&'+ApiKey.youtube;
      console.log(api_url);
      $.ajax({
        url: api_url,
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
