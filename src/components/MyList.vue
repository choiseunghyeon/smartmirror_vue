<template lang="html">
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          <div class="row">
            <button class="modal-default-button" @click="closeYoutubeListModal">
              OK
            </button>
            <button class="modal-default-button" @click="makeMyList">
              생성
            </button>
          </div>
          <!-- the begining of MyList-->
        <transition name="slide" mode="out-in"
          @after-enter="slideAfterEnter">
          <div class="white-scale-100" v-if="isLocalActive.myList" key="myList">
            <ul class="row">
              <li v-for="list in myLists">{{list}} <button>삭제</button></li>
            </ul>
          </div>
          <!-- the end of MyList -->

          <!-- the begining of listItem-->
          <div class="white-scale-100" v-if="isLocalActive.myListItem" key="myListItem">
            <ul class="row">
              <div v-for="(list,index) in playListItems ">
                <li v-for="(data) in list.items" class="col-md-4">

                   <figure>
                     <img :src="data.snippet.thumbnails.medium.url" @click="setVideoList(data.snippet.resourceId.videoId,index)" >
                     <figcaption>{{data.snippet.title}}</figcaption>
                   </figure>
                </li>
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
export default {
  name: "MyList",

}
</script>

<style lang="css">
</style>
