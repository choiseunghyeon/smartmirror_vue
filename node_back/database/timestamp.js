let moment = require('moment');
moment.locale('ko');

module.exports = {
  now : () => {
    return moment().format('YYYY-MM-DD HH:mm:ss');
  }
}
