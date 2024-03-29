const JwtStrategy = require("passport-jwt").Strategy,
  ExtractJwt = require("passport-jwt").ExtractJwt;
const opts = {};
const {userModel} = require("./database");
const passport = require("passport");

opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.JWT_KEY;

passport.use(
  new JwtStrategy(opts, async function (jwt_payload, done) {
    // console.log(jwt_payload);
    userModel.findOne({ _id: jwt_payload._id },{username:1,"vendor.status":1,"admin.status":1,email:1}).exec()
      .then(function (user) {
        // console.log(user);
        if (user) {
          return done(null, user);
        } else {
          return done(null, false);
          // or you could create a new account
        }
      })
      .catch((err) => {
        if (err) {
          return done(err, false);
        }
      });
  })
);
