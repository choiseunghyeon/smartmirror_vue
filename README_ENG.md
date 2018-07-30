# Funcitons Explanation - ENG

**Smart Home**

- **How to make hardware, API Setting, Demo Video**

  blog: http://webigotr.tistory.com/228

- **Let's get started**

      // you have to install node and npm at first
      $ sudo npm install // hit this commend in the smartmirror folder
      $ mkdir /src/ApiKey.js // almost functions need API KEY. check API SETTING
      $ sudo npm run dev // and then hit http://localhost:8080/ in browser

  - **Control**

    1. Start Node.js server

    2. Hit the url(localhost:3000) and then Use Youtube Functions

    3. Controller is the browser on your cellphone in this document

 - **Basic features**
  you can use a few functions in Controller
  you can change from Youtube to Lamp on the top tollbar


- **Hamburger Menu**

  a. MostPopular: it shows you popular videos on youtube

  b. My List: it shows you lists you have saved

  c. Youtube Controller: you can controller youtube video with it. it shows you video Time, Title, etc.

  d. SUBSCRIPTIONS: it shows you channel you have saved


- **Weather (Mirror)**

  it shows today and tomorrow weather summary such as min temperature and max temperature
  and you will know weather outside with image

- **Clock (Mirror)**

  it shows Year, month, day and Time

- **FineDust (Mirror)**

  it shows you a state of finedust like good, moderate, unhealthy for sensitive groups, unhealthy

- **Youtube**
  - Search Function

    a. youtube list that you searched

    b. if list's scroll almost hit the bottom then it will show additional youtube list

    c. if you click a video of youtube list then the video will display

    d. if there is a channel of streamer in list, you can add channel by click

  - Channel Addition or Remove

    a. when you search Channel you want to add, the Channel and related video display in list then, just click the Channel

    b. you can remove Channel by clicking x sign in the top of box

  - Play List that Channel have

    a. Play List will display when you click one of Channels

    b. if Play List scroll almost hit the bottom then it will show additional Play List

    c. if you click playlist then display shows you lists playlist have. if you click video then display shows you lists you have clicked


  - Video List that Play List have

    a. if you choose one of viedo list then the video play on screen and will show you a next video in video list



- **My List**

   a. you can make or remove your own list(No image at the first time)

   b. if you click one of your lists then it will show you videos

     - if you click one of videos in your list that you clicked then the video play on screen and will play a next video in regular sequence

   c. whenever you click 저장(save) in video, My List display on screen -> if you click your own list then the list save the video


**API SETTING**
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
