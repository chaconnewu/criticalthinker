var mongoose = require('mongoose');

var proconSchema = mongoose.Schema({
  topic: String,
  pro:[{
      content: String,
      support: [{
        content: String
      }]
    }]
  ,
  con: [{
      content: String,
      support: [{
        content: String
      }]
    }]

});

module.exports = mongoose.model('ProCon', proconSchema);
