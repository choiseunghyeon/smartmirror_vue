let route_loader = {};
let config = require('../config');
let module_get = require('./get');
let module_post = require('./post');
let module_delete = require('./delete');
let module_put = require('./put');

route_loader.init = (app, router) => {
  console.log('route_loader.init 호출됨.');
  return initRoutes(app, router);
}

//route_info에 정의된 라우팅 정보 처리

const initRoutes = (app, router) => {
  let infoLen = config.route_info.length;
  console.log('설정에 정의된 라우팅 모듈의 수 : %d', infoLen);

  for(let i=0; i<infoLen;i++){
    let curItem = config.route_info[i];


    //라우팅 처리
    if(curItem.type == 'get')
      router.route(curItem.url).get(module_get[curItem.method]);
    else if(curItem.type == 'post')
      router.route(curItem.url).post(module_post[curItem.method]);
    else if(curItem.type =='put')
      router.route(curItem.url).put(module_put[curItem.method]);
    else
      router.route(curItem.url).delete(module_delete[curItem.method]);

    console.log('라우팅 모듈 [%s]이(가) 설정됨.', curItem.method);
  }

  app.use('/',router);
}

module.exports = route_loader;
