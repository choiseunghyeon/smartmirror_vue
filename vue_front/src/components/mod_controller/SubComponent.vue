<template lang="html">
<div>
  <!-- 시스템 메시지 -->
  <v-snackbar
    v-model="snackbar.flag"
    :timeout="snackbar.time"
    top="top"
  >
    {{ snackbar.text }}
    <v-progress-circular v-if="snackbar.progress == true"
        indeterminate
        color="red"
      ></v-progress-circular>
    <v-btn
      color="pink"
      flat
      @click="setSnackBar"
    >
      Close
    </v-btn>
  </v-snackbar>

<!-- 나의 목록 토글 -->
<v-layout row justify-center >
  <v-dialog
  v-model="videoDataSave.saveFlag"
  fullscreen hide-overlay
  transition="dialog-bottom-transition"
  scrollable
  content-class="grey darken-4"
  >
    <my-list></my-list>
  </v-dialog>
</v-layout>

</div>
</template>

<script>
import MyList from './MyList/MyList';
import Constant from '@/Constant.js';
import {mapState} from 'vuex';

export default {
  name:"SubComponent",
  components: {MyList},
  computed: mapState(['snackbar','videoDataSave']),

  methods:{
    setSnackBar(){ //snackbar 끄기
      this.$store.dispatch(Constant.SET_SNACKBAR,{flag:false,text:"",time:1000,progress:false});
    },
  }
}
</script>
