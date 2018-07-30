# 기능 설명 - KOR

**Smart Home**

- **하드웨어 만들기, API설정, 기능 영상**

    blog: http://webigotr.tistory.com/228

- **시작하기**

      // node와 npm이 깔려있어야 합니다.
      $ sudo npm install // 다운받은 폴더에서 명령어 입력
      $ mkdir /src/ApiKey.js // 유튜브, 날씨, 미세먼지의 기능은 api키가 필요합니다 API설정 참조
      $ sudo npm run dev // smartmirror가 실행되며 브라우저에  http://localhost:8080/ 입력

- **조작**

  1. node.js server 시작

  2. 핸드폰으로 localhost:3000 접속 후 여러가지 기능으로 mirror 조작

  * 핸드폰으로 접속한 browser를 이 문서 전반적으로 Controller라 칭함.
  * Mirror로 표시한 것들은 mirror와 관련 있는 기능들

- **기본 기능**

  Controller에서 기본적인 Youtube 기능 사용가능
  상단 Toolbar에서 Youtube, Lamp Controller page 바꾸기 가능

  * 추후 Lamp 추가

- **햄버거 메뉴**

  ㄱ. MostPopular: Youtube에서 뜨고 있는 영상 보여줌

  ㄴ. 나의 목록: 내가 저장한 영상을 보여줌

  ㄹ. 유튜브 컨트롤러: 영상정보, 시간, 소리조절, 영상끄기 및 숨기기, 멈춤-재생, 10초 앞-뒤, 특정 시간대 재생 등

  ㅁ. 구독중인 채널들을 보여줌



- **날씨 (Mirror)**

  오늘, 내일의 최고 온도 및 최저 온도를 표시
  날씨의 상태는 간단한 이미지로 표시

- **시간 (Mirror)**

  년, 월, 일, 요일, 시간(AM, PM기준) 표시

- **미세먼지 (Mirror)**

  좋음, 보통, 나쁨, 매우나쁨으로 구분

- **유튜브**

  - 검색 기능

    ㄱ. 검색어에 관한 영상들 리스트

    ㄴ. 스크롤을 충분히 하단으로 내리면 추가 영상 보여줌

    ㄷ. 영상 클릭시 재생

    ㄹ. 채널 클릭시 채널 추가


  - 채널 추가 및 삭제 기능

    ㄱ. 채널 클릭시 채널이 가지고 있는 재생 목록 보여줌


  - 채널이 가지고 있는 재생 목록 리스트

    ㄱ. 목록 클릭시 목록이 가지고 있는 영상들의 리스트 출력

    ㄴ. 스크롤을 충분히 하단으로 내리면 추가 목록 보여줌

    ㄷ. 재생목록을 누르면 채널이 가지고 있는 목록을 보여주며 동영상을 누르면 이전에 선택한 재생목록의 영상들을 보여줌

  - 재생 목록이 가지고 있는 영상들의 리스트

    ㄱ. 클릭시 현재까지 출력된 영상들을 리스트로 만들어 클릭된 영상부터 순차적으로 보여줌(Mirror)


- **나의 목록**

  ㄱ. 목록을 생성 하거나 삭제 가능(초기 이미지는 없음)

  ㄴ. 목록 클릭시 해당 목록이 가지고 있는 영상들을 보여줌

    - 영상 클릭시 해당 영상부터 다음 영상들을 리스트로 만들어 순차적으로 재생(Mirror)

  ㄷ. 유튜브 검색 또는 채널이 가지고 있는 영상에서 저장 기능 클릭시 나의 목록이 토글되어 보여짐 -> 목록 클릭시 저장됨

**API 설정**
 - 날씨, 미세먼지, 유튜브는 API 키가 필요합니다.
 - src아래에 ApiKey.js를 만들고 안에 간단한 설정을 해주어야 정상적으로 api요청 및 리스폰스값 처리가 가능합니다.
 - 날씨: https://developers.sktelecom.com/content/sktApi/view/?svcId=10113

 - 미세먼지: https://www.airvisual.com/api

 - 유튜브: https://developers.google.com/youtube/v3/getting-started?hl=ko

 - 다음과 같이 ApiKey.js를 만들어 줍니다.

       export default {
         youtube: "YOUR YOUTUBE API KEY",
         weather: "YOUR WEATHER API KEY",
         finedust: "YOUR FINEDUST API KEY",
       }
