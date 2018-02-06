<template lang="html">
  <div class="row">
    <input id="search_keword" type="text" name="" value="">
    <ul id="youtube-list" class="col-md-4">
      <li v-for="(data,i) in lists" @click.stop="changeYoutube(data.id.videoId)">
        <span>Number {{i+1}}</span>
        <figure>
          <img :src="data.snippet.thumbnails.medium.url" value="data.id.videoId"><figcaption>{{data.snippet.title}}</figcaption>
        </figure>
      </li>
    </ul>
  </div>
</template>

<script>
import eventBus from './EventBus.vue'

export default {
  name:"SearchYoutube",
  data: function(){
    return {lists:''}
  },
  mounted: function(){
    this.init();
  },
  methods: {
    init: function(){
      let that = this;
      console.log('dd');
      //검색
      $("#search_keword").on("blur",function(){
        console.log("called search_keword");
        var keword = $("#search_keword").val();
        var api_url="https://www.googleapis.com/youtube/v3/search?part=snippet&q="+keword+"&maxResults=5&type=video&order=viewCount&key=AIzaSyDbGX5NSwM_KgBNJA7_GMWiavb9Bfmml3o"
        // video중 조회수가 제일 높은 것 상위 5개의 list를 가져옴
        console.log(api_url);

        $.ajax({
            url: api_url,
            type: 'get',
            dataType: 'json',
            success:function(data){

              console.log(data);
              console.log(data.items);
              console.log(data.items[0].snippet.title);
              that.lists=data.items;

            }
        })

      })
      // 검색 끝

      // 동영상 정보 가져오기
      $(document).on("click","#youtube-list img",function(){
        var video_id = $(this).attr("value");
        var video_div = '<div id="P1" class="player" data-property="{';
        var div_option =["videoURL:'http://youtu.be/",video_id+"'", "," , "containment:'#youtube-video'",  ","  ,"stopMovieOnBlur:false", "," ,"startAt:0", "," ,"opacity:1"]
        for (var i = 0; i < div_option.length; i++) {
          video_div+=div_option[i];
        }
        video_div+='}"></div>'
        console.log(video_div);
        $("#youtube-list").empty();
        $("#youtube-video").html(video_div);
        $("#P1").YTPlayer();
      })
      //동영상 정보 끝

    },
    changeYoutube: function(data){
      console.log('good youtube');
      this.removeList();
      eventBus.$emit('changeVideo',data);
    },
    removeList: function(){
      this.lists='';
    }
  }
}
</script>

<style lang="css">
</style>
