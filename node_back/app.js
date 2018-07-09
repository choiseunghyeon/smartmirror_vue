
// Express 기본 모듈 불러오기
let express = require('express')
  , http = require('http')
  , path = require('path');

// Express의 미들웨어 불러오기
let bodyParser = require('body-parser')
  , cookieParser = require('cookie-parser')
  , static = require('serve-static')
  , cors = require('cors')
  , socketio = require('socket.io')

// 에러 핸들러 모듈 사용
let expressErrorHandler = require('express-error-handler');

// Session 미들웨어 불러오기
let expressSession = require('express-session');


// 모듈로 분리한 설정 파일 불러오기
let config = require('./config');

let database = require('./database/database');

// 모듈로 분리한 라우팅 파일 불러오기
let route_loader = require('./routes/route_loader');


// 익스프레스 객체 생성
let app = express();

app.set('port', process.env.PORT || 3000);


//CORS 설정
app.use(cors());

// body-parser를 이용해 application/x-www-form-urlencoded 파싱
app.use(bodyParser.urlencoded({ extended: false }))

// body-parser를 이용해 application/json 파싱
app.use(bodyParser.json())

// public 폴더를 static으로 오픈
app.use('/dist', static(path.join(__dirname, 'dist')));
console.log(path.join(__dirname, 'public'));
// cookie-parser 설정
app.use(cookieParser());

// 세션 설정
app.use(expressSession({
	secret:'bank',
	resave:true,
	saveUninitialized:true
}));

// 라우팅 정보를 읽어들여 라우팅 설정
route_loader.init(app, express.Router());


// 404 에러 페이지 처리
let errorHandler = expressErrorHandler({
 static: {
   '404': path.join(__dirname, 'public')+'/404.html'
 }
});

app.use( expressErrorHandler.httpError(404) );
app.use( errorHandler );


//===== 서버 시작 =====//

// 프로세스 종료 시에 데이터베이스 연결 해제
process.on('SIGTERM', function () {
    console.log("프로세스가 종료됩니다.");
    app.close();
});

app.on('close', function () {
	console.log("Express 서버 객체가 종료됩니다.");

});

// Express 서버 시작
let server = http.createServer(app).listen(app.get('port'), function(){
    console.log('서버가 시작되었습니다. 포트 : ' + app.get('port'));

    database.init(app, config);
});


// Socket.io
let io = socketio.listen(server);
console.log('socket.io 요청을 받아들일 준비가 되었습니다.');

io.sockets.on('connection', function(socket){
  console.log('connection info : ', socket.request.connection._peername);
  socket.remoteAddress = socket.request.connection._peername.address;
  socket.remotePort = socket.request.connection._peername.port;

  socket.on('message', function(message){
    console.log('message 이벤트를 받았습니다.', message);
    io.sockets.emit('message',message);
  });
});
