<template lang="html">
<div id="weatherRow">
  <div id="today-weather" class="col-md-6 img">
    <p id="stat">{{stat}}</p>

    <i v-if="weatherData[0].image !== true" :class="weatherData[0].data" style="font-size:80px; display:block;"></i>
    <img v-else :src="weatherData[0].data" style="width:100px;">
    <p id="temperature-max">max - {{weatherData[0].tmax}}</p>
    <p>{{dayObject.today+"요일"}}</p>
  </div>
  <div class="col-md-6 img">
    <p id="stat">{{stat}}</p>

    <i v-if="weatherData[1].image !== true" :class="weatherData[1].data" style="font-size:50px;"></i>
    <img v-else :src="weatherData[1].data" style="width:100px;">
    <p id="temperature-max">max - {{weatherData[1].tmax}}</p>
    <p id="temperature-min">min - {{weatherData[1].tmin}}</p>
    <p>{{dayObject.tomorrow+'요일'}}</p>
  </div>
</div>
</template>

<script>
import ApiKey from '../ApiKey.js'
import {mapState} from 'vuex';
export default {
  name: "Weather",
  data: function(){
    return {stat:"" ,weatherData:[]};
  },
  computed: mapState(['dayObject']),
  created: function(){
    //this.weatherGet();
    //setInterval(this.weatherGet,3600000); // 1000ms = 1 second 1시간마다 한번씩 날씨 정보 로딩
    this.weatherGet();
  },
  methods: {
    weatherGet: function(){
      let that = this; // function(){} 기존 js펑션을 쓰면 안에서 쓰이는 this는 전혀 다른 값을 가리킴. 따라서 그밖에서 this를 저장해줘야함
      let api_url = 'http://apis.skplanetx.com/weather/summary?version=1&lat=37.503260&lon=126.788507&'+ApiKey.weather;
      $.ajax({
      // 시간별   url: 'http://apis.skplanetx.com/weather/current/hourly?version=1&lat=&lon=&city=%EC%84%9C%EC%9A%B8&county=%EA%B0%95%EB%82%A8%EA%B5%AC&village=%EB%8F%84%EA%B3%A1%EB%8F%99&',
        url:api_url,
        type: 'get',
        dataType:"json",
        success:function(data){
          //console.log(data);
          console.log(data)
          var time = new Date();
          time = time.getHours()
          let weather = data.weather.summary[0];

          //var temperature = [parseInt(data.weather.hourly[0].temperature.tc),parseInt(data.weather.hourly[0].temperature.tmax),parseInt(data.weather.hourly[0].temperature.tmin)]
          var days = [weather.today,weather.tomorrow];
          console.log(days);
          for (var i = 0; i < days.length; i++) {
            let numCode = days[i].sky.code.slice(5,7);
            let dayData;
            switch (numCode) {
              case '00': dayData={data:"./static/images/icons/38.png", image:true}; break;
              case '01': if (time<18) {dayData={data:"wi wi-day-sunny", image:false}}  //낮
                              else {dayData={data:"wi wi-night-clear", image:false}} break; //밤
              case '02': if (time<18) {dayData={data:"wi wi-day-cloudy",image:false}}
                              else{ dayData={data:"wi wi-night-alt-cloudy", image:false} } break;
              case '03': if (time<18) {dayData={data:"wi wi-day-cloudy", image:false}}
                              else{ dayData={data:"wi wi-night-alt-cloudy", image:false} } break;
              case '04': if (time<18) {dayData={data:"wi wi-day-rain", image:false}}
                              else{ dayData={data:"wi wi-night-alt-rain", image:false} } break;
              case '05': if (time<18) {dayData={data: "wi wi-day-snow", image:false}}
                              else{ dayData={data:"wi wi-night-snow", image:false} } break;
              case '06': if (time<18) {dayData={data:"wi wi-day-snow", image:false}}
                              else{ dayData={data:"wi wi-night-snow", image:false} } break;
              case '07': dayData={data:"wi wi-cloudy", image:false}; break;
              case '08': dayData={data:"./static/images/icons/21.png", image:true}; break;
              case '09': dayData={data:"./static/images/icons/32.png", image:true}; break;
              case '10': dayData={data:"./static/images/icons/04.png", image:true}; break;
              case '11': dayData={data:"./static/images/icons/29.png", image:true}; break;
              case '12': dayData={data:"./static/images/icons/26.png", image:true}; break;
              case '13': dayData={data:"./static/images/icons/27.png", image:true}; break;
              case '14': dayData={data:"./static/images/icons/28.png", image:true}; break;

            }

            dayData.name = days[i].sky.name;
            dayData.tmax = days[i].temperature.tmax;
            dayData.tmin = days[i].temperature.tmin;
            that.weatherData.push(dayData);
          } // the end of for
        }
      }) // the end of ajax

    },
    /*
    testWeather: function(){
      let data = {
    "result": {
        "message": "성공",
        "code": 9200,
        "requestUrl": "/weather/summary?version=1&lat=37.4930444&lon=127.0137737"
    },
    "common": {
        "alertYn": "Y",
        "stormYn": "N"
    },
    "weather": {
        "summary": [
            {
                "grid": {
                    "latitude": "37.4876400000",
                    "longitude": "126.9879200000",
                    "city": "서울",
                    "county": "서초구",
                    "village": "방배4동"
                },
                "yesterday": {
                    "sky": {
                        "name": "맑음",
                        "code": "SKY_Y01"
                    },
                    "precipitation": {
                        "rain": "0.00",
                        "snow": "0.00"
                    },
                    "temperature": {
                        "tmax": "15.10",
                        "tmin": "10.50"
                    }
                },
                "today": {
                    "sky": {
                        "name": "맑음",
                        "code": "SKY_D01"
                    },
                    "temperature": {
                        "tmax": "15.10",
                        "tmin": "10.50"
                    }
                },
                "tomorrow": {
                    "sky": {
                        "name": "맑음",
                        "code": "SKY_M03"
                    },
                    "temperature": {
                        "tmax": "08",
                        "tmin": "01"
                    }
                },
                "dayAfterTomorrow": {
                    "sky": {
                        "name": "맑음",
                        "code": "SKY_M01"
                    },
                    "temperature": {
                        "tmax": "15.10",
                        "tmin": "10.50"
                    }
                },
                "timeRelease": "2013-11-0717: 00: 00"
            }
        ]
    }
}
      console.log(data)
      var time = new Date();
      time = time.getHours()
      let weather = data.weather.summary[0];
      console.log(weather);
      //var temperature = [parseInt(data.weather.hourly[0].temperature.tc),parseInt(data.weather.hourly[0].temperature.tmax),parseInt(data.weather.hourly[0].temperature.tmin)]
      var days = [weather.today,weather.tomorrow];
      console.log(days);
      for (var i = 0; i < days.length; i++) {
        let numCode = days[i].sky.code.slice(5,7);
        let dayData;
        switch (numCode) {
          case '00': dayData={data:"./static/images/icons/38.png", image:true}; break;
          case '01': if (time<18) {dayData={data:"wi wi-day-sunny", image:false}}  //낮
                          else {dayData={data:"wi wi-night-clear", image:false}} break; //밤
          case '02': if (time<18) {dayData={data:"wi wi-day-cloudy",image:false}}
                          else{ dayData={data:"wi wi-night-alt-cloudy", image:false} } break;
          case '03': if (time<18) {dayData={data:"wi wi-day-cloudy", image:false}}
                          else{ dayData={data:"wi wi-night-alt-cloudy", image:false} } break;
          case '04': if (time<18) {dayData={data:"wi wi-day-rain", image:false}}
                          else{ dayData={data:"wi wi-night-alt-rain", image:false} } break;
          case '05': if (time<18) {dayData={data: "wi wi-day-snow", image:false}}
                          else{ dayData={data:"wi wi-night-snow", image:false} } break;
          case '06': if (time<18) {dayData={data:"wi wi-day-snow", image:false}}
                          else{ dayData={data:"wi wi-night-snow", image:false} } break;
          case '07': dayData={data:"wi wi-cloudy", image:false}; break;
          case '08': dayData={data:"./static/images/icons/21.png", image:true}; break;
          case '09': dayData={data:"./static/images/icons/32.png", image:true}; break;
          case '10': dayData={data:"./static/images/icons/04.png", image:true}; break;
          case '11': dayData={data:"./static/images/icons/29.png", image:true}; break;
          case '12': dayData={data:"./static/images/icons/26.png", image:true}; break;
          case '13': dayData={data:"./static/images/icons/27.png", image:true}; break;
          case '14': dayData={data:"./static/images/icons/28.png", image:true}; break;

        }

        dayData.name = days[i].sky.name;
        dayData.tmax = days[i].temperature.tmax;
        dayData.tmin = days[i].temperature.tmin;
        this.weatherData.push(dayData);
      } // the end of for
    },
    */
  }
}
</script>
