  개요
    - smartmirror의 편의성과 확장성을 위해 back-end(node.js)를 만들기로 결정 추후 smarthome으로 확장

  계획
    - node.js에 socket.io를 연결하여 controller(mobile phone)로 smartmirror를 제어하도록 설정
    - db를 만들어서 browser session storage에서 db로 옮기기
    - gpio를 이용해서 전등 연결하기(날씨에 따라 색상 조절)
    - controller(mobile phone)에 음성인식 기능을 지원하여 전등 on/off 조절  

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
  - searchedList router 띄워줌 (* scroll event가 안됨)

18.06.25
  - searchedList scroll issue 해결 및 스크롤이 바닥과 가까워 지면 추가 영상 요청
  - state에 keyword를 추가함( 검색 keyword는 Controller에 있고 추가 요청은 SearchedList컴포넌트에 있음 추가 요청시 Controller에 있는 keyword 정보가 필요함  이벤트 버스 및 props등으로 SearchedList컴포넌트에서 받아도 되지만 데이터 흐름의 일관성을 위해 vuex 사용)
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
  추가예정사항
  - setPlaybackQuality 파라미터가 맞으면 품질 조절 가능할 거 같음
  - Youtube 영상 관련 조작 제공(10초 앞,뒤 볼륨설정 등)
  - 배포준비(package.json에 필요없는 package삭제)_local이 아닌 외부ip로 접근하는 경우 login을 통한 사용자 식별 등
  - 코드 리펙토링 front_back
  - README.md, README_ENG.md 수정
