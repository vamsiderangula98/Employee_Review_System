const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

const User = require("../models/user");

//ussing local strategy of passport for authentication purpose
passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
    },
    function (email, password, done) {
      User.findOne({ email: email }, function (err, user) {
        if (err) {
          console.log("err", err);
          return done(err);
        }
        if (!user || user.password != password) {
          return done(null, false);
        }
        return done(null, user);
      });
    }
  )
);

//serializing the user
passport.serializeUser(function (user, done) {
  done(null, user.id);
});

//deserializing the user
passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    if (err) {
      console.log("Error in finding user--> Passport");
      return done(err);
    }

    return done(null, user);
  });
});

//checking authentication
passport.checkAuthentication = function (req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  return res.redirect("/users/login");
};
//setting authenticated user to locals
passport.setAuthenticatedUser = function (req, res, next) {
  if (req.isAuthenticated()) {
    res.locals.user = req.user;
  }
  next();
};

module.exports = passport;
