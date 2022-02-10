const passport = require('passport');
const GoogleStrategy = require('passport-linkedin-oauth2').Strategy;
const strategy_name = 'linkedin';
require('dotenv').config()

passport.use(strategy_name, new GoogleStrategy({
    clientID: process.env.LINKEDIN_CLIENT_ID,
    clientSecret: process.env.LINKEDIN_CLIENT_SECRET,
    callbackURL: process.env.LINKEDIN_CALLBACK,
    scope: ['r_emailaddress', 'r_liteprofile']
  },
  function(accessToken, refreshToken, profile, done) {
    // User.findOrCreate({ googleId: profile.id }, function (err, user) {
    //   return done(err, user);
    // });
    return done(null, profile);
  }
));