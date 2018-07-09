
module.exports = {
  channel: (req, res) => {
      console.log(' POST channel');
      let db = req.app.get('database');
      let channel = new db.ChannelModel({"name":"버블디아","info":[1,2,3,4]});

      channel.save(function(err){
        if(err)
          return;

        console.log('channel 데이터 추가함.');

      });
      res.end();
  },

}
