const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("./user").User;

function PSD() {
  passport.use(new LocalStrategy(User.authenticate()));
  passport.serializeUser(function (user, cb) {
    process.nextTick(function () {
      return cb(null, {
        id: user.id,
        username: user.username,
        picture: user.picture,
      });
    });
  });

  passport.deserializeUser(function (user, cb) {
    process.nextTick(function () {
      return cb(null, user);
    });
  });
};

module.exports = {
    PSD,
};
