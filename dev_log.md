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

  추가 예정사항
  - 나의 목록 및 backend에 db 연결
  - snackbars(vuetify)를 이용하면 여러 인터랙션(영상 보기, 저장 등)을 이쁘게 할 수 있을 것 같다.
  - socket을 이용하여 data 보내주기 (유트브 검색하고 나의 목록 구독중 채널 모두 mobile에서 확인 유튜브 영상 data만 보내주기(data list도))
