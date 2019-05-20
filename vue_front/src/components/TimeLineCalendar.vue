<template lang="html">
  <v-card>
    <v-list two-line subheader dark>
      <v-subheader inset>오늘 할 일</v-subheader>

      <v-list-tile
        v-for="item in items"
        :key="item.title"
        avatar
      >
        <v-list-tile-avatar>
          {{ item.date }}
        </v-list-tile-avatar>

        <v-list-tile-content>
          <v-list-tile-title>{{ item.title }}</v-list-tile-title>
          <v-list-tile-sub-title>{{ item.subtitle }}</v-list-tile-sub-title>
        </v-list-tile-content>

      </v-list-tile>

      <v-divider inset></v-divider>

      <v-subheader inset>내일 할 일</v-subheader>

      <v-list-tile
        v-for="item in items2"
        :key="item.title"
        avatar
      >
        <v-list-tile-avatar>
          {{ item.date }}
        </v-list-tile-avatar>

        <v-list-tile-content>
          <v-list-tile-title>{{ item.title }}</v-list-tile-title>
          <v-list-tile-sub-title>{{ item.subtitle }}</v-list-tile-sub-title>
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
       items: [
         { date: '21일', iconClass: 'grey lighten-1 white--text', title: 'XML과제하기', subtitle: '오후 1:30~2:30' },
         { date: '21일', iconClass: 'grey lighten-1 white--text', title: '잠자기', subtitle: '오후 3:00~4:30' },
         { date: '21일', iconClass: 'grey lighten-1 white--text', title: '밥먹기', subtitle: '온종일' }
       ],
       items2: [
         { date: '22일', iconClass: 'blue white--text', title: '일어나기', subtitle: '오전 10:30~11:30' },
         { date: '22일', iconClass: 'amber white--text', title: '수업가기', subtitle: '오후 1:30~4:30' }
       ]
     }
   }
}
</script>
