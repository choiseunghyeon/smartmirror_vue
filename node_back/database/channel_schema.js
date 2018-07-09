let Schema = {};

Schema.createSchema = (mongoose) => {
  let ChannelSchema = mongoose.Schema({
    name:{ type: String, required: true, 'default':''},
    info:{ type: Array},
    created_at: {type: Date, index: {unique: false}, 'default': Date.now},
    updated_at: {type: Date, index: {unique: false}, 'default': Date.now}
  });

  ChannelSchema.static('findAll', function(callback){
    return this.find({});
  });

  console.log('ChannelSchema 정의함.');

  return ChannelSchema;
};

module.exports = Schema;
