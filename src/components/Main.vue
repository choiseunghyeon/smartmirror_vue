<template>
<div class="">
  <div id="widget" class="container">
    <div class="row">
      <weather></weather>
    </div>
    <div class="row">
      <clock></clock>
    </div>
  </div>
  <search-youtube></search-youtube>
  <youtube-controller></youtube-controller>
</div>

</template>

<script>
import Clock from './Clock';
import Weather from './Weather';
import SearchYoutube from './SearchYoutube';
import YoutubeController from './YoutubeController';

export default {
  name: 'Main',
  components: {Clock,Weather,SearchYoutube,YoutubeController},
}
</script>
