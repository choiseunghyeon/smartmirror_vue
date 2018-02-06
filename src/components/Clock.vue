<template lang="html">
  <div id="clock" class="col-md-12">
    <div class="date">{{currentDate+" "+currentDay.today}}</div>
    <div class="time">{{currentHour}}</div>
  </div>
</template>

<script>
import eventBus from './EventBus.vue'
export default {
  name: "Clock",
  data: function(){
    return {currentDate: "", currentHour:"",currentDay:""}
  },
  created: function(){
    this.realTimeClock();
    setInterval(() => this.realTimeClock(),1*5000);
  },
  methods: {
    realTimeClock: function(){
      let dayflag = false;
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
        dayflag = false;
      }
      if (dayflag !== true) {
        this.dayClock(t);
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
        this.currentDay = {today:week[dayNum],tomorrow:week[0]};
      } else {
        this.currentDay = {today:week[dayNum],tomorrow:week[dayNum+1]};
      }
      eventBus.$emit('getDay',this.currentDay);
    }
  } // the end of methods
}
</script>
