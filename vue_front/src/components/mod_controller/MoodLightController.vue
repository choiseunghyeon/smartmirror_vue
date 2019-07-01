<template>

<v-bottom-sheet inset :value="lightSheet">
  <template v-slot:activator>
    <v-btn
      color="red"
      dark
    >
      Show player
    </v-btn>
  </template>
  <v-card tile>


    <v-list>
      <v-list-tile>
        <v-list-tile-content>
          <v-list-tile-title>무드등 컨트롤러</v-list-tile-title>
          <v-list-tile-sub-title>고양이 무드등</v-list-tile-sub-title>
        </v-list-tile-content>

        <v-spacer></v-spacer>

        <v-list-tile-action>
          <v-btn outline large color="white" @click="moodLightToggle(true)">
            <v-icon>flash_on</v-icon>
            ON
          </v-btn>
        </v-list-tile-action>
<v-spacer></v-spacer>
        <v-list-tile-action>
          <v-btn outline large color="white" @click="moodLightToggle(false)">
            <v-icon>flash_off</v-icon>
            OFF
          </v-btn>
        </v-list-tile-action>

      </v-list-tile>
    </v-list>
  </v-card>
</v-bottom-sheet>
</template>

<script>
import {mapState} from 'vuex';

export default {
  name: "MoodLightController",
  computed: mapState(['lightSheet']),
  created: function(){
    console.log("Lamp component created!!!");
  },
  methods: {
    moodLightToggle: function(flag){
      this.$socket.emit('changeMoodLightState',flag);
    }
  }
}
</script>
