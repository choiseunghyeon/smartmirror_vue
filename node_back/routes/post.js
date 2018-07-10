
module.exports = {
  channel: async (req, res) => {
      console.log(' POST channel');
      try {
        let db = req.app.get('database');
        let snippet = req.body.data.snippet;
        let channel = new db.ChannelModel({"snippet":snippet});
        let result = await channel.save();
        res.end();
      } catch (err) {
        console.error(err);
      }
  },
  mylist: async (req, res) => {
      console.log(' POST mylist');
      try {
        let db = req.app.get('database');
        let name = req.body.data.name;
        let mylist = new db.MyListModel({"name":name});
        let result = await mylist.save();
        res.end();
      } catch (err) {
        console.error(err);
      }
  },

}
