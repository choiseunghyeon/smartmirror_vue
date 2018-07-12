<template lang="html">
<div class="mylist-container" v-scroll="" style="height: 100%;">
<v-card color="transparent" height="100%" flat>

  <my-list v-if="localNavVal=='mylist'" class="mylist"></my-list>

  <my-list-item v-else></my-list-item>

  <v-bottom-nav fixed shift :value="true" :active.sync="localNavVal" color="grey darken-4">
    <v-btn flat color="teal" value="mylist" @click="setNavValToMyList">
      <span>나의목록</span>
      <v-icon>view_week</v-icon>
    </v-btn>
    <v-btn flat color="teal" value="mylistitem" @click="setNavValToMyListItem">
      <span>동영상</span>
      <v-icon>video_library</v-icon>
    </v-btn>
  </v-bottom-nav>
</v-card>
  <!-- 밑에 bottom navigation의 height가 56px임 이게 없으면 navigation이 card일부를 가리게 됨 -->
  <div class="box-56" style="height: 56px;">
  </div>
</div>
</template>

<script>
import Constant from '@/Constant.js';
import {mapState} from 'vuex';
import MyList from './MyList';
import MyListItem from './MyListItem';

export default {
  name: "MyListBridge",
  components: {MyList,MyListItem},
  computed: mapState(['myListNavVal']),
  created: function(){
    console.log("myListBridge created")
  },
  watch: {
    myListNavVal: function(){ // bottom navigation의 값을 조절
      return this.localNavVal = this.myListNavVal;
    }
  },
  data: function(){
    return {localNavVal:'mylist'}
  },
  methods: {
    setNavValToMyList: function(){ // bottom navigation의 값을 mylist로 바꿈
      this.$store.dispatch(Constant.SYNC_MYLIST_NAVIGATION,"mylist");
    },
    setNavValToMyListItem: function(){ // bottom navigation의 값을 mylistitem로 바꿈
      this.$store.dispatch(Constant.SYNC_MYLIST_NAVIGATION,"mylistitem");
    },
  },
}
</script>
