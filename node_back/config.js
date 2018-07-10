
/*
REST API 설계
POST 생성, GET 조회, DELETE 삭제, PUT 업데이트에 근거하여 각 기능을 구현

 */

module.exports = {
	server_port: 3000,
	db_url: 'mongodb://localhost:27017/local',
	db_schemas: [
		{file:'./channel_schema', collection:'channel', schemaName:'ChannelSchema', modelName:'ChannelModel'},
		{file:'./myList_schema', collection:'mylist', schemaName:'MyListSchema', modelName:'MyListModel'},

	],
	route_info: [
	    //===== GET 조회 =====//
			{ url:'/', method:'mirror', type:'get'}, // vue 파일 주기
			{ url:'/channel', method:'channel', type:'get'}, // Channel 정보 가져오기
			{ url:'/mylist', method:'mylist', type:'get'}, // MyList 정보 가져오기
			// // ===== POST 생성 ===== //
			{ url:'/channel', method:'channel', type:'post'}, // Channel 정보 등록
			{ url:'/mylist', method:'mylist', type:'post'}, // MyList 정보 등록


			//
			//
			// // ===== PUT 업데이트 ===== //
			{ url:'/mylist', method:'mylist', type:'put'}, // MyList 정보 업데이트

			//
			//
			// // ===== DELETE 삭제 ===== //
			{ url:'/channel', method:'channel', type:'delete'}, // Channel 정보 삭제
			{ url:'/mylist', method:'mylist', type:'delete'}, // MyList 정보 삭제

	]
}
