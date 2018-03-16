<template lang="html">
  <div class="col-md-12">
    <!--<input id="search_keword" type="text" name="" value="">-->
    <div id="channellist">
        <div v-for="(list,index) in channelLists" @click.stop="showPlayList(index)" class="col-md-3">
          <transition name="elastic" >

            <figure class="card-ui" v-if="isActive.channellists">
              <img :src="list.snippet.thumbnails.medium.url">
              <figcaption>{{list.snippet.channelTitle}}</figcaption>
              <button id="channel_delete" @click.stop="deleteChannel(index)" type="button" name="button">&#10006;</button>
            </figure>
          </transition>
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
  computed: mapState(['channelLists','isActive','modalFlag']),
  methods: {
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
.card-ui {
  border: 1px solid rgba(1,1,1,0.8);
  font-size: 2.3rem;
  background-color: rgba(255,255,255,1);
  box-shadow: 0 8px 12px 0 rgba(0, 0, 0, 0.2), 0 10px 24px 0 rgba(0, 0, 0, 0.19);
  text-align: center;
  margin-bottom: 20px;
}

.card-ui img{
  width: 100%;
  min-width: 50%;
  height: 100%;
  min-height: 50%;
}

.search_active {display: none;}

.elastic-enter-active {
  animation: elastic-in 0.4s;
}
.elastic-leave-active {
  animation: elastic-in 0.3s reverse;
}
@keyframes elastic-in {
  0% { transform: scale(0); opacity: 0;}
  70% { transform: scale(1.2); opacity: 0.5;}
  100% { transform: scale(1); opacity: 1;}
}
</style>
