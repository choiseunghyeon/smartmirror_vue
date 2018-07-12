<template lang="html">

<div class="listItem-container" v-scroll="handleScroll" style="height: 100%;">
    <v-card tile flat v-for="(data,index) in myListItems" @click.native="setVideoList(index)" color="transparent" class="white--text" style="border-bottom: 1px solid white !important;">

      <v-card-media
      :src="data.imgUrl"
      :value="data.videoId"
      height="200px"
      >
      </v-card-media>
      <v-card-title>
        <div>
          <div>{{data.title}}
          </div>
        </div>
      </v-card-title>
    </v-card>

</div>

</template>

<script>
import Constant from '@/Constant.js';
import {mapState} from 'vuex';

export default {
  name: "myListItem",
  data: function(){
    return {scrollHeight:0,myListItems:[]}
  },
  created: function(){
    console.log("myListItem created!!");
    if (this.selectedMyListId != '') { //선택된 목록이 있으면 해당 목록의 영상들 가져옴
      this.getMyListItems();
    }
  },

  computed: mapState(['selectedListIndex','myListNames']),
  methods: {



    getMyListItems: function(){ // 선택된 mylist을 긁어옴
      this.myListItems = this.myListNames[this.selectedListIndex].content;
    },

    // 선택된 영상을 실행하고 선택된 영상이 있는 목록의 영상을 자동실행으로 setting함
    // mirror에 영상 리스트 전송
    setVideoList: function(index){
      let tempArr = this.myListNames[this.selectedListIndex].content;
      let oneArray = tempArr.reduce((acc,val) => {
        acc.push(val.videoId);
        return acc;
      },[]);
      console.log("oneArray: ",oneArray);
      let payload = {
        idArray:oneArray,
        num:index,
      };
      this.$store.dispatch(Constant.SET_VIDEO_LIST,payload);
    },
  }
}
</script>
