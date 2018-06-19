<template>
      <router-view/>
</template>

<script>
export default {
  name: 'App',
  beforeCreate: function(){ // 모바일로 키면 controller로 이동
    console.log('good');
    let checkMobile = false;
    if( navigator.userAgent.match(/Android/i)
        || navigator.userAgent.match(/webOS/i)
        || navigator.userAgent.match(/iPhone/i)
        || navigator.userAgent.match(/iPad/i)
        || navigator.userAgent.match(/iPod/i)
        || navigator.userAgent.match(/BlackBerry/i)
        || navigator.userAgent.match(/Windows Phone/i) ) { checkMobile = true };

    if(checkMobile == true) // mobile일 경우 자동으로 controller 페이지 보여줌
      this.$router.push('/controller');


  },
}
</script>
