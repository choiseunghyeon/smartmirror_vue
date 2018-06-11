

let mysql = require('mysql');

// MySQL 데이터베이스 연결 설정
let pool = mysql.createPool({
	connectionLimit: 10,
	host: 'localhost',
	user: '',
	password:'',
	database: '',
	debug: false,
});

// 초기화를 위해 호출하는 함수
const init = () => {
	pool.on('acquire', function (connection) {
	  console.log('Connection %d acquired', connection.threadId);
	});
	pool.on('connection', function (connection) {
		console.log('connection flag');
  // connection.query('SET SESSION auto_increment_increment=1')
	});
	pool.on('enqueue', function () {
	  console.log('Waiting for available connection slot');
	});
	pool.on('release', function (connection) {
	  console.log('Connection %d released', connection.threadId);
	});

}
init();


module.exports = pool;
