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

/*
var ProCon = require('./app/models/procon.js');
procon = new ProCon();
procon.topic = 'beast';
procon.pro = [{
  content: "The aging of society and individuals can and must be used as a resource within the future of our workforce.",
  support: [{
    content: "Technology companies are being founded by more experienced and aged individuals than before."
  }, {
    content: "The average age for a technology company founder is rising. It is currently at 40 years of age. This shows the value that older age is bringing into our workforce and future."
  }]
}];

procon.con = [{
  content: "As there is a rise in the age of company owners, there is no specification for what a technology company is.",
  support: [{
    content: "This could include things like video game companies, phone companies, even camera companies because they are all technology companies."
  }, {
    content: "Cross-generational workplaces can be effective but to an extent. One example where it wouldn't be effective is if you have a manager who is 50 years old and has been working at the company for 20 years, and then the company then hires a supervisor (the boss of the manager) who is 25."
  }]
}];

procon.save(function(err) {
  if (err) {
    throw err;
  }
});
*/

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
