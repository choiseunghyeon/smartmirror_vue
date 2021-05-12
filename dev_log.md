개요 - smartmirror의 편의성과 확장성을 위해 back-end(node.js)를 만들기로 결정 추후 smarthome으로 확장

계획 - node.js에 socket.io를 연결하여 controller(mobile phone)로 smartmirror를 제어하도록 설정 - db를 만들어서 browser session storage에서 db로 옮기기 - gpio를 이용해서 전등 연결하기(날씨에 따라 색상 조절) - controller(mobile phone)에 음성인식 기능을 지원하여 전등 on/off 조절

18.06.05

- front와 back엔드 구분
- scroll down문제 발견

18.06.11

- back-end와 front-end에서 socket.io 통신 확인
- front-end에서 기기에 따라 url 리다이렉트 달리함 -> mobile은 controller url로 보냄
- front-end components안에서 folder를 만들어 controller와 mirror 부분 구분
- VueSocketio 사용
- mod_controller로 mobile에서 조작할 부분 옮겨 놓음 기능 정사 작동 확인

18.06.12

- bootstrap, jquery 관련의존성 삭제
- bootstrap 대신 vuetify 사용
- controller로 이동하는 부분 App.vue로 이동
- FineDust 및 Weather의 ajax 부분을 axios로 변경

18.06.14

- vutify 적용
- Main.vue(widget)부분 vutify 적용 완료

18.06.19

- vuetify에서 제공하는 Google Youtube layouts 적용
- toolbar 및 기타 기능 필요에 맞게 수정

18.06.20

- vue-router를 통해 각 router를 렌더링 해주도록 설정
- searchedList router 띄워줌 (\* scroll event가 안됨)

18.06.25

- searchedList scroll issue 해결 및 스크롤이 바닥과 가까워 지면 추가 영상 요청
- state에 keyword를 추가함( 검색 keyword는 Controller에 있고 추가 요청은 SearchedList컴포넌트에 있음 추가 요청시 Controller에 있는 keyword 정보가 필요함 이벤트 버스 및 props등으로 SearchedList컴포넌트에서 받아도 되지만 데이터 흐름의 일관성을 위해 vuex 사용)
- channel 정보를 햄버거 메뉴 안에 넣음 channel에 관한 playlist 보여주기, 삭제를 함수와 연결(기능 구현x)

18.06.26

- searchedList 채널 저장 및 비디오 체인지 기능 연결(구현x)
- channel 추가 및 삭제 기능 구현
- Channel 관련 기능들 모듈화 Channel 안에서 playlist, listitem, recent 등으로 나누어서 라우팅
- playlist의 데이터 요청 및 추가 요청 구현

18.06.27

- channel -> playlist route된 상태에서 playlist로 라우트 했을 때 playlist data reload가 안되는 문제 해결(router-view에 key값 부여)
- channel 관련 기능 완료
- Most Popular 기능 구현
- 필요없는 코드와 컴포넌트(SearchYoutube) 삭제 및 수정
- SearchedList -> YoutubeSearch로 이름 변경

18.06.28

- MyList 모듈 생성 및 기본 기능 구현
- Controller 색상 변경

18.06.29
-MyListBridge 아래에 MyList와 MyListItem으로 모듈화
-MyList 목록 생성 및 삭제 디자인 구현 MyListItem 불러오기 구현

18.07.05

- MyListBridge와 MyList에 존재하던 html 주석부분들 삭제
- MyList에 있던 +(목록추가) 버튼을 videoDataSave.saveFlag가 true일때만 활성화 하도록 설정 즉 모달과 함께 등장 이유: 비디오를 저장할 때 목록을 같이 생성하는게 더 나아보임 그리고 MyList에서 목록을 찾는데 불필요해 보임
- MostPopular, listitem, YoutubeSearch에 saveVideo() 추가하여 MyList에 저장할 수 있도록 구현

18.07.09

- snackbars 기능을 영상의 저장, 영상 재생, 영상 최소화, 영상 끄기, 다음 영상이 없을 때(nextPageToken) 등 사용
- axios에 async await을 한 이유: axios 앞부분 뒷부분에 SET_SNACKBAR를 통해 데이터를 불러오는 시간을 측정할 때 axios가 비동기적으로 이루어지기 때문에 await을 안하면 axios 앞뒷부분에 붙인 SET_SNACKBAR가 axios보다 먼저 실행되버림
- node에 boilerplate 설정(db url 등)

  18.07.10

- Channel과 MyList 생성, 삭제, 저장 등 localStorage 이용하던 부분 db와 연동
- 관련 컴포넌트끼리 같은 폴더에 정리해놓음
- socket을 이용한 controller와 mirror와의 통신 프로토타입 완성
- 검색, 채널, mostPopular등에서 실행 시킬 videoId들은 VIDEO_CHANGE를 통해 currentVideoId를 변경 시킨다. 이후 Controller에서 VIDEO_CHANGE를 관찰 속성을 통해 보고 있다가 바뀌면 server로 data를 보내고
  server는 해당 이벤트를 발생시켜 mirror로 data와 함께 설정된 이벤트를 발생시킨다.
- MyList에서 videoList를 보낸 후 mirror에서 선택된 순서부터 순차적으로 list를 실행

18.07.11

- ChannelListItem에서도 영상들을 mirror로 보낼 수 있는 기능 구현(Controller)
- youtube 마지막 영상 이후에 처음영상 부터 실행(mirror)
- Youtube 영상 끄기 최소화 기능 구현(Controller && mirror)

18.07.12

- Channel, MyList 관련 컴포넌트 필요없는 기능과 주석들 삭제 및 설명주석 추가

18.07.17

- Controller에 있던 추가적인 Component들을 SubComponent로 이동시킴(snackbar, dialog, bottomSheet(이번에추가))
- bottomSheet에 기본적인 ui 추가
- vue-youtube-embed module 사용범위 확인(youtube 영상 조작을 거의 전부다 가능(품질, 자막 영상 앞,뒤로 몇초 등등))

18.07.18

- BottomSheet 부분만 따로 VideoController component로 분리시킴
- list에 추가할 ui들 적용(미완성)

18.07.19

- Settings에서 품질, 자막, 영상 토글, 볼륨 조절 UI 끝
- mirror에서 데이터 가공하여 필요한 데이터 Controller로 전송(이벤트 등록 및 함수 구현)
- Controller에서 전달받은 mirrorVideoData를 바탕으로 VideoController 리스트 작성
- 품질 조작 함수 구현(mirror, controller)

18.07.23

- VIDEO pause, play, 10초 앞으로, 10초 뒤로 기능 추가
- VideoController UI 변경
- 영상에 대한 싱크로율 맞추는 작업 거의 완성

18.07.24
-Video 영상 시간 싱크 맞춰주기 영상의 어느 한지점부터 틀기 기능 추가(slider 어느 한부분을 누르면 mirror의 video도 동기화됌)

- Controller 페이지가 초기화 되더라도 mirror에서 현재 진행중인 영상 정보들을 받아와서 컨트롤 할 수 있게 설정
- 영상 숨기기 기능 구현, 소리 조절 기능 구현

18.07.27

- Video 영상 끄기 기능 추가 및 리펙토링
- 오류 수정(영상이 없을 때 pause후 play를 누르면 setInterval설정되던 오류);

18.08.01

- 중복되는 코드들 mixin을 이용하여 제거(코드 간결화)
- ScrollHeight 관련 mixin 추가
- saveVideo 함수 mixin으로 이동

문제사항

- setPlaybackQuality가 적용되지 않음 현재 이용하는 모듈도 YTPlayer를 wrapping 해서 사용하는 것 같아서 모듈의 문제가 아니라 youtube에서 제공해주는 API 문제인듯 함 (google에서도 이슈가 되고 있는 문제)
- https://developers.google.com/youtube/youtube_player_demo youtube api에서도 지원을 안함(loadVideoById(선택한 옵션으로 플레이어 업데이트)로 다시 영상을 시작할때 품질을 설정해도 그대로임.)

18.09.05

- VideoController에서 slider 클릭 되지 않던 문제 해결
- 필요없는 코드 및 파일들 삭제

추가예정사항

- README.md, README_ENG.md 수정
- dist 삭제하고 올리기

18.10.05

- 컴포넌트 전반적으로 함수 및 데이타 관련 주석 추가

18.10.10

- 보안 문제에 의해서 atom, macaddress, randomatic, url-parse를 최신 버전으로 업데이트
- **Event Delegation(이벤트 위임)** 적용
  하위 요소에 적용되어 있는 click event들(changeYoutube, saveVideo)를 클릭된 요소의 className으로 구별하여 각각에 맞는 함수실행
  관리자 함수 containerClick추가하여 클릭된 요소 구별 및 데이터 초기화 후 기능에 맞게 분기화
- 불필요한 console.log 삭제
- youtube-card를 가진 class 찾는 기능을 mixin으로 따로 분리 FindYoutubeCardClass.js
- MostPopular에 위 3개 적용

  18.10.21

- action.js에 주석 추가
- action.js 에서 async 설정을 하였음에도 Promise를 사용하던 문법 수정
- action.js에서 Promise를 사용하여 구문이 깔끔한 경우 그대로 유지

19.05.28

- Calendar Design 추가(TimeLineCalendar.vue)
- Mobile Page에서 google Calendar data 가져오기 성공 오늘 및 3일후 까지(ISO format변경시 timezone이 US로 변하는 듯 함 따라서 실제 한국시간과 시간의 차이가 생김 그래서 timeMax를 여유롭게 3일후로 잡음)

19.06.02

- Mobile Page에서 오늘 내일 날짜 분류하여 가공된 데이터 만들어주기 완성
- Mobile Page에서 동기화 작업
- Mirror Page에서 데이터 받아서 표시해주기

19.06.06

- 할 일 없으면 캘린더 표시 x
- am-pm 구분시켜주면 좋을 것

19.06.07

- node.js gpio 컨트롤 테스트 완료

19.07.01

- Lamp Controller(bottomsheet) 구현 및 이벤트 전송 확인

추가예정사항

- googleCalendar 계정 선택(로그인, 로그아웃 포함)

19.10.19

- google api 문제 발생 고치는 과정에서 api key 전부를 삭제 후 다시 생성함 google calendar에서 문제 발생 시 apikey확인
- 여전허 youtube api 해결되지 않음

20.05.13

- findDust, youtube api 새로 연결시켜줌

20.05.21

- 유튜브 컨트롤러에서 영상끄기 하면 bottomsheet(YoutubeSheet)도 같이 내리기
- google calendar iframe 추가
- google calenar api 호출해서 쓰던 TimeLineCalendar.vue 관련 코드 정리

20.05.22
-VideoController, MoodLightController 두 개 동시에 띄워지지 않도록 수정(VideoController켜져 있을 때 MoodLightController를 킬려고 하면 VideoController가 꺼짐)

21.05.12

- api 변경 및 URL 수정
