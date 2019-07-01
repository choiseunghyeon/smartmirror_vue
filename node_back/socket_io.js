let socketio = require('socket.io');
//let gpio = require('./lamp.js');

module.exports = {

  // Socket.io
  socketInit: function(server){
    let io = socketio.listen(server);
    console.log('socket.io 요청을 받아들일 준비가 되었습니다.');

    io.sockets.on('connection', function(socket){
      console.log('connection info : ', socket.request.connection._peername);
      socket.remoteAddress = socket.request.connection._peername.address;
      socket.remotePort = socket.request.connection._peername.port;

      // VIDEO
      socket.on('changeVideo', function(videoId){
        console.log('changeVideo 이벤트를 받았습니다.', videoId);
        io.sockets.emit('changeVideo',videoId);
      });
      socket.on('changeVideoList', function(objData){
        console.log('changeVideoList 이벤트를 받았습니다.', objData);
        io.sockets.emit('changeVideoList',objData);
      });

      // CONTROLLER
      socket.on('pauseOrPlay', function(data){
        console.log('pauseOrPlay 이벤트를 받았습니다.');
        io.sockets.emit('pauseOrPlay',data);
      });
      socket.on('playAt', function(seconds){
        console.log('playAt 이벤트를 받았습니다.', seconds);
        io.sockets.emit('playAt',seconds);
      });
      socket.on('forward', function(){
        console.log('forward 이벤트를 받았습니다.');
        io.sockets.emit('forward');
      });
      socket.on('rewind', function(){
        console.log('rewind 이벤트를 받았습니다.');
        io.sockets.emit('rewind');
      });
      socket.on('syncVideoTime', function(seconds){
        console.log('syncVideoTime 이벤트를 받았습니다.');
        io.sockets.emit('syncVideoTime',seconds);
      });
      socket.on('videoVolume', function(volume){
        console.log('videoVolume 이벤트를 받았습니다.');
        io.sockets.emit('videoVolume',volume);
      });
      socket.on('getVideoInfo', function(videoInfo){
        console.log('getVideoInfo 이벤트를 받았습니다.');
        io.sockets.emit('getVideoInfo',videoInfo);
      });
      socket.on('toggleYoutube', function(){
        console.log('toggleYoutube 이벤트를 받았습니다.');
        io.sockets.emit('toggleYoutube');
      });
      socket.on('removeYoutube', function(){
        console.log('removeYoutube 이벤트를 받았습니다.');
        io.sockets.emit('removeYoutube');
      });
      socket.on('syncInfo', function(){
        console.log('syncInfo 이벤트를 받았습니다.');
        io.sockets.emit('syncInfo');
      });
      socket.on('changeQuality', function(quality){
        console.log('changeQuality 이벤트를 받았습니다.');
        io.sockets.emit('changeQuality',quality);
      });
      socket.on('syncCalendar', function(items){
        console.log('syncCalendar 이벤트를 받았습니다.');
        io.sockets.emit('syncCalendar',items);
      });
      socket.on('changeMoodLightState', function(flag){
        console.log('changeMoodLightState 이벤트를 받았습니다.');
        console.log(flag);
        // flag가 1이면 전등 off 0이면 전등 on
        //gpio.lamp(flag);


      });
    });
  } // the end of socketInit
}
