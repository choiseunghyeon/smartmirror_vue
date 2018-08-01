export default {
  mounted: function(){
    console.log("mixin mounted!!");
    this.scrollHeight = document.body.scrollHeight - 100; // 바닥을 찍고 데이터를 요청하면 늦어져서 100px 정도 조절함

  },
  updated: function(){ // 데이터가 변경되면 scroll의 길이를 구함
    console.log("mixin updated!!");
    this.scrollHeight = document.body.scrollHeight - 100 //- searchContainer.clientHeight;
  },
  data: function(){
    return {scrollHeight: 0};
  },
}
