<template lang="html">
  <!-- 유튜브 컨트롤러 -->
  <v-bottom-sheet inset :hide-overlay="true" :persistent="true" :value="youtubeSheet">

    <v-card tile>

      <v-progress-linear
      :value="50"
      class="my-0"
      height="5"
      ></v-progress-linear>

      <v-list>
        <v-list-tile>
          <v-list-tile-content>
            <v-list-tile-title>The Walker</v-list-tile-title>
            <v-list-tile-sub-title>Fitz & The Trantrums</v-list-tile-sub-title>
          </v-list-tile-content>
          <v-list-tile-action>
            <v-btn icon>
              <v-icon>fast_rewind</v-icon>
            </v-btn>
          </v-list-tile-action>

          <v-list-tile-action :class="{ 'mx-5': $vuetify.breakpoint.mdAndUp }">
            <v-btn icon>
              <v-icon>pause</v-icon>
            </v-btn>
          </v-list-tile-action>

          <v-list-tile-action :class="{ 'mr-3': $vuetify.breakpoint.mdAndUp }">
            <v-btn icon>
              <v-icon>fast_forward</v-icon>
            </v-btn>
          </v-list-tile-action>
          <v-list-tile-action :class="{ 'mr-3': $vuetify.breakpoint.mdAndUp }">
            <v-menu top offset-y :close-on-content-click="false"
             :allow-overflow="true">
              <v-btn slot="activator"
              color="primary" dark icon>
                <v-icon>settings</v-icon>
              </v-btn>
              <v-list>

                <v-list-tile>

                  <v-list-tile-title>
                    품질
                  </v-list-tile-title>
                  <v-menu top offset-y>
                    <div style="font-size:14px; " slot="activator">
                      720p HD
                    </div>
                    <v-list>
                      <v-list-tile
                        v-for="(item, index) in qualityMenuItems"
                        :key="index"
                        @click=""
                        >
                        <v-list-tile-title>{{ item.title }}</v-list-tile-title>
                        <v-icon>{{ item.icon }}</v-icon>
                      </v-list-tile>
                    </v-list>
                  </v-menu>

                </v-list-tile>
                <v-list-tile>
                  <v-menu top offset-y>
                    <v-list-tile-title slot="activator">
                      자막
                    </v-list-tile-title>

                    <v-list>
                      <v-list-tile
                        v-for="(item, index) in qualityMenuItems"
                        :key="index"
                        @click=""
                        >
                        <v-list-tile-title>{{ item.title }}</v-list-tile-title>
                        {{ item.iconText }}
                        <v-icon>{{ item.icon }}</v-icon>
                      </v-list-tile>
                    </v-list>
                  </v-menu>
                </v-list-tile>
                <v-list-tile>
                  <v-list-tile-title>토글
                  </v-list-tile-title>
                  <v-switch v-model="videoToggle" large
                     color="indigo darken-3" value="indigo darken-3" hide-details>
                  </v-switch>
                </v-list-tile>
                <v-list-tile>
                  <v-list-tile-title>소리</v-list-tile-title>
                  <v-slider
                    v-model="videoVolume"
                    prepend-icon="volume_up"
                  ></v-slider>
                </v-list-tile>

            </v-list>
          </v-menu>
        </v-list-tile-action>
      </v-list-tile>
    </v-list>
    </v-card>

  </v-bottom-sheet>


</template>

<script>
import {mapState} from 'vuex';

export default {
  name: "VideoController",
  computed: mapState(['youtubeSheet']),
  data: function(){
    return {
              videoToggle: false,
              videoVolume: 0,
              panelItems: [
                {title:"품질"},
                {title:"자막"},
              ],
              qualityMenuItems: [
                {title: "HD 1080p"},
                {title: "HD 720p"},
                {title: "480p"},
              ],
          }
  },
  methods:{
    showAnotherMenu(item){

    },
  }
}
</script>

<style lang="css">
</style>
