# Funcitons Explanation - ENG

- Let's get started

      // you have to install node and npm at first
      $ npm install // hit this commend in the smartmirror folder
      $ mkdir /src/ApiKey.js // almost functions need API KEY. check API SETTING
      $ npm run dev // hit http://localhost:8080/ in browser

- Introduction

  You can controll Widget, Hamburger Menu, Channel List and Youtube with your mouse

- Hamburger Menu

  a. searching youtube

  b. displaying channels that you added

  c. youtube(minimization): when you click it, youtube video will disappear but sound keep playing

  d. youtube(removal): it will remove youtube video perfectly

  e. widget: when you click it, widget(weather, fineDust, Clock) will disappear
  
- Weather

  it shows today and tomorrow weather summary such as min temperature and max temperature
  and you will know weather outside with image

- Clock

  it shows Year, month, day and Time

- FineDust

  it shows you a state of finedust like good, moderate, unhealthy for sensitive groups, unhealthy

- Youtube
  - Search Function

    a. youtube list that you searched

    b. if list's scroll hit the bottom then it will show additional youtube list

    c. if you click a video of youtube list then the video will display

    d. if there is a channel of streamer in list, you can add channel by click

  - Channel Addition or Remove

    a. when you search Channel you want to add, the Channel and related video display in list then, just click the Channel

    b. you can remove Channel by clicking x sign in the top of box

  - Play List that Channel have

    a. Play List will display when you click one of Channels

    b. if Play List scroll hit the bottom then it will show additional Play List

    c. MOVE - (if you don't choose Play List then It shows you a X sign) it moves on what you choose

  - Video List that Play List have

    a. video list that Play List have will display on screen

    b. if you choose one of viedo list then the video play on screen and will show you a next video in video list

    c. MOVE - PLAY LISTS( move to PLAY LISTS)

    d. if Video List scroll hit the bottom then it will show additional Video List

API SETTING
 - you need a few API key about Weather, FineDust and Youtube
 - you have to make ApiKey.js file in src folder and then you have to set ApiKey.js with your API key
 - Weather: https://developers.sktelecom.com/content/sktApi/view/?svcId=10113

 - FineDust: https://www.airvisual.com/api

 - Youtube: https://developers.google.com/youtube/v3/getting-started?hl=en

 - set ApiKey.js like below:

       export default {
         youtube: "YOUR YOUTUBE API KEY",
         weather: "YOUR WEATHER API KEY",
         finedust: "YOUR FINEDUST API KEY",
       }


No server setting

No database
