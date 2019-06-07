<template lang="html">
  <v-card v-if="flag == true">
    <v-list two-line subheader dark>
      <v-subheader inset>오늘 할 일</v-subheader>

      <v-list-tile
        v-for="item in items.today"
        :key="item.title"
        avatar
      >
        <v-list-tile-avatar>
            {{item.day}}일
        </v-list-tile-avatar>

        <v-list-tile-content>
          <v-list-tile-title>{{ item.title }}</v-list-tile-title>
          <v-list-tile-sub-title>{{ item.start}} ~ {{item.end}}</v-list-tile-sub-title>
        </v-list-tile-content>

      </v-list-tile>

      <v-divider inset></v-divider>

      <v-subheader inset>내일 할 일</v-subheader>

      <v-list-tile
        v-for="item in items.tomorrow"
        :key="item.title"
        avatar
      >
        <v-list-tile-avatar>
          {{item.day}}일
        </v-list-tile-avatar>

        <v-list-tile-content>
          <v-list-tile-title>{{ item.title }}</v-list-tile-title>
          <v-list-tile-sub-title>{{ item.start}} ~ {{item.end}}</v-list-tile-sub-title>
        </v-list-tile-content>

      </v-list-tile>
    </v-list>
  </v-card>
</template>

<script>
export default {
  name: "TimeLineCalendar",

  data () {
     return {
       items: [],
       flag: false,
     }
   },
   created: function(){
     this.$options.sockets.syncCalendar = (data) => {
       console.log('syncCalendar 받았다!! : ',data);
       this.items=data;
       if ( this.items.today.length == 0  && this.items.tomorrow.length == 0 )
         this.flag = false;
       else
         this.flag = true;
     }
   },
}
</script>
