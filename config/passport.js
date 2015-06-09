var LocalStrategy    = require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
var configAuth = require('./auth');

var User = require('../app/models/user');

module.exports = function(passport) {
  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  // used to deserialize the user
  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
        done(err, user);
    });
  });

  passport.use(new FacebookStrategy({

    // pull in our app id and secret from our auth.js file
    clientID        : configAuth.facebookAuth.clientID,
    clientSecret    : configAuth.facebookAuth.clientSecret,
    callbackURL     : configAuth.facebookAuth.callbackURL

  },
  function(token, refreshToken, profile, done){
    console.log(profile);
    process.nextTick(function() {
      User.findOne({'facebook.id': profile.id}, function(err, user) {

        if (err) {
          return done(err);
        }

        if (user) {
          return done(null, user);
        } else {
          var newUser = new User();
          newUser.facebook.id = profile.id;
          newUser.facebook.token = token;
          newUser.facebook.name = profile.displayName;
          newUser.facebook.email = profile.emails[0].value;

          newUser.save(function(err) {
              if (err) {
                  throw err;
              }

              return done(null, newUser);
          });
        }
      });
    });
  }));
}
