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

  수정 예정사항
  - 전체적인 layout 맞춰 놓고 기능 추가하기
  - socket을 이용하여 data 보내주기 (유트브 검색하고 나의 목록 구독중 채널 모두 mobile에서 확인 유튜브 영상 data만 보내주기(data list도))
