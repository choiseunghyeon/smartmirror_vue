<template lang="html">
<div id="mylist">
<v-layout v-if="videoDataSave.saveFlag == true">
  <v-flex xs6>
    <div class="">

      <v-icon x-large color="blue" @click="toggleDialog" >add</v-icon>
      <span>목록추가</span>
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


  <v-card tile flat v-for="(data,index) in myLists" @click.native="setMyListName(data.name)" color="transparent" class="white--text" style="border-bottom: 1px solid white !important;">

    <v-card-media
    :src="data.imgUrl"
    value="default"
    height="200px"
    >
    </v-card-media>
    <v-card-title style="padding:0px;">
      <v-flex xs4><v-btn color="error" outline depressed @click.native.stop="removeList(index)">삭제</v-btn></v-flex>
      <v-flex xs8>{{data.name}}</v-flex>

    </v-card-title>
  </v-card>
  <!-- the end of myList -->



</div> <!-- the end of mylist -->
</template>

<script>
import Constant from '../../Constant.js';
import {mapState} from 'vuex';
export default {
  name: "MyList",
  computed: mapState(['videoDataSave','myListDialog',]),
  created: function(){
    console.log("myList created")
    if(localStorage.listNames == undefined)
      localStorage.listNames=JSON.stringify([]);

    this.myLists = this.retunMyListValue();
  },
  /*
  updated: function(){ // 데이터가 변경되면 scroll의 길이를 구함
  console.log('mylist updated');
  let modalContainer = document.getElementById('my-list-modal')[0];
  this.scrollHeight = modalContainer.scrollHeight - modalContainer.clientHeight;
  console.log("upgrade complete hㅈㅈeight: ",this.scrollHeight);

},
  mounted: function(){
  let modalContainer = document.getElementById('my-list-modal')[0];
  this.scrollHeight = modalContainer.scrollHeight - modalContainer.clientHeight ;
  console.log("data mounted Height: ",this.scrollHeight);

},
  */
  data: function(){
    return {scrollHeight:0, selectedListId:''
    ,myLists:'',myListItems:'',fab:false,bottom:true, left:true,dialog:false
    ,animation:{listInput:false},myListName:'' }
  },
  methods: {
    makeMyList: function(){
      let names = JSON.parse(localStorage.listNames)
      let name = this.myListName;
      if( names.some((val) => val == name) ){ // 하나라도 같으면 참
        alert('이름이 중복됩니다.');
        return
      }
      names.push(name)
      localStorage.listNames=JSON.stringify(names);
      localStorage[name]=JSON.stringify([]); // localStorage에 MyList의 이름을 가진 값 선언 이곳에 비디오를 저장



      this.myLists = this.retunMyListValue();
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
    removeList: function(index){
      if(!confirm('해당 목록을 삭제하시겠습니까??')) // 아니오를 누르면 함수 실행 안함
          return;
      console.log(index);
      let names = JSON.parse(localStorage.listNames)

      // splice 실행시 배열을 바꾸고 리턴 값으로 지운 값이 나옴
      //그 값은 배열이기 때문에 [0]으로 string 형식으로 갑을 뽑아냄
      let removedName = names.splice(index,1)[0];
      localStorage.listNames=JSON.stringify(names); // 지우고 난 이후의 temp array저장
      localStorage.removeItem(removedName);

      this.myLists = this.retunMyListValue();

    },

    setMyListName: function(listId){
      if(this.videoDataSave.saveFlag == true){
        let tempArr = JSON.parse(localStorage[listId]) //local에 있는 정보 가져오기
        tempArr.push(this.videoDataSave.data);  // 정보 추가
        localStorage[listId] = JSON.stringify(tempArr); //localStorage에 저장
        this.setVideoDataSaveFalse(); // dialog 끄기
      } else {
        this.$store.dispatch(Constant.SET_MYLIST_NAME,listId);
        this.$store.dispatch(Constant.SYNC_MYLIST_NAVIGATION,"mylistitem");
      }
    },

    //
    // removeVideo: function(index){
    //   this.myListItems.splice(index,1); // 해당 영상 삭제
    //   let listId = this.toggle.title; // listId를 title에 저장시켰기 때문에 같음
    //   localStorage[listId]=JSON.stringify(this.myListItems);
    // },
    //
    //
    // setVideoList: function(id,index){
    //   let arr = this.myListItems.reduce((a,val,i) => {
    //     if(i >= index)
    //       a.push(val.videoId);
    //     return a;
    //   },[])
    //   let payload = {
    //     idArray: arr,
    //     num: 0,
    //   };
    //   this.$store.dispatch(Constant.SET_VIDEO_LIST,payload);
    //   this.closeMyListModal();
    //
    // },
    // handleScroll: function(e){
    //   e.target.scrollTop !== 0 ? this.modal_top_value="modal_top" : this.modal_top_value="";
    //   //e.target.scrollTop == this.scrollHeight ? this.moreYoutubeVideo(this.searchedLists[this.searchedLists.length-1].nextToken) : console.log(e.target.scrollTop);
    // },
    //
    retunMyListValue: function(){
      let t0 = performance.now();

      let listNames = JSON.parse(localStorage.listNames);
      let listNameImg=[];
      listNames.forEach(function(val){
        let temp = JSON.parse(localStorage[val]);
        if(temp.length > 0)
        listNameImg.push({name:val,imgUrl:temp[0].imgUrl});
        else
        listNameImg.push({name:val,imgUrl:'../../static/images/x.png'});
      });
      let t1 = performance.now();
      console.log("Call to retunMyListValue took " + (t1 - t0) + " milliseconds.");
      return listNameImg;
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
