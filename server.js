var express = require('express'),
    app = express(),
    port = 8080,
    mongoose = require('mongoose'),
    bodyParser = require('body-parser');

require('./app/routes.js')(app);

app.use(bodyParser());      // get information from html forms
app.set('view engine', 'ejs');   // set up ejs for templating

app.listen(port);
console.log('The magic happens on port ' + port);
