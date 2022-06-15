import passport from "passport";
import UserModel from "./modules/user/user.model";

const JwtStrategy = require("passport-jwt").Strategy,
  ExtractJwt = require("passport-jwt").ExtractJwt;
const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.APP_SECRET || "somesecret";
passport.use(
  new JwtStrategy(opts, function (jwt_payload, done) {
    console.log({ jwt_payload });
    UserModel.findOne({ id: jwt_payload._id }, function (err, user) {
      if (err) {
        return done(err, false);
      }
      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
        // or you could create a new account
      }
    });
  })
);
