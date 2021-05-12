<template lang="html">
<v-layout justify-center align-center row wrap id="weatherRow">
  <v-flex md6 id="today-weather" class="img">
    <p id="stat">{{stat}}</p>

    <!-- <i v-if="weatherData[0].image !== true" :class="weatherData[0].data +' '+'bright-shadow'" style="font-size:90px;"></i> -->
    <img :src="weatherData.url"  style="width:100px;">
    <p id="temperature-max">max - {{weatherData.temp_max}}</p>
    <p id="temperature-min">max - {{weatherData.temp_min}}</p>
    <!-- <p>{{dayObject.today}}</p> -->
  </v-flex>
  <!-- <v-flex md6 class="img">
    <p id="stat">{{stat}}</p>

    <i v-if="weatherData[1].image !== true" :class="weatherData[1].data +' '+'bright-shadow'" style="font-size:55px;"></i>
    <img v-else :src="weatherData[1].data" style="width:100px;">
    <p id="temperature-max">max - {{weatherData[1].tmax}}</p>
    <p id="temperature-min">min - {{weatherData[1].tmin}}</p>
    <p>{{dayObject.tomorrow}}</p>

  </v-flex> -->
</v-layout>
</template>

<script>
import ApiKey from '@/ApiKey.js'
import {mapState} from 'vuex';
export default {
  name: "Weather",
  data: function(){
    return {stat:"" ,weatherData: {
      url: '',
      temp_max: 0,
      temp_min: 0,
    }};
  },
  computed: mapState(['dayObject']),
  created: function(){
       this.weatherGet();
  },
  methods: {
    weatherGet: function(){ //날씨 정보와 온도 정보를 띄워줌
      // 시간별   url: 'http://apis.skplanetx.com/weather/current/hourly?version=1&lat=&lon=&city=%EC%84%9C%EC%9A%B8&county=%EA%B0%95%EB%82%A8%EA%B5%AC&village=%EB%8F%84%EA%B3%A1%EB%8F%99&',
      // q = city name / lang = 언어 / units = 온도 단위 metric 섭씨
      const API_URL = `http://api.openweathermap.org/data/2.5/weather?q=Seoul&lang=kr&units=metric&appid=a2df41c6ae39bff3cd72884afc525622`
      const ICON_URL2 = "https://airvisual.com/images/";
      const WEATHER_ICON_BASE_URL = `http://openweathermap.org/img/wn/`
      const IMAGE_EXTENSION = ".png"
      this.$axios.get(API_URL)
      .then((response) => {
        console.log(response);
        const data = response.data;
        // const { description, icon } = data.weather;
        const { temp_max, temp_min } = getMaxMinTemp(data.main); 
        const ICON_URL = WEATHER_ICON_BASE_URL + "02d@2x" + IMAGE_EXTENSION;

        this.weatherData.url = ICON_URL;
        this.weatherData.temp_max = temp_max;
        this.weatherData.temp_min = temp_min;



        //var temperature = [parseInt(data.weather.hourly[0].temperature.tc),parseInt(data.weather.hourly[0].temperature.tmax),parseInt(data.weather.hourly[0].temperature.tmin)]
        // var days = [weather.today,weather.tomorrow];
        // console.log(days);
        // for (var i = 0; i < days.length; i++) {
        //   let numCode = days[i].sky.code.slice(5,7);
        //   let dayData;
        //   switch (numCode) {
        //     case '00': dayData={data:"./static/images/icons/38.png", image:true}; break;
        //     case '01': if (time<18) {dayData={data:"wi wi-day-sunny", image:false}}  //낮
        //                     else {dayData={data:"wi wi-night-clear", image:false}} break; //밤
        //     case '02': if (time<18) {dayData={data:"wi wi-day-cloudy",image:false}}
        //                     else{ dayData={data:"wi wi-night-alt-cloudy", image:false} } break;
        //     case '03': if (time<18) {dayData={data:"wi wi-day-cloudy", image:false}}
        //                     else{ dayData={data:"wi wi-night-alt-cloudy", image:false} } break;
        //     case '04': if (time<18) {dayData={data:"wi wi-day-rain", image:false}}
        //                     else{ dayData={data:"wi wi-night-alt-rain", image:false} } break;
        //     case '05': if (time<18) {dayData={data: "wi wi-day-snow", image:false}}
        //                     else{ dayData={data:"wi wi-night-snow", image:false} } break;
        //     case '06': if (time<18) {dayData={data:"wi wi-day-snow", image:false}}
        //                     else{ dayData={data:"wi wi-night-snow", image:false} } break;
        //     case '07': dayData={data:"wi wi-cloudy", image:false}; break;
        //     case '08': dayData={data:"./static/images/icons/21.png", image:true}; break;
        //     case '09': dayData={data:"./static/images/icons/32.png", image:true}; break;
        //     case '10': dayData={data:"./static/images/icons/04.png", image:true}; break;
        //     case '11': dayData={data:"./static/images/icons/29.png", image:true}; break;
        //     case '12': dayData={data:"./static/images/icons/26.png", image:true}; break;
        //     case '13': dayData={data:"./static/images/icons/27.png", image:true}; break;
        //     case '14': dayData={data:"./static/images/icons/28.png", image:true}; break;

        //   }

        //   dayData.name = days[i].sky.name;
        //   dayData.tmax = days[i].temperature.tmax;
        //   dayData.tmin = days[i].temperature.tmin;
        //   this.weatherData.push(dayData);
        // } // the end of for
      })

      function getMaxMinTemp (temp) {
        return { temp_max: Math.floor(temp.temp_max) + '°C', temp_min: Math.floor(temp.temp_min) + '°C'}
      }
    },

  }
}
</script>
<style scoped>
/* Weather */
#weatherRow {
  margin-top: 20px;
  color: #f7f7f7;
  text-align: center;
}
#weatherRow p {
  font-size: 23px;
  margin-top: 12px;
}
/* #today-weather {
  border-right: 1px solid rgba(255,255,255,0.3);
} */
</style>
