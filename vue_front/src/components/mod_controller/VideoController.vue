<template lang="html">
  <!-- 유튜브 컨트롤러 -->
  <v-bottom-sheet inset :hide-overlay="true" :persistent="true" :value="youtubeSheet">

    <v-card tile color="blue-grey darken-3">
        <v-layout row wrap>
          <v-flex xs12 class="videoTitle">
            {{ mirrorVideoInfo.data.title}}
          </v-flex>
          <v-flex id="slider" xs12>
            <v-slider style="padding: 0px 10px 0px 10px" @click.stop="playAt"
             v-model="videoTime.currentSeconds" :max="mirrorVideoInfo.duration">
            </v-slider>
          </v-flex>
          <v-flex xs12 class="videoTime">
            <span> {{ videoTime.currentTime }} / {{ videoTime.duration }} </span>
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

                    <!-- <v-list-tile>
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
                    </v-list-tile> -->
                    <v-list-tile>
                      <v-list-tile-content> 영상 숨기기
                      </v-list-tile-content>
                      <v-list-tile-avatar>
                        <v-switch v-model="mirrorVideoInfo.videoToggle" large @change="toggleYoutube"
                        color="indigo darken-3" hide-details>
                        </v-switch>
                      </v-list-tile-avatar>
                    </v-list-tile>
                    <v-list-tile>
                      <v-list-tile-content> 영상 끄기
                      </v-list-tile-content>
                        <v-btn flat icon color="pink">
                          <v-icon @click.stop="removeYoutube" medium>clear</v-icon>
                        </v-btn>

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
    this.$socket.emit('syncInfo'); // mirror가 가진 정보들을 가져옴 ex)유튜브가 실행중, 유튜브토글 활성화 등
    this.$options.sockets.getVideoInfo = (videoInfo) => {
      console.log('getVideoInfo 받았다!! ');
      this.initVideoController(videoInfo); // 품질 단어들 수정
    };
    this.$options.sockets.syncVideoTime = (seconds) => {
      console.log('syncVideoTime 받았다!! ');
      this.mirrorVideoInfo.currentTime = seconds // 싱크 맞추기
    };
  },
  data: function(){
    return {  mirrorVideoInfo: {data:{title:"재생중인 영상이 없습니다."}, videoToggle:false}, // mirror에서 보내주는 실행중인 video 정보
              videoVolume: 0, // mirror에서 보여지는 영상의 볼륨
              videoTime: {
                duration:"00:00", // 포맷팅된 영상의 총시간
                currentSeconds: 0, //영상의 현재 시간
                currentTime: "00:00", //포맷팅된 현재 시간
              },
              pausePlayIcon: "pause", // pause / play
              volumeIcon: "volume_up", // 볼륨 크기에 따라 아이콘을 다르게 지정
              qualityLevels:[], // 품질을 보기좋게 변경한 배열
              intervalTimer:"",
          }
  },
  watch: {
    videoVolume: function(){ //볼륨 실시간으로 변경
      if (this.videoVolume == 0)
        this.volumeIcon = "volume_off";
      else if(this.videoVolume < 40)
        this.volumeIcon = "volume_down";
      else
        this.volumeIcon = "volume_up";
      this.$socket.emit('videoVolume',this.videoVolume);
    },
    'mirrorVideoInfo.currentTime': function(){ // mirror에서 playing이 실행되면 시간 동기화(보통 youtube영상에 변화가 생기면 실행)
      // object child를 watch로 설정하려면 쿼터('' || "") 안에 넣으면됌
      this.videoTime.currentSeconds = this.mirrorVideoInfo.currentTime
    },
  },
  methods:{
    // changeQuality: function(index){ // youtube에서 제공하는 api에서도 기능이 적용되지 않는중
    //   this.$socket.emit('changeQuality',this.mirrorVideoInfo.qualityLevels[index]);
    // },
    initVideoController: function(videoInfo){ // 비디오 시작시 관련 정보 설정
      clearInterval(this.intervalTimer); // 이전 영상에서 설정된 타이머가 있다면 초기화
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
      this.videoTime.duration = this.timeTransformation(this.mirrorVideoInfo.duration) // // 영상 길이 설정 및 시,분,초로 나눔
      this.videoTime.currentSeconds = Math.floor(this.mirrorVideoInfo.currentTime); // 재생이 진행된 시간 가져옴(처음 실행한다면 0)
      this.videoTimeCount(); // Interval 설정
    },

    timeTransformation: function(seconds){ // 초를 넣어서 시/분/초로 포맷함
      let floorSeconds = Math.floor(seconds);
      console.log("timeTransformation 실행");
      if(floorSeconds < 60){ //포맷적용
        if(floorSeconds<10)
          return "00:0"+floorSeconds;
        else
          return "00:"+floorSeconds;
      }
      let duration = moment.duration(floorSeconds, 'seconds');
      return duration.format("hh:mm:ss");
    },
    videoTimeCount: function(flag){
      if(flag == "play_arrow"){ // 멈춤이면 보여지는 Icon은 play_arrow
        clearInterval(this.intervalTimer);
      } else if(this.videoTime.duration !== "00:00"){
        // 1초 마다 videoTime.currentSeconds를 1씩 올림 duration보다 크거나 같으면 이벤트 삭제
        this.intervalTimer = setInterval(() => {
          if (this.videoTime.currentSeconds >= Math.floor(this.mirrorVideoInfo.duration))
          clearInterval(this.intervalTimer);
          this.videoTime.currentTime = this.timeTransformation(++this.videoTime.currentSeconds)
        }, 1000);
      }
    },
    pauseOrPlay: function(){
      console.log("pauseOrPlay 실행됨");
      this.$socket.emit('pauseOrPlay',this.pausePlayIcon);
      this.pausePlayIcon = this.pausePlayIcon == "pause" ? "play_arrow" : "pause";
      this.videoTimeCount(this.pausePlayIcon);
    },
    forward: function(){
      this.$socket.emit('forward');
    },
    rewind: function(){
      this.$socket.emit('rewind');
    },
    playAt: function(){
      this.$socket.emit('playAt',this.videoTime.currentSeconds);
    },
    toggleYoutube: function(){
      console.log("toggleYoutube");
      this.$socket.emit('toggleYoutube');
    },
    removeYoutube: function(){
      console.log("removeYoutube");
      this.$socket.emit("removeYoutube");
      this.mirrorVideoInfo = {data:{title:"재생중인 영상이 없습니다."}, videoToggle:false};
      clearInterval(this.intervalTimer);
      this.videoTime = {
        duration:"00:00", // 포맷팅된 영상의 총시간
        currentSeconds: 0, //영상의 현재 시간
        currentTime: "00:00", //포맷팅된 현재 시간
      };
      this.pausePlayIcon= "pause"; // pause / play
    }
  }
}
</script>

<style lang="css">


.videoTime {
  text-align: center;
  font-size:16px;
  color: rgba(255, 255, 255, 0.7);
  margin-top: -5px;
}
.videoTitle{
  text-align: center;
  font-size:18px;
  margin: 5px 2px 0px 2px;
  padding: 3px 5px 0px 5px;
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
