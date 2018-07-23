<template lang="html">
  <!-- 유튜브 컨트롤러 -->
  <v-bottom-sheet inset :hide-overlay="true" :persistent="true" :value="youtubeSheet">

    <v-card tile>
        <v-layout row wrap>
          <v-flex xs12 class="videoTitle">
            {{ mirrorVideoInfo.data.title}}
          </v-flex>
          <v-flex xs12>
            <v-slider style="padding: 0px 10px 0px 10px"
             v-model="videoCurrentSeconds" :max="mirrorVideoInfo.duration">
            </v-slider>
          </v-flex>
          <v-flex xs12 class="videoTime">
            <span> {{ videoCurrentTime }} / {{ videoDuration }} </span>
          </v-flex>
          <v-flex xs12 class="textCenter">
              <div class="inlineBlock">
                <v-btn icon @click="rewind">
                  <v-icon >fast_rewind</v-icon>
                </v-btn>
              </div>
              <div class="inlineBlock">

                <v-btn icon @click="pauseOrPlay">
                  <v-icon >{{ pausePlayIcon }}</v-icon>
                </v-btn>
              </div>
              <div class="inlineBlock">
                <v-btn icon @click="forward" >
                  <v-icon >fast_forward</v-icon>
                </v-btn>
              </div>
              <div class="setting">
                <v-menu top offset-y :close-on-content-click="false"
                 :allow-overflow="true" :nudge-width="130">
                  <v-btn slot="activator" outline
                   color="white" dark icon>
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
            </div>
          </v-flex>
        </v-layout>

    </v-card>

  </v-bottom-sheet>


</template>

<script>
import {mapState} from 'vuex';
import moment from 'moment'; //moment library
require('moment-duration-format'); // moment plugin

export default {
  name: "VideoController",
  computed: mapState(['youtubeSheet']),
  created: function(){
    console.log("VideoController Created");
    this.$options.sockets.getVideoInfo = (videoInfo) => {
      console.log('getVideoInfo 받았다!! ');
      this.initVideoController(videoInfo); // 품질 단어들 수정
    };
  },
  data: function(){
    return {  mirrorVideoInfo: {data:{title:"재생중인 영상이 없습니다."}}, // mirror에서 보내주는 실행중인 video 정보
              videoToggle: false, // mirror에서 보여지는 영상 숨기기, 보여주기
              videoVolume: 0, // mirror에서 보여지는 영상의 볼륨
              videoDuration:"00:00", // 포맷팅된 영상의 총시간
              videoCurrentSeconds: 0, //영상의 현재 시간
              videoCurrentTime: "00:00", //포맷팅된 현재 시간
              volumeIcon: "volume_up", // 볼륨 크기에 따라 아이콘을 다르게 지정
              qualityLevels:[], // 품질을 보기좋게 변경한 배열
              pausePlayIcon: "pause", // pause / play

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
    initVideoController: function(videoInfo){
      this.mirrorVideoInfo = videoInfo; // 로컬 변수에 저장
      this.videoVolume = this.mirrorVideoInfo.volume; //볼륨 설정
      this.qualityLevels = this.mirrorVideoInfo.qualityLevels.map((val) => { // 품질 설정
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
      });
      this.videoDuration = this.timeTransformation(this.mirrorVideoInfo.duration) // // 영상 길이 설정 및 시,분,초로 나눔
      this.videoCurrentSeconds=0;
      setInterval(() => { this.videoCurrentTime = this.timeTransformation(++this.videoCurrentSeconds)}, 1000);

    },
    timeTransformation: function(seconds){ // 초를 넣어서 시/분/초로 포맷함
      console.log("timeTransformation 실행");
      let floorSeconds = Math.floor(seconds);
      let duration = moment.duration(floorSeconds, 'seconds');
      return duration.format("hh:mm:ss");
    },
    pauseOrPlay: function(){
      console.log("pauseOrPlay 실행됨");
      this.$socket.emit('pauseOrPlay',this.pausePlayIcon);
      this.pausePlayIcon = this.pausePlayIcon == "pause" ? "play_arrow" : "pause";
    },
    forward: function(){
      this.$socket.emit('forward');
    },
    rewind: function(){
      this.$socket.emit('rewind');
    },
  }
}
</script>

<style lang="css">
.input-group__details {
  display: none;
}
.videoTime {
  text-align: center;
  font-size:16px;
  color: rgba(255, 255, 255, 0.7);
  margin-top: -5px;
}
.videoTitle{
  text-align: center;
  font-size:18px;
  font-weight: bold;
  margin-top: 5px;
}
.inlineBlock{
  display: inline-block;
  margin: 3px 2px 0px 2px;;
}
.textCenter{
  text-align: center;
}
.setting {
  position: absolute;
  right: 5px;
  bottom: 0px;
}
</style>
