$(function(){
/* voice recognition */


// --------------- 유튜브
$("#youtube-video").draggable();

$("#resize_mouse").on("click",function(){
  $("#youtube-video").empty();
  if ($("#youtube-video").attr("class").search(/resizable/) > 0) {
    console.log("I'm n")
    $("#youtube-video").resizable("destroy");
  }

  $("#youtube-video").resizable();
})


ytwidth=800,ytheight=400
$("#size_up_voice").on("click",function(){
  $("#youtube-video").empty();
  ytwidth=ytwidth+100;
  ytheight=ytheight+100;
  $("#youtube-video").css('width',ytwidth+'px').css('height',ytheight+'px');
  $(".mbYTP_wrapper,.YTPOverlay, #iframe_P1").css('min-width','100%').css('min-height','100%');
  $(".mb_YTPBar").css('min-width',$("#youtube-video").css("width"))
})
$("#size_down_voice").on("click",function(){
  $("#youtube-video").empty();
  ytwidth=ytwidth-100;
  ytheight=ytheight-100;
  $("#youtube-video").css('width',ytwidth+'px').css('height',ytheight+'px');
  $(".mbYTP_wrapper,.YTPOverlay, #iframe_P1").css('min-width','100%').css('min-height','100%');
  $(".mb_YTPBar").css('min-width',$("#youtube-video").css("width"))
})
music_flag="off"
$("#only_music").on("click",function(){
  if (music_flag == "off") {
    $("#youtube-video").css("display","none")
    music_flag="on";
  } else {
    $("#youtube-video").css("display","block")
    music_flag="off";
  }
  $("#turn_off_video").on("click",function(){
    $("youtube-video").empty();
  })
//  $("#controlBar_P1").css("display","block")
})
// 검색
$("#search_keword").on("blur",function(){

  var keword = $("#search_keword").val();
  var api_url="https://www.googleapis.com/youtube/v3/search?part=snippet&q="+keword+"&maxResults=5&type=video&order=viewCount&key=AIzaSyDbGX5NSwM_KgBNJA7_GMWiavb9Bfmml3o"
  // video중 조회수가 제일 높은 것 상위 5개의 list를 가져옴
  console.log(api_url);

  $.ajax({
      url: api_url,
      type: 'get',
      dataType: 'json',
      success:function(data){
        $("#youtube-search").empty();
        $("#youtube-video").empty();
        $("#youtube-search").html('<ul id="slide-banner"></ul>')
        console.log(data.items);
        console.log(data.items[0].snippet.title);
        for (var i = 0; i < data.pageInfo.resultsPerPage; i++) {
          var videoId=data.items[i].id.videoId;
          var title=data.items[i].snippet.title;
          var img_url=data.items[i].snippet.thumbnails.medium.url;
          $("#slide-banner").append('<li><span>Number '+(i+1)+'</span><figure><img src="'+img_url+'" value="'+videoId+'"><figcaption>'+title+'</figcaption></figure></li>');
        }
        var slider = $("#slide-banner").bxSlider({
          mode:"vertical",
          speed:500,
          pager: false,
          moveSlides:1,
          minSlides:3,
          maxSlides:3,
          slideWidth: 300,
          slideMargin: 30,
          auto: true,
          controls:false,
        });
        $(".bx-controls, .bx-viewport").trigger('create');
      }
  })

})

// 동영상 정보 가져오기
$(document).on("click","#youtube-search img",function(){
  var video_id = $(this).attr("value");
  var video_div = '<div id="P1" class="player" data-property="{';
  var div_option =["videoURL:'http://youtu.be/",video_id+"'", "," , "containment:'#youtube-video'",  ","  ,"stopMovieOnBlur:false", "," ,"startAt:0", "," ,"opacity:1"]
  for (var i = 0; i < div_option.length; i++) {
    video_div+=div_option[i];
  }
  video_div+='}"></div>'
  console.log(video_div);
  $("#youtube-search").empty();
  $("#youtube-video").html(video_div);
  $("#P1").YTPlayer();
})

var ss_flag="off"
$("#stop_start").on("click",function(){
  if (ss_flag == "off") {
    $("#P1").YTPPause();
    ss_flag="on";
  } else {
    $("#P1").YTPPlay();
    ss_flag="off";
  }
})
$("#volume").on("click",function(){
  $("#P1").YTPSetVolume(30);
})
$("#stop").on("click",function(){
  $(".ytp-play-button ytp-button").click();
})


  $("#widget").draggable().css("border","none");

var svgChange = function(){
  console.log('good');
  let a = document.getElementById('weather_object');
  console.log(a);
  let svgDoc = a.contentDocument;
  console.log(svgDoc);
  /*
  let svgItem = svgDoc.getElementsByTagName('svg');
  svgItem[0].setAttribute("fill", "white");
  */
}
console.log("fetched home.js");
}) // end -------------------------

//------------------------- 캘린더
/*
var csrftoken=$("[name=csrfmiddlewaretoken]").val();

function csrfSafeMethod(method) {
// these HTTP methods do not require CSRF protection
return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
}

$("#create").on("click",function(){
$.ajax({
url:"/mirror/create/",
type: "get",
dataType:"html",
success:function(data){
$("#for_create").html(data);
$('#modal_register').modal('show');
}
})
})

$(document).on("submit","#create",function(event){
csrftoken=$("[name=csrfmiddlewaretoken]").val();
event.preventDefault();
send_create();
$("#register-close").click();
})

function send_create(){
form_data = {
title:$('#create input[name="title"]').val(),
start:$('#create input[name="start"]').val(),
end:$('#create input[name="end"]').val(),
}
$.ajax({
url:"/mirror/create/",
type:"POST",
dataType:"json",
data:form_data,
beforeSend: function(xhr, settings){
if(!csrfSafeMethod(settings.type) && !this.crossDomain){
xhr.setRequestHeader("X-CSRFToken",csrftoken);
}
},
success:function(json){
console.log(json.result);
calendar_start();
}
})
}
function calendar_start(){
var t = new Date();
var month = t.getMonth()+1
var address = "/mirror/"+t.getFullYear()+"/"+month+"/";
$.ajax({
url: address,
type: 'get',
dataType:'json',
success: function(json){
console.log(json.data);
console.log(json.year)
$("#calendar").fullCalendar('removeEvents');
$("#calendar").fullCalendar('addEventSource',json.data);

}
})
}
calendar_start();
$("#calendar").fullCalendar({
header: {
left: 'prev,next today',
center: 'title',
right: 'month,listMonth'
},
defaultDate: '2017-07-24',
lang: "ko",
defaultView:'month',
editable:true,
})
*/
