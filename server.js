var express = require('express'),
    app = express(),
    port = 8080,
    mongoose = require('mongoose'),
    passport = require('passport'),
    flash = require('connect-flash'),
    morgan = require('morgan'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    path = require('path'),
    session = require('express-session'),
    configDB = require('./config/database.js'),
    http = require('http');

mongoose.connect(configDB.url);
require('./config/passport')(passport);
app.use('/', express.static(path.join(__dirname, 'views')));

// set up express
app.use(morgan('dev'));     // log every request to the console
app.use(cookieParser());    // read cookies (for authentication)
app.use(bodyParser());      // get information from html forms

app.set('view engine', 'ejs');   // set up ejs for templating

// passport set up
app.use(session({ secret: 'ilovecriticalthinking' })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session



require('./app/routes.js')(app, passport);
app.listen(port);
// http.createServer(app).listen(port, 'http://dataagent.org');
console.log('The magic happens on port ' + port);
