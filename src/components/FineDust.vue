<template lang="html">
  <div id="pollution" class="col-md-12 bright-shadow">
    {{info.name}}: {{info.state}}
  </div>
</template>

<script>
import ApiKey from '../ApiKey.js';

export default {
  name:"FineDust",
  data: function(){
    return {info:{state:"",name:""}}
  },
  created: function(){
    this.fineDustGet();
    setInterval(() => this.fineDustGet(),3600000) //3600000 => a hour
  },
  methods: {
    fineDustGet: function(){
      let that = this; // function(){} 기존 js펑션을 쓰면 안에서 쓰이는 this는 전혀 다른 값을 가리킴. 따라서 그밖에서 this를 저장해줘야함
      let api_url = 'http://api.airvisual.com/v2/nearest_city?lat=37.538612&lon=126.9208805&rad=500&key='+ApiKey.finedust;
      $.ajax({
        url:api_url,
        type: 'get',
        dataType:"json",
        success:function(data){
          console.log(data);
          let fineDustObj={aqi:data.data.current.pollution.aqius,mainus:data.data.current.pollution.mainus};
          if (fineDustObj.mainus == 'p2') {
            that.info.name="미세먼지";
          } else if (fineDustObj.mainus == 'o3') {
            that.info.name="오존";
          }
          if(fineDustObj.aqi <= 50) that.info.state="좋음"
          else if (fineDustObj.aqi <= 100) that.info.state="보통"
          else if(fineDustObj.aqi <= 150) that.info.state="나쁨"
          else that.info.state="매우 나쁨"
        }
      }) // the end of ajax

    },

  }
}
</script>

<style lang="css" scoped>
#pollution {
  margin-top: 5px;
  font-family: 'Share Tech Mono', monospace;
  letter-spacing: 0.3em;
  color: #f7f7f7;
  text-align: center;
  font-size: 32px;

}
</style>
