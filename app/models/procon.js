var mongoose = require('mongoose');

var proconSchema = mongoose.Schema({
  pro: {[{
      content: "",
      support: []
    }]
  },
  con: {[{
      content: "",
      support: []
    }]
  }
});

module.exports = mongoose.module('ProCon', proconSchema);
