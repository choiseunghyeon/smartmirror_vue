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
             :allow-overflow="true" :nudge-width="130">
              <v-btn slot="activator"
              color="primary" dark icon>
                <v-icon>settings</v-icon>
              </v-btn>

              <v-list>

                <v-list-tile>
                  <v-list-tile-content>
                    품질
                  </v-list-tile-content>
                  <v-menu top offset-y>
                    <v-list-tile-action style="font-size:14px" slot="activator">
                      {{mirrorVideoInfo.quality}}
                    </v-list-tile-action>

                    <v-list>
                      <v-list-tile
                        v-for="(item, index) in qualityLevels"
                        :key="index"
                        @click=""
                        >
                        <v-list-tile-title @click="changeQuality(index)">{{ item }}</v-list-tile-title>
                        <v-icon style="margin-left:5px;" v-if="mirrorVideoInfo.quality == item">check</v-icon>
                      </v-list-tile>
                    </v-list>
                  </v-menu>
                </v-list-tile>
                <!-- <v-list-tile>
                  <v-list-tile-content>
                    자막
                  </v-list-tile-content>
                  <v-menu top offset-y>
                    <v-list-tile-action style="font-size:14px" slot="activator">
                      영어
                    </v-list-tile-action>

                    <v-list>
                      <v-list-tile
                        v-for="(item, index) in mirrorVideoInfo.qualityLevels"
                        :key="index"
                        @click=""
                        >
                        <v-list-tile-title>{{ item.title }}</v-list-tile-title>
                        {{ item.iconText }}
                        <v-icon>{{ item.icon }}</v-icon>
                      </v-list-tile>
                    </v-list>
                  </v-menu>
                </v-list-tile> -->
                <v-list-tile>
                  <v-list-tile-content>토글
                  </v-list-tile-content>
                  <v-list-tile-avatar>
                    <v-switch v-model="videoToggle" large
                    color="indigo darken-3" value="indigo darken-3" hide-details>
                    </v-switch>
                  </v-list-tile-avatar>
                </v-list-tile>
                <v-list-tile>
                  <v-slider v-model="videoVolume" :prepend-icon="volumeIcon"
                   thumb-label ></v-slider>
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
  created: function(){
    console.log("VideoController Created");
    this.$options.sockets.getVideoInfo = (videoInfo) => {
      console.log('getVideoInfo 받았다!! ');
      this.mirrorVideoInfo = videoInfo;
      this.videoVolume = this.mirrorVideoInfo.volume;
      this.initQualityLevels(); // 품질 단어들 수정
    }
  },
  data: function(){
    return {  mirrorVideoInfo: {}, // mirror에서 보내주는 실행중인 video 정보
              videoToggle: false,
              videoVolume: 0,
              volumeIcon: "volume_up",
              qualityLevels:[],

          }
  },
  watch: {
    videoVolume: function(){
      if (this.videoVolume == 0)
        this.volumeIcon = "volume_off";
      else if(this.videoVolume < 40)
        this.volumeIcon = "volume_down";
      else
        this.volumeIcon = "volume_up";
    }
  },
  methods:{
    changeQuality: function(index){
      this.$socket.emit('changeQuality',this.mirrorVideoInfo.qualityLevels[index]);
    },
    initQualityLevels: function(){
      this.qualityLevels = this.mirrorVideoInfo.qualityLevels.map((val) => {
        console.log(val);
        if(val == 'auto')
          return '자동'
        else if(val == 'tiny')
          return '144p'
        else if(val == 'small')
          return '240p'
        else if(val == 'medium')
          return '360p'
        else if(val == 'large')
          return '480p'
        else
          return val
      })

    },
  }
}
</script>

<style lang="css">
</style>
