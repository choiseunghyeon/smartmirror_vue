let Schema = {};

Schema.createSchema = (mongoose) => {
  let MyListSchema = mongoose.Schema({
    name: {type:String},
    content:{ type: Array, 'default':[]},
    created_at: {type: Date, index: {unique: false}, 'default': Date.now},
    updated_at: {type: Date, index: {unique: false}, 'default': Date.now}
  });

  MyListSchema.static('findAll', function(callback){
    return this.find({});
  });


  console.log('ChannelSchema 정의함.');

  return MyListSchema;
};

module.exports = Schema;
