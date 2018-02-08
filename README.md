# smartmirror_vue

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).


-- vue init webpack smartmirro_vue
-- npm install
-- npm install --save vuex
about Youtube
npm i -S vue-youtube-embed
https://github.com/kaorun343/vue-youtube-embed

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
