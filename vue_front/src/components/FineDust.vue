<template lang="html">
  <v-layout row wrap>
    <v-flex md12 id="pollution" class="bright-shadow">

      {{info.name}}: {{info.state}}
    </v-flex>
  </v-layout>
</template>

<script>
import ApiKey from '@/ApiKey.js';

export default {
  name:"FineDust",
  data: function(){
    return {info:{state:"",name:""}}
  },
  created: function(){
    this.GetFineDust();
    setInterval(() => this.GetFineDust(),3600000) //3600000 => a hour
  },
  methods: {
    GetFineDust: function(){
      let api_url = 'http://api.airvisual.com/v2/nearest_city?lat=37.538612&lon=126.9208805&rad=500&key='+ApiKey.finedust;
      this.$axios.get(api_url)
      .then((response) => {
        console.log(response);
        let data = response.data.data;
        let fineDustObj={aqi:data.current.pollution.aqius,mainus:data.current.pollution.mainus};
        if (fineDustObj.mainus == 'p2') {
          this.info.name="미세먼지";
        } else if (fineDustObj.mainus == 'o3') {
          this.info.name="오존";
        }
        if(fineDustObj.aqi <= 50) this.info.state="좋음"
        else if (fineDustObj.aqi <= 100) this.info.state="보통"
        else if(fineDustObj.aqi <= 150) this.info.state="나쁨"
        else this.info.state="매우 나쁨"
      })
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
