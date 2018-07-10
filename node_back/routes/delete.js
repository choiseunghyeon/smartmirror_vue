
module.exports = {
  channel: async function(req, res){
    console.log('DELETE channel');
    try {
      let db = req.app.get('database');
      let result = await db.ChannelModel.deleteOne({"_id":req.body.id}).exec();
      res.end();
    } catch (err) {
      return 'error occured';
      }
  },
  mylist: async function(req, res){
    console.log('DELETE mylist');
    try {
      let db = req.app.get('database');
      let result = await db.MyListModel.deleteOne({"_id":req.body.id}).exec();
      res.end();
    } catch (err) {
      return 'error occured';
      }
  },
} // the end of module.exports's object
