<template lang="html">
  <transition name="modal">
    <div :class="[videoDataSave.saveFlag ? 'modal-mask-small' : 'modal-mask',{'isMyListActive':!isActive.mylists}]">
      <div class="modal-wrapper">
        <div id="my-list-modal" class="modal-container" @scroll="handleScroll">
          <div :class="'row ' + modal_top_value" style="margin-bottom: 20px !important;">
            <button class="modal-default-button" @click="closeMyListModal">
              OK
            </button>
            <button class="modal-default-button" @click="toggleList">
              {{toggle.message}}
            </button>
            <button class="modal-default-button">
              <transition name="input">
                <input v-if="animation.listInput" v-model="myListName" type="text" class="make-input" name="" placeholder="이름을 입력하세요!">
              </transition>
              <span @click="makeMyList()">생성</span>
            </button>
          </div>
          <!-- the begining of MyList-->
        <transition name="slide" mode="out-in"
          @after-enter="slideAfterEnter">
          <div class="white-scale-100" v-if="isLocalActive.myList" key="myList">
            <ul class="row">
              <div class="height-290 col-md-4" v-for="(data,index) in myLists" @click.stop="getMyListItems(data.name)">
                <figure>
                  <div class="number_box" :style="{ right: numberBoxRightValue }" @click.stop="removeList(index)">

                      <span>&#88;</span>
                      <span class="show_number">삭제</span>

                  </div>
                  <img class="img-320-180" :src="data.imgUrl"><figcaption>{{data.name}}</figcaption>
                </figure>
              </div>
            </ul>
          </div>
          <!-- the end of MyList -->

          <!-- the begining of listItem-->
          <div class="white-scale-100" v-if="isLocalActive.myListItem" key="myListItem">
            <ul class="row">
              <div class="height-290 col-md-4" v-for="(data,index) in myListItems">
                <figure>
                  <div class="number_box" :style="{ right: numberBoxRightValue }" @click.stop="removeVideo(index)">
                    <span>&#88;</span>
                    <span class="show_number">삭제</span>
                  </div>
                  <img :src="data.imgUrl" @click="setVideoList(data.videoId,index)" >
                  <figcaption>{{data.title}}</figcaption>
                </figure>
              </div>
            </ul>
          </div>
        </transition>
        <!-- the end of listItem -->

        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import Constant from '../Constant.js';
import {mapState} from 'vuex';

export default {
  name: "MyList",
  computed: mapState(['videoDataSave','isActive','numberBoxRightValue',]),
  created: function(){
    console.log("I'm created")
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
    return {scrollHeight:0,selectedListId:''
    ,isLocalActive:{myList:true,myListItem:false}
    ,toggle:{message:"MOVE - X",title:""}
    ,modal_top_value:"",myLists:'',myListItems:''
    ,animation:{listInput:false},myListName:'' }
  },
  methods: {
    slideAfterEnter: function(){
      /*
      let modalContainer = document.getElementById('my-list-modal')[0];
      this.scrollHeight = modalContainer.scrollHeight - modalContainer.clientHeight;
      console.log("* AfterEnter! height: ",this.scrollHeight);
      */
    },
    makeMyList: function(){
      if(this.animation.listInput == false){
        this.animation.listInput = true;
        return;
      }
      let names = JSON.parse(localStorage.listNames)
      let name = this.myListName;
      //let name = prompt('이름을 입력해주세요');
      if( names.some((val) => val == name) ){ // 하나라도 같으면 참
        alert('이름이 중복됩니다.');
        return
      }
      names.push(name)
      localStorage.listNames=JSON.stringify(names);
      localStorage[name]=JSON.stringify([]); // localStorage에 MyList의 이름을 가진 값 선언 이곳에 비디오를 저장



      this.myLists = this.retunMyListValue();
      this.animation.listInput = false;
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

    getMyListItems: function(listId){
      if(this.videoDataSave.saveFlag == true){
        let listArr = JSON.parse(localStorage[listId]);
        listArr.push(this.videoDataSave.data);
        localStorage[listId]=JSON.stringify(listArr);
        this.closeMyListModal();
        this.$store.dispatch(Constant.VIDEO_DATA_SAVE,{saveFlag:false,data:''});
        this.myLists = this.retunMyListValue();
      } else {

        this.myListItems = JSON.parse(localStorage[listId])
        this.toggle.title=listId;
        this.toggleList();
      }
    },

    removeVideo: function(index){
      this.myListItems.splice(index,1); // 해당 영상 삭제
      let listId = this.toggle.title; // listId를 title에 저장시켰기 때문에 같음
      localStorage[listId]=JSON.stringify(this.myListItems);
    },


    setVideoList: function(id,index){
      let arr = this.myListItems.reduce((a,val,i) => {
        if(i >= index)
          a.push(val.videoId);
        return a;
      },[])
      let payload = {
        idArray: arr,
        num: 0,
      };
      this.$store.dispatch(Constant.SET_VIDEO_LIST,payload);
      this.closeMyListModal();

    },
    handleScroll: function(e){
      e.target.scrollTop !== 0 ? this.modal_top_value="modal_top" : this.modal_top_value="";
      //e.target.scrollTop == this.scrollHeight ? this.moreYoutubeVideo(this.searchedLists[this.searchedLists.length-1].nextToken) : console.log(e.target.scrollTop);
    },
    closeMyListModal: function(){
      this.$store.dispatch(Constant.TOGGLE_MYLIST_ACTIVE);
    },
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
    toggleList: function(){
      this.isLocalActive.myList = !this.isLocalActive.myList;
      this.isLocalActive.myListItem = !this.isLocalActive.myListItem;

      this.isLocalActive.myListItem == true ? this.toggle.message = "MOVE - MY LISTS"
      : this.toggle.message = "MOVE - "+this.toggle.title;
    },
  }
}
</script>

<style lang="css">
.modal-mask-small{
  position: fixed;
  z-index: 9999;
  top: 200px;
  left: 0;
  width: 100%;
  height: 50%;
  background-color: rgba(0, 0, 0, 1);
  display: block;
  transition: opacity .3s ease;
  border-top: 1px solid white;
  border-bottom: 1px solid white;
}
.slide-enter-active {
  transition: all .3s ease;
}
.slide-leave-active {
  transition: all .4s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-enter, .slide-leave-to {
  transform: translateX(10px);
  opacity: 0;
}
.modal_top {
  position: fixed;

  z-index: 1111;
}
.img-320-180 {
  width: 320px;
  height: 180px;
}
.isMyListActive {
  display: none;
}
.make-input {
  border-radius: 15px;
  background-color: black;
  color: white;
  padding: 10px;
  width: 80%;
  height: 80%;

}

.input-enter-active {
  animation: input-effect 0.5s;
}
.input-leave-active {
  animation: input-effect 0.5s reverse;
}
@keyframes input-effect {
  0% {
    width: 0%;
    height: 0%;
  }
  70%{
    width: 50%;
    height: 60%;
  }
  100%{
    width: 80%;
    height: 80%;
  }
}
</style>
