
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
      let names = result.reduce((acc,val,index) => {
        acc.push(val.name);
        return acc;
      },[]);
      console.log(names);

    } catch (err) {
      return 'error occured';

  }


} // the end of module.exports
