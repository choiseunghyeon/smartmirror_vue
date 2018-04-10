<template lang="html">
  <div id="clock" class="col-md-12">
    <div class="date">{{currentDate+" "+currentDay.today}}</div>
    <div class="time">{{currentHour}}</div>
  </div>
</template>

<script>
import Constant from '../Constant.js';
export default {
  name: "Clock",
  data: function(){
    return {currentDate: "", currentHour:"",currentDay:"",dayFlag:false}
  },
  created: function(){
    this.realTimeClock();
    setInterval(() => this.realTimeClock(),1*5000);
  },
  methods: {
    realTimeClock: function(){
      let t=new Date();
      let ap; // AM PM
      let result;
      let t_array=[t.getFullYear(),t.getMonth()+1,t.getDate(),t.getHours(),t.getMinutes()];
      if(t_array[3] == 12){
        ap="PM";
      } else if (t_array[3] > 12) {
        t_array[3]-=12;
        ap="PM";
      } else{
        ap="AM";
        this.dayFlag = false;
      }
      if (this.dayFlag !== true) {
        this.dayClock(t);
        this.dayFlag=true;
      }
      if (t_array[4] < 10) {
        t_array[4]= "0"+t_array[4];
      }
      this.currentDate = t_array[0]+"년 "+t_array[1]+"월 "+t_array[2]+"일";
      this.currentHour = t_array[3]+":"+t_array[4]+""+ap;
    },
    dayClock: function(t){
      let week = ['일','월','화','수','목','금','토'];
      let dayNum = t.getDay();
      if (dayNum+1 == 7 ) {
        this.currentDay = {today:week[dayNum]+'요일',tomorrow:week[0]+'요일'};
      } else {
        this.currentDay = {today:week[dayNum]+'요일',tomorrow:week[dayNum+1]+'요일'};
      }
      this.$store.dispatch(Constant.SET_DAY,this.currentDay);
    }
  } // the end of methods
}
</script>
<style scoped>
/* Clock */
#clock div {
  margin: 0;
  padding: 0;
}

#clock {
  margin-top: 20px;
  font-family: 'Share Tech Mono', monospace;
  color: #fff;
  color: #f7f7f7;
  text-align: center;
}
#clock .date {
  letter-spacing: 0.3em;
  font-size: 26px;
  text-shadow: 0 0 20px rgba(10, 175, 230, 1), 0 0 20px rgba(10, 175, 230, 0);
}
#clock .time {
  letter-spacing: 0.4em;
  font-size: 60px;
  text-shadow: 0 0 20px rgba(10, 175, 230, 1), 0 0 20px rgba(10, 175, 230, 0);
}

</style>
