
let mongoose = require('mongoose');

let database = {};

database.init = (app, config) => {
	console.log('init() 호출됨.');

	connect(app, config);
}

//데이터베이스에 연결하고 응답 객체의 속성으로 db 객체 추가
function connect(app, config){
	console.log('connect() 호출됨.');

	//데이터베이스 연결 : config의 설정 사용
	mongoose.Promise = global.Promise;  // mongoose의 Promise 객체는 global의 Promise 객체 사용하도록 함
	mongoose.connect(config.db_url);
	database.db = mongoose.connection;

	database.db.on('error', console.error.bind(console, 'mongoose connection error.'));
	database.db.on('open', function () {
		console.log('데이터베이스에 연결되었습니다. : ' + config.db_url);

		// config에 등록된 스키마 및 모델 객체 생성
		createSchema(app, config);
	});
	database.db.on('disconnected', connect);
}

// config에 정의된 스키마 및 모델 객체 생성
function createSchema(app, config){
	let schemaLen = config.db_schemas.length;
	console.log('설정에 정의된 스키마의 수 : %d', schemaLen);

	for (var i = 0; i < schemaLen; i++) {
		let curItem = config.db_schemas[i];

		//모듈 파일에서 모듈 불러온 후 createSchema() 함수 호출하기
		let curSchema = require(curItem.file).createSchema(mongoose);
		console.log('%s 모듈을 불러들인 후 스키마 정의함.', curItem.file);

		let curModel = mongoose.model(curItem.collection, curSchema);
		console.log('%s 컬렉션을 위해 모델 정의함.', curItem.collection);

		// database 객체에 속성으로 추가
		database[curItem.schemaName] = curSchema;
		database[curItem.modelName] = curModel;
		console.log('스키마 이름 [%s], 모델 이름 [%s] 이 database 객체의 속성으로 추가됨.', curItem.schemaName, curItem.modelName);

	}
	app.set('database', database);
	console.log('database 객체가 app 객체의 속성으로 추가됨.');
}

// database 객체를 module.exports에 할당
module.exports = database;
