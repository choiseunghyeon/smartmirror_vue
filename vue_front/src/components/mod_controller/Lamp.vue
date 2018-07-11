<template lang="html">
  <v-app dark id="inspire">

    <v-toolbar
      color="indigo darken-2" dense
      fixed clipped-left app >
      <!-- <v-icon class="mx-3">fab fa-youtube</v-icon> -->
      <v-menu :nedge-width="100">
        <v-toolbar-title slot="activator" class="mr-3">
          <span class="title">{{ toolbar_title }}</span>
          <v-icon dark>arrow_drop_down</v-icon>
        </v-toolbar-title>
        <v-list>
          <v-list-tile v-for="obj in toolbar_title_lists" :key="obj.title" @click="changeToolbar(obj)">
            <v-list-tile-title v-text="obj.title"></v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-menu>
      <v-spacer></v-spacer>
    </v-toolbar>
    <v-content>
      <v-container fill-height style="padding: 0;">
        <v-layout justify-center>
          <v-flex xs12 shrink>

          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  <!-- <v-snackbar
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
  </v-snackbar> -->
  <v-footer class="pa-3">
    <v-spacer></v-spacer>
    <div>라즈베리파이와 연결된 전등을 조작하는 메뉴입니다. 날씨에 따라서 전등의 색깔이 변화합니다.</div>
    <br>
  </v-footer>
  </v-app>
</template>

<script>
export default {
  name: "Lamp",
  data: function(){
    return { keyword:'',drawer: true,
      toolbar_title_lists: [
        {title:"Youtube", routeName: 'popular'},
        {title:"Lamp", routeName: 'lamp'},
      ],
      toolbar_title: "Lamp",
    }
  },
  created: function(){
    console.log("Lamp component created!!!");
  },
  methods: {
    changeToolbar(obj){
      this.$router.push({name: obj.routeName});
    },
  }
}
</script>

<style lang="css">
</style>
