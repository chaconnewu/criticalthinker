var express = require('express'),
    app = express(),
    port = 8080,
    mongoose = require('mongoose'),
    bodyParser = require('body-parser'),
    path = require('path'),
    configDB = require('./config/database.js');

mongoose.connect(configDB.url);
require('./app/routes.js')(app);
app.use('/', express.static(path.join(__dirname, 'views')));
// var ProCon = require('./app/models/procon.js');
// procon = new ProCon();
// procon.topic = 'test';
// procon.save(function(err) {
//   if (err) {
//     throw err;
//   }
// });

app.use(bodyParser());      // get information from html forms
app.set('view engine', 'ejs');   // set up ejs for templating


app.listen(port);
console.log('The magic happens on port ' + port);
