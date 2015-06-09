var ProCon = require('../app/models/procon.js');;

module.exports = function(app, passport) {
  app.get('/', function(req, res) {
      res.render('index.ejs', {
        user: null
      });
  });

  app.get('/all_procons', function(req, res) {
    ProCon.find({}, function(err, data) {
      res.setHeader('Content-Type', 'application/json');
      res.send(JSON.stringify(data));
    });
  });

  app.get('/all_procons/:topic', function(req, res) {
	  var topic = req.params.topic;
	  ProCon.findOne({'topic': topic}, {'_id': 0}, function(err, data){
		  console.log(data);
		  res.setHeader('Content-Type', 'application/json');
		  res.send(JSON.stringify(data));
	  });
  });

  app.put('/all_procons/:topic', function(req, res) {
	  var topic = req.params.topic;
	  var data = req.body;
/*
	  console.log('in server put');
	  console.log(req.body);
	  console.log(topic);
*/
	  ProCon.update({'topic':topic}, data, {upsert: true}, function(err){

	  });
  });

  app.get('/top_names', function(req, res) {

  });

  app.get('/login', function(req, res) {
      res.render('login.ejs');
  });

  app.get('/signup', function(req, res) {
      res.render('signup.ejs');
  });

  app.get('/instructor', function(req, res) {
      res.render('instructor.ejs');
  });

  // Facebook authentication
  app.get('/auth/facebook', passport.authenticate('facebook', { scope : 'email' }));

  app.get('/auth/facebook/callback', passport.authenticate('facebook', {
      successRedirect : '/home',
      failureRedirect : '/login'
  }));

  app.get('/home', isLoggedIn, function (req, res) {
    res.render('index.ejs', {
      user: req.user
    });
  });

  app.get('/logout', function(req, res) {
    console.log('log out');
      req.logout();
      res.redirect('/login');
  });
};

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/');
}
