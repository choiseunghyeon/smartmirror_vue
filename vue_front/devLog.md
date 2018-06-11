

- components
  - Clock.vue: 년, 월, 일, 요일, 시간(AM, PM기준) 표시. 5초마다 setInterval. 독립적으로 실행
  - Weather.Vue:  오늘, 내일의 최고 온도 및 최저 온도를 표시 날씨의 상태는 간단한 이미지로 표시. 독립적으로 실행
  - Main.vue: Clock, Weather, SearchYoutube, YoutubeController를 관리하고 레이아웃을 담당한 컴포넌트
  - SearchYoutube.vue : 채널정보를 가지고 있음. SearchedList, PlayList 컴포넌트를 하위 컴포넌트로 가지며 관리함.
  - SearchedList.vue: SearchYoutube를 상위 컴포넌트로 가지며 검색된 유튜브 영상들을 표현해줌
  - PlayList.vue: SearchYoutube를 상위 컴포넌트로 가지며 채널 클릭시 채널이 가진 재생목록을 보여주며 한 재생목록 클릭시 재생목록이 가진 영상들을 보여줌
  - YoutubeController: PlayList에서 선택된 영상일 경우 그 영상이 포함된 재생목록을 리스트로 가짐 또한 선택된 영상을 틀어주는 역할
  - FineDust: 미세먼지 관련 api호출 및 설정
  - MyList: 유튜브 영상을 나만의 리스트에 저장  독립적으로 실행

-store
  actions.js index.js mutation.js state.js를 가짐 각 모듈 파일들에 역할을 분리하여 사용하도록 노력함
  actions.js: 비동기 함수(axios)를 통한 데이터 요청 및 mutation에 상태 변이 요청
  mutations.js: 요청된 값에 따라 state(상태) 변이
  state.js: 공통적으로 쓰이는 상태들을 가지고 있음
  index.js: 위의 모듈들을 한데 모아 선언

- api
  AxiosAPI.js: axios함수 한군데 모음
  ForAction: data 구조 변경 ex -> array to object 기타 action에서 쓰는 함수들

- etc
  ConfigUrl.js: api의 공통적인 URL을 기반으로 api에 필요한 추가 url을 더함
  Constant.js: actions, mutation.js에서 쓰이는 변수의 이름을 선언

about Youtube
- https://www.googleapis.com/youtube/v3/videos?part=statistics&id=GZqZyrFfXw0&key=+"api.key"
// 조회수 및 좋아요 수 등의 정보를 얻을 수 있음

- https://www.googleapis.com/youtube/v3/search?part=snippet&q=윤루트&maxResults=9&order=viewCount&key=+"api.key"
// 검색 기능

- https://www.googleapis.com/youtube/v3/playlists?part=snippet&channelId=UCmJ4DkPFPzjR2TkJ7lXSQWw&maxResults=6&key=+"api.key"
// 채널 정보를 넣으면 해당 채널의 플레이 리스트(재생 목록)을 출력해줌

- https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=PLVXsWLG72QDaeAKIbvC1zKdxkueUWEhWr&key=+"api.key"
// 재생 목록의 한 id를 넣으면 해당 목록이 가지고 있는 영상들을 출력해줌

//https://developers.google.com/youtube/v3/docs/videos/list?hl=ko#try-it

npm i -S vue-youtube-embed
https://github.com/kaorun343/vue-youtube-embed
npm install --save axios

https://developers.google.com/youtube/v3/docs/playlistItems/list?hl=ko // youtube api document
기능
18.02.08
 - youtube
  playlist 기능
    채널ID만 가져오면 그것에 대한 리스트를 보여준다.
    이후 리스트 선택시 해당 리스트가 가지고 있는 동영상 목록을 순차적으로 실행해줌.
    채널ID는 https://www.youtube.com/channel/UCXZq5Eq3HBQIWroWpck-Z9Q?view_as=subscriber 이런 url에서 channel뒤쪽에 있는 UCXZq5Eq3HBQIWroWpck-Z9Q이 부분이 채널 id가 된다.
    youtube creator를 들어가도 해당 채널을 알 수 있음
    - 검색 시 채널도 같이 뜨도록 설정
    - 채널 추가기능 추가
    - 채널의 플레이 리스트 가져오기 추가
    - 플레이 리스트의 영상들을 가져와 자동 실행 및 영상 종료 시 다음 영상 자동재생 추가
    - vuex 추가 결정 ㅠㅠ (규모가 너무 큼)
  search 기능
    검색해서 원하는 동영상 시청 가능

18.02.09
페이지 리프레쉬 시 사라지는 state 데이터(채널정보만)를 localStorage에 저장하여 영구저장 시킴
채널 등록 및 삭제 기능추가(localStorage 이용)
채널에 대한 플레이 리스트를 보여주면서 각 플레이 리스트의 영상 5개를 이미지를 동시에 보여줌
여기서 영상 선택시 영상이 속한 플레이 리스트의 영상들이 자동 VIDEO_LIST에 저장
이후 순차적으로 보여줌

사용가능 명령어
- 검색 // search창 띄워줌
  - 1번~5번 // 유튜브 영상 및 채널 리스트 중 선택 영상 일시 바로 재생 채널일시 채널 목록에 추가
- 채널 목록 // 채널 목록 보여줌
  - n번 삭제 // n번째 채널 삭제
  - 1번 ~ n번 // 해당 채널의 플레이리스트 보여줌과 동시에 각 플레이 리스트의 영상 이미지 5개 미리보여줌
  // 플레이리스트 선택시 해당하는 이미지 보여줌
    -1번 ~ 5번 // 해당 영상을 틀어주며 해당 영상이 속해 있는 플레이 리스트 자동으로 순차 재생 3번을 눌렀다면 3번다음 4번이 순차 진행

- 노래만, 음성만 or etc.. // 유튜브 영상 최소화 시켜줌
- 다음거, 다음 영상, 바꿔줘 or etc.. // 플레이리스트에서 선택된 영상 중 다음 영상을 보여줌

18.03.07
음성인식 대신 스마트폰으로 스마트미러를 조작하기로 결정함.
현재 스마트미러 기능
  날씨: 오늘, 내일을 알려주며 최소, 최대 온도 알려줌
  시간: 년, 월, 일, 요일, 시간(AM,PM)
  유튜브:  
        - 영상
          영상 검색(유튜브 홈페이지에서 검색하는 것과 비슷한 결과를 줌),
          영상 재생 및 멈춤, 시작, 최소화(음성만 출력), 크기
          영상 바꾸기(videoList에 있는 것들을 순환함)
        - 채널
          선택된 채널들 출력
          채널 구독 및 삭제
          채널의 플레이리스트 출력 및 재생

햄버거(컨트롤러)를 만들어 모바일로 컨트롤 할 수 있도록 조정

깔끔한 디스플레이를 위해 토글 형태로 각 기능을 보여주고 없애기 편하게 만듬
이 과정에서 isActive를 각 컴포넌트에서 사용했으나 다른 컴포넌트의 isActive를 조절해야 하는 경우가 생겨서 이 변수를 vuex에서 통합적으로 관리하기로 함

18.03.08
스마트폰으로 스마트미러를 조작하지만 또 다른 편리한 레이아웃을 적용할 수 없음(스마트폰에서 스마트미러에 원격 접속하여 사용하기 때문에)
따라서 작은 화면에서의 조작을 용이하게 하기 위해 검색이나 리스트를 보는 상황에서 다른 레이아웃을 꺼버리도록 수정.

 - 검색 시 widget 및 유튜브 display none으로 처리
 - YoutubeController의 isActive를 vuex로 통합( 다른 컴포넌트에서 조작해야 하기 때문에 )

* 위 내용을 적용하려 했으나 간단하게 modal을 띄움으로 써 스마트폰으로 조작하기 쉽게 하려고 함
modal에는 검색시 나오는 결과물이 들어가고 추후 캐러셀 또는 slider로 넘길 때마다 추가적인 데이터를 가져오려 함
구독 중인 채널 클릭시 나오는 플레이리스트들 또한 modal에서 보여줄 예정

18.03.09
유튜브 관련 기능을 강화하기로 결정
 - 현재 ui에는 모달에서 6개의 유튜브 검색결과를 보여준다(조회수가 높은 순서대로)
   여기서 다음 6개의 결과를 추가적으로 계속 가져오도록 만들 계획(nextPageToken을 이용가능(youtube api))
   nexpage or prevPage ui는 캐러셀로 할 예정
 - 일부 디자인 변경
 - 검색된 유튜브 리스트의 데이터 구조를 carousel을 통해 데이터 가져오기 및 슬라이드에 용이하게 변경
   ex) [{item:[...],nextToken:''},{item:[...],nextToken:''}]
    prevToken은 이미 요청된 데이터는 지우지 않을 것이기 때문에 prevToken을 이용해서 새로 요청할 필요가 없다고 판단 지움
   searchedLists state를 지울 수 있는 함수 추가

18.03.12
컴포넌트의 크기가 커지고 있어서 이를 더 세분화 시켜서 나눌 계획이다.
따라서 SearchYoutube.vue와 PlayList.vue를 추가하여 나눌 계획
MODAL_SEARCHED_YOUTUBE_LIST -> MODAL_ACTIVE로 변경
그리고 TOGGLE방식에서 state.text =!state.text에서 state.text = true or false로 변경함 더욱 직관적으로 쓰기 위함
SearchYoutube.vue를 매니징 컴포넌트로 변경함 이 밑에 컴포넌트를 두어 검색되는 유튜브 리스트와 플레이 리스트를 분리함
 - 유튜브 추가 데이터 요청의 조건을 스크롤이 맨 밑에일 경우로 변경
   데이터가 updated 될 때마다 scroll의 크기를 구하고 이 scroll이 bottom을 찍었을 때 추가적으로 데이터 요청

수정 예정 사항
 지금은 각 playlist가 가지고 있는 youtube 영상 또한 출력해 주었으나 다양한 palyList를 보여주고(스크롤을 통해 추가적인 데이터 요청 가능) 이후 선택하여 해당 playlist의 youtubelist를 가져올 수 있도록 이 youtubelist또한 스크롤을 통해 추가 데이터 요청 가능

18.03.13

PlayList가 가지고 있는 items 갯수 구하기 1개만 있는 playlist를 눌렀을 때 허무할 수 있으니..

수정 예정 사항
  재생목록 하나가 가지고 있는 items 값 구해서 넣어주기, 디자인 꾸미기 재생목록 눌렀을 때 items list 띄워주기
18.03.14

재생목록 클릭 시 보여주는 영상들에 대한 기능 추가
 - 스크롤이 바닥을 찍으면 새로운 데이터 요청
 - 다른 재생목록을 원할 경우 상단의 버튼을 통해 데이터 요청 없이 재생목록 리스트에 접근 가능 재생목록 리스트에서도 선택된 영상 리스트에 대해 바로 접근 가능
 - 영상 리스트 에서 영상 클릭시 지금까지 보여준 영상들을 Array로 만들고 클릭 된 영상부터 실행을 시킴

수정 예정 사항
  재생목록이 가지고 있는 영상 갯수 알아내기, ajax를 axios로 다 바꾸기

18.03.15
  ajax를 axios로 변경 완료 및 코드 모듈화와 간소화
 * 코드 실행이 비동기로 인해 A실행 이후 B실행이 일어나야 하는 구간에서 A가 끝나지 않았을 때 B가 실행되어 정확한 B에 정확한 값이 들어가지 않는 문제 발생 async/await을 이용해 동기화 방식으로 문제를 해결할 계획

 수정 예정 사항
 svg 색깔 변경하기, 디자인 변경
  - svg 색깔 변경 완료
  - 구독중인 채널 보기 in-out 트랜지션 변경 완료

  추가 예정 사항
    애니메이션을 채널 추가 및 삭제 모달에 추가
    more 함수들이 잘 실행 되지만 scrollHeight의 값은 다름.. 콘솔에서 확인해보면 맞긴함 확인해야함..

18.03.16
 Modal TOGGLE을 통해 재생목록과 선택된 재생목록 아이템들의 리스트를 오가는 트랜지션을 구현했다. 다만 문제는 트랜지션 과정중에 updated이 적용되어 정확한 scrollHeight가 구해지지 않음.


18.03.19
트랜지션이 완전히 이루어진 after-enter class에서 scrollHeight를 한번더 구하게 하였다. 이렇게 하여
트랜지션이 일어난 후에 scroll Height를 구하고 데이터 요청후에 updated된 상황에서도 scroll Height를 구한다.

구독중인 채널에 대한 transition 구현 추가 및 삭제 기능 단 삭제는 오류가 있음.

18.03.20
토글시 어떤 플레이 리스트를 선택했는지 몰라서 불편함 따라서
플레이 리스트 선택시 토글의 메시지를 변경하여 어떤게 선택되었는지 표시해줌 ex) MOVE - 흑역사
선택되지 않을시 MOVE - X로 표시
Page Loading 추가

- 계획
  상단 맨위의 바에다가 page loading을 추가함 하지만 스크롤을 내리면 상단 바가 안보여 page loading중인지 확인 불가능
  따라서 스크롤이 내려가면 상단 바를 fixed하며 같이 내려가도록 할 계획 이로 인해 모달을 끄고 리스트 아이템 또는 플레이리스트로 이동 또한 편리하게 할 계획

18.03.22
  03.20일 계획한 부분 수정 완료
  Weather.vue 에서 test용 json을 가지고 표현 했지만 실제 서버에서 요청하여 돌려받은 json을 쓰도록 변경

18.04.09
  FineDust component추가 및 기능 구현
  Weather에서 쓰는 api가 변경되어 url변경이 이루어져야함

18.04.20
  Weather api 교체 및 구현
  크기 변경 및 기타 오류 해결
  css 일부분 변경 및 모듈화
  youtube 크기 변경 및 햄버거메뉴에 위젯을 없애고 유튜브(삭제)기능을 만듬
  햄버거에는 유튜브(최소화)-음악감상용, 유튜브(제거) 영상 삭제를 구현했다
  README 햄버거메뉴 추가
  button toggle 추가해서 구독중인 채널 보기, 유튜브 숨기기, 위젯 기능의 온 오프 기능을 알아보기 쉽게 구현
  toggle-button tag와 li tag 둘중 어느거를 선택해도 toggle이 되도록 함

  문제점: 주 기능이 유튜브관련 기능인데 라즈베리파이3의 cpu가 안좋아서 유튜브가 실행이 잘 안된다 ㅠㅠ 480p가 한계인듯 하다.

  추가할점: youtube videoId를 파싱할때 title도 같이 파싱하면 추가할 기능이 많아질듯 이것들을 이용해 시각적인 videoList를 제공하거나 유튜브최소화 시에 어떤 유튜브가 실행중인지 알려줄 수도 있음

  추가하고 싶은 api: 버스 및 지하철 api
  추가하고 싶은 기능: 크롤링을 이용해 실시간으로 필요한 정보들을 알려주는 시스템(핸드폰 푸쉬 알림처럼 광고 대신 내가 원하는 정보를 알려줌!!)

18.04.23
 수정사항
  youtube api 요청 갯수 9 -> 6개로 수정
  scroll bar 생성(palylist, listitem, youtube-list)

  문제해결:
    라즈베리파이의 gpu에 할당량을 늘려서 youtube가 720p까지 실행 가능

  문제점:
    스크롤은 생성 되었으나 내릴 때 여러번 요청하게 됨
    pageToken이 이전과 같으면 요청을 무시하는 등의 해결방안 필요

18.04.24
  문제해결:
    스크롤을 내릴 때 여러번 요청하던 문제는 스크롤 길이가 충분히 길지 않아 바닥을 찍었을 때 반복적으로 바닥을 찍는 행위를 하였으나 스크롤 길이를 10%가량 늘려 충분한 길이 확보를 함

  문제점:
    미세먼지의 단위가 p2일때는 좋음, 보통, 나쁨으로 나눌 수 있지만 다른 단위일 경우 판단한 자료가 없음 이에 대한 api정보를 숙지할 필요가 있음

  진행상황:
    airvisual에서 미세먼지 말고도 오존과 다른 정보를 현재 기본적으로 제공되는 api에서는 랜덤하게 제공해주는 듯함 즉 미세먼지만 가져올 수 없게됨 따라서 제공해주는거에 따라서 정보를 표시해주기로 함

    유튜브 호출시 화면에 뿌려주는 부분에서 속도 향상을 위해서 리펙토링 진행중

  수정사항:
    listitems에서 재생목록을 만들떄의 속도를 개선

  수정예정사항:
    - 유튜브 검색을 통한 기능은 정형화 할 수 없지만
    구독중인 채널의 플레이리스트나 리스트아이템 같은경우( 업데이트 되었다면 따로 추가 요청을 해야하지만) 재요청의 가능성이 높고 cache기능을 만들 시 효율이 증대됨을 기대할 수 있다.
    - 비디오 저장기능을 만들어서 나만의 custom video array를 만들어도 좋을듯 (local에 저장)
    비디오 저장기능 flow = 유튜브 검색 또는 listitems에서 저장을 클릭 하면 mini MyList의 재생목록을 보여줌 저장할 목록이 없으면 생성도 할 수 있게끔

18.04.25
  진행상황: MyList의 기능 구현중
    MyList(폴더 또는 여기서의 playlist와 같은 개념) 생성, 삭제, 중복 제거, 이미지 설정 완료
    MyListItmes(파일들 또는 여기서의 listItems와 같은 개념) 생성, 삭제, 재생 완료
    youtubeSearch를 통한 또는 구독중인 채널에서의 영상을 MyList에 저장할 수 있음
    MyList와 MyListItmes 각각으로의 이동 구현
    영상을 저장할 때 MyList component의 크기 조율

  수정사항: 기능을 빠르게 구현하기 위해 단시간에 만들어냄 따라서 MyList 리펙토링 할 부분이 있으면 리펙토링 하기.

18.04.26
  수정예정사항:
    - 영상을 추가 하고 나의 목록을 누를경우 마다 MyList component를 만들게 된다. 하지만 이 기능은 실제로 쓰일 가능성이 많아보이기 때문에 필요할때 마다 새로 만드는게 아니라 토글방식으로 디스플레이만 끄고 키게끔으로 수정하기
    - 리펙토링하기

  진행상황:
    MyList component는 항상 실행된 상태이며 display 토글을 통해서 화면에 보여줌과 사라짐만 조절 하도록 함
    mylist생성할 때의 애니메이션 추가


18.05.29
  수정사항:
   - muation.js 및 actions.js와 Constant.js 에서 VIDEO_DATA_SAVE제외 MyList 관련된 부분 삭제(안쓰는 코드들임)

18.05.31
  수정사항:
    - .number_box 를 width 값이 변해도 고정된 위치에 있도록 변경

  예정사항:
    - 한글버전, 영어버전용 따로 만들기 현재 햄버거메뉴 및 기타 설명이 한글로만 되어 있음
