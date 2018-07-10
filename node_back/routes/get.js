
module.exports = {
  mirror : function (req,res) {
    console.log('mirror');
    res.redirect('/dist/index.html');

  },
  channel: async function(req, res){
    console.log('GET channel');
    try {
      let db = req.app.get('database');
      let result = await db.ChannelModel.findAll().exec();
      res.json(result);
    } catch (err) {
      return 'error occured';
      }
  },
  mylist: async function(req, res){
    console.log('GET mylist');
    try {
      let db = req.app.get('database');
      let result = await db.MyListModel.findAll().exec();
      // console.log(result);
      res.json(result);
    } catch (err) {
      return 'error occured';
      }
  },

} // the end of module.exports
