var mongoose = require('mongoose');

var proconSchema = mongoose.Schema({
  topic: String,
  pro: [{
      content: String,
      support: []
    }]
  ,
  con: [{
      content: String,
      support: []
    }]

});

module.exports = mongoose.model('ProCon', proconSchema);
