module.exports = {
  mylist: async (req, res) => {
      console.log(' PUT mylist');
      try {
        let db = req.app.get('database');
        let id = req.body.data.id;
        let content = req.body.data.content;
        let result = await db.MyListModel.findByIdAndUpdate(id,{$push:{content:content}});
        // console.log(result);
        res.end();
      } catch (err) {
        console.error(err);
      }
  },

}
