export default {
  methods: {
    findYoutubeCardClass: function(path){
      let classKeyword = 'youtube-card'; //path에서 찾을 className 저장
      for (var i = 0; i < path.length; i++) {
        let currentVal = path[i]
        if(currentVal.className.indexOf(classKeyword) !== -1){ // 클릭된 요소에서 'youtube-card' class를 가지고 있는 상위 요소를 찾음
          return currentVal.getAttribute('value').split(' '); // 해당 요소가 가지고 있는 value 속성을 배열 잘라서 return
        }
      }
    },
  }
}
