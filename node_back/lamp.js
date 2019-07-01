//0이면 전등 off 1이면 전등 on
const LAMP_ON = 1;
const LAMP_OFF = 0;
let onoff = require('onoff');
let GPIO = onoff.GPIO;
let control = new GPIO(21, 'out');

module.exports = {
  lamp: function(flag){
    console.log('lamp function executed');
    if(flag)
      control.writeSync(LAMP_ON);
    else
      control.writeSync(LAMP_OFF);
  }

}
