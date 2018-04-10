# 기능 설명 - KOR

- 기본 기능

  마우스를 통해 위젯, 햄버거 메뉴, 채널 목록, 유튜브의 위치 조절 가능

- 날씨

 오늘, 내일의 최고 온도 및 최저 온도를 표시
 날씨의 상태는 간단한 이미지로 표시

- 시간

  년, 월, 일, 요일, 시간(AM, PM기준) 표시

- 미세먼지

  좋음, 보통, 나쁨, 매우나쁨으로 구분

- 유튜브
  - 검색 기능

    ㄱ. 검색어에 관한 영상들 리스트

    ㄴ. 스크롤이 바닥을 찍으면 추가 영상 보여줌

    ㄷ. 영상 클릭시 재생

    ㄹ. 채널 클릭시 채널 추가

  - 채널 추가 및 삭제 기능

    ㄱ. 채널 클릭시 채널이 가지고 있는 재생 목록 보여줌

  - 채널이 가지고 있는 재생 목록 리스트

    ㄱ. 목록 클릭시 목록이 가지고 있는 영상들의 리스트 출력

    ㄴ. 스크롤이 바닥을 찍으면 추가 목록 보여줌

    ㄷ. MOVE - (선택된 재생목록의 이름 없다면 X) 선택한 재생목록의 영상리스트로 이동

  - 재생 목록이 가지고 있는 영상들의 리스트

    ㄱ. 클릭시 현재까지 출력된 영상들을 리스트로 만들어 클릭된 영상부터 순차적으로 보여줌

    ㄴ. MOVE - PLAY LISTS 재생목록 리스트로 이동

API 설정
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


서버 설정 없음

데이터베이스 설정 없음
