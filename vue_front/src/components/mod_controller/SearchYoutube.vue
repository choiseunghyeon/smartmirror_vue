<template lang="html">
  <div class="col-md-12">
    <transition name="elastic">
    <div id="channellist" v-if="isActive.channellists">
        <transition-group name="list" tag="div">
        <div v-for="(list,index) in channelLists" @click.stop="showPlayList(index)" class="col-md-3" :key="index">
            <figure class="card-ui" >
              <img :src="list.snippet.thumbnails.medium.url">
              <figcaption>{{list.snippet.channelTitle}}</figcaption>
              <button id="channel_delete" @click.stop="deleteChannel(index)" type="button" name="button">&#10006;</button>
            </figure>
        </div>
      </transition-group>
    </div>
  </transition>

    <!--<my-list v-if="modalFlag == 'MyList'"></my-list>-->
    <searched-list v-if="modalFlag == 'SearchedList'" @changeYoutube="changeYoutube"></searched-list>
    <play-list v-if="modalFlag == 'PlayList'" ></play-list>

  </div> <!-- the end -->
</template>

<script>
import Constant from '../../Constant.js';
import ApiKey from '../../ApiKey.js';
import SearchedList from './SearchedList';
import YoutubeChannel from './YoutubeChannel';
import {mapState} from 'vuex';
import _ from "lodash";

export default {
  name:"SearchYoutube",
  components: {SearchedList,YoutubeChannel},
  computed: mapState(['channelLists','isActive','modalFlag']),
  methods: {
    // changeYoutube: function(data){
    //   console.log("change",data);
    //   data.id.hasOwnProperty("channelId") ? this.$store.dispatch(Constant.ADD_CHANNEL,{snippet: data.snippet})
    //     : this.$store.dispatch(Constant.VIDEO_CHANGE,{videoId:data.id.videoId});
    //   this.removeSearchedList();
    //
    //   this.closeYoutubeListModal();
    // },
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
