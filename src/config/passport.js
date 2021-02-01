const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const passportJWT = require('passport-jwt');

const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

const { JWT_SECRET, FRONTEND_USERNAME, FRONTEND_PASSWORD } = process.env;


const jwtStrategyOptions = {
  secretOrKey: JWT_SECRET,
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
};

passport.use('jwt', new JWTStrategy(jwtStrategyOptions, (decodedToken, done) => {
  // signature is valid and we don't need to check a DB to see if it's disabled, etc...
  done(null, true);
}));

passport.use(new LocalStrategy((username, password, done) => {
  // This would be in a DB if we had multiple users for the frontend
  if (username === FRONTEND_USERNAME && password === FRONTEND_PASSWORD) {
      return done(null, true);
  } else {
      return done(null, false);
  }
}));


// not using sessions
passport.serializeUser(function(user, done) {
  done(null, true);
});

// not using sessions
passport.deserializeUser(function(id, done) {
  done(null, true);
});


module.exports = (app) => {
    app.use(passport.initialize());
};