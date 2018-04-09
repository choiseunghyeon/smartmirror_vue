<template lang="html">
  <div id="dust" class="col-md-12">
    미세먼지: {{dust.state}}
  </div>
</template>

<script>
import ApiKey from '../ApiKey.js';

export default {
  name:"FineDust",
  data: function(){
    return {dust:{state:""}}
  },
  created: function(){
    this.fineDustGet();
  },
  methods: {
    fineDustGet: function(){
      let that = this; // function(){} 기존 js펑션을 쓰면 안에서 쓰이는 this는 전혀 다른 값을 가리킴. 따라서 그밖에서 this를 저장해줘야함
      let api_url = 'http://api.airvisual.com/v2/nearest_city?lat=37.538612&lon=126.9208805&rad=500&'+ApiKey.finedust;
      $.ajax({
        url:api_url,
        type: 'get',
        dataType:"json",
        success:function(data){
          console.log(data);
          let fineDustObj={aqi:data.data.current.pollution.aqius,mainus:data.data.current.pollution.mainus}
          if (fineDustObj.mainus == 'p2') {
            if(fineDustObj.aqi <= 50) that.dust.state="좋음"
            else if (fineDustObj.aqi <= 100) that.dust.state="보통"
            else if(fineDustObj.aqi <= 150) that.dust.state="나쁨"
            else that.dust.state="매우 나쁨"
          }
        }
      }) // the end of ajax

    },

  }
}
</script>

<style lang="css">
</style>
