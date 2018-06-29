<template lang="html">
  <!-- <transition name="modal">
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
          </div> -->
          <!-- the begining of MyList-->
        <!-- <transition name="slide" mode="out-in"
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
          </div> -->
          <!-- the end of MyList -->

          <!-- the begining of listItem-->
          <!-- <div class="white-scale-100" v-if="isLocalActive.myListItem" key="myListItem">
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
        </transition> -->
        <!-- the end of listItem -->
<!--
        </div>
      </div>
    </div>
  </transition> -->

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
import Constant from '../../Constant.js';
import {mapState} from 'vuex';
import MyList from './MyList';
import MyListItem from './MyListItem';

export default {
  name: "MyListBridge",
  components: {MyList,MyListItem},
  computed: mapState(['myListNavVal']),
  created: function(){
    console.log("myListBridge created")
    // if(localStorage.listNames == undefined)
    //   localStorage.listNames=JSON.stringify([]);
    //
    // this.myLists = this.retunMyListValue();
  },
  watch: {
    myListNavVal: function(){
      return this.localNavVal = this.myListNavVal;
    }
  },
  data: function(){
    return {localNavVal:'mylist'}
  },
  methods: {
    setNavValToMyList: function(){
      this.$store.dispatch(Constant.SYNC_MYLIST_NAVIGATION,"mylist");
    },
    setNavValToMyListItem: function(){
      this.$store.dispatch(Constant.SYNC_MYLIST_NAVIGATION,"mylistitem");
    },
  },
}
</script>
