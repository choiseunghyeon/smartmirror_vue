<template>

<div id="widget" class="container">
  <div class="row">
    <weather></weather>
  </div>
  <div class="row">
    <clock></clock>
  </div>
</div>
</template>

<script>
import Clock from './Clock';
import Weather from './Weather';
export default {
  name: 'Main',
  components: {Clock,Weather},
  data: function() {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },

}
</script>
