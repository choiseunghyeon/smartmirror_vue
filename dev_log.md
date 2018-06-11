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
  - front-end에서 기기에 따라 url 리다이렉트 달리함 -> mobile은 controller url로 아니면 mirror url로 보냄
  - front-end components안에서 folder를 만들어 controller와 mirror 부분 구분
  - VueSocketio 사용
