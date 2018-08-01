<template lang="html">
<div id="mylist">
<v-layout v-if="videoDataSave.saveFlag == true">
  <v-flex xs6>
    <div class="">

      <v-icon x-large color="blue" @click="toggleDialog" >add</v-icon>
      <span style="position: absolute; top:10px;">목록추가</span>
    </div>

    <v-dialog v-model="dialog" full-width persistent>
      <v-card>
        <v-card-text>
          <v-text-field v-model="myListName" label="목록 이름"></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="success" flat @click.native="makeMyList">추가</v-btn>
          <v-btn color="error" flat @click.native="dialog = false">취소</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-flex>
  <v-flex xs2 offset-xs4 style="padding-left:15px;">
    <v-icon x-large color="red" @click="setVideoDataSaveFalse">clear</v-icon>
  </v-flex>
</v-layout>


  <v-card tile flat v-for="(data,index) in myListNames" @click.native="setMyListName(data._id,index)" color="transparent" class="white--text" style="border-bottom: 1px solid white !important;">

    <v-card-media
    :src="data.imgUrl"
    value="default"
    height="200px"
    >
    </v-card-media>
    <v-card-title style="padding:0px;">
      <v-flex xs4><v-btn color="error" outline depressed @click.native.stop="removeList(data._id)">삭제</v-btn></v-flex>
      <v-flex xs8>{{data.name}}</v-flex>

    </v-card-title>
  </v-card>

</div> <!-- the end of mylist -->
</template>

<script>
import Constant from '@/Constant.js';
import {mapState} from 'vuex';
export default {
  name: "MyList",
  computed: mapState(['videoDataSave','myListDialog','myListNames']),
  data: function(){
    return {dialog:false ,myListName:'' }
  },
  created: function(){
    console.log("myList created")
  },
  updated: function(){ // 데이터가 변경되면 scroll의 길이를 구함
    console.log('mylist updated');

    // let modalContainer = document.getElementById('my-list-modal')[0];
    // this.scrollHeight = modalContainer.scrollHeight - modalContainer.clientHeight;
    // console.log("upgrade complete hㅈㅈeight: ",this.scrollHeight);
    //
  },
  mounted: function(){
    console.log('mylist mounted');
    // let modalContainer = document.getElementById('my-list-modal')[0];
    // this.scrollHeight = modalContainer.scrollHeight - modalContainer.clientHeight ;
    // console.log("data mounted Height: ",this.scrollHeight);

  },
  methods: {
    makeMyList: function(){ //server와 통신하여 나의목록 생성
      let names = this.myListNames
      let name = this.myListName;
      if( names.some((val) => val == name) ){ // 하나라도 같으면 참
        alert('이름이 중복됩니다.');
        return
      }
      this.$store.dispatch(Constant.POST_MYLISTNAME,{name:name});

      this.dialog = false;
    },
    toggleDialog: function(){ // MyList 내부에서 쓰는 목록 추가용 Dialog
      this.dialog = !this.dialog;
    },
    setVideoDataSaveFalse: function(){ // Controller.vue에서 지정한 myListDialog
      let obj = {
        saveFlag:false,
        data:{}
      };
      this.$store.dispatch(Constant.VIDEO_DATA_SAVE,obj);
    },
    removeList: function(id){ //server와 통신하여 해당목록 삭제
      if(!confirm('해당 목록을 삭제하시겠습니까??')) // 아니오를 누르면 함수 실행 안함
          return;
      this.$store.dispatch(Constant.DELETE_MYLIST,id);

    },

    setMyListName: function(id, index){ // 다른 영상 저장이 켜져 있을때는 목록 클릭시 해당 영상 저장 아니면 목록리스트 보여줌
      if(this.videoDataSave.saveFlag == true){
        this.$store.dispatch(Constant.PUT_MYLIST,{id:id, content:this.videoDataSave.data});
        this.$store.dispatch(Constant.SET_SNACKBAR,{flag:true,text:"저장되었습니다.",time:1000,progress:false});
        this.setVideoDataSaveFalse(); // dialog 끄기
      } else {
        this.$store.dispatch(Constant.SET_MYLIST_INDEX,index);
        this.$store.dispatch(Constant.SYNC_MYLIST_NAVIGATION,"mylistitem");
      }
    },


  }
}
</script>
<style>
  #mylist {
    /* for Modal */
    width: 100% !important;
  }
</style>
