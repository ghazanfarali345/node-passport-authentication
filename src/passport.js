import passport from "passport";
import UserModel from "./modules/user/user.model";

const FACEBOOK_CLIENT_ID = "461172382484051";
const FACEBOOK_CLIENT_SECRET = "20155b3c138977515f3fc5ca397c715b";

const JwtStrategy = require("passport-jwt").Strategy,
  ExtractJwt = require("passport-jwt").ExtractJwt,
  FacebookStrategy = require("passport-facebook").Strategy;

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

passport.use(
  new FacebookStrategy(
    {
      clientID: FACEBOOK_CLIENT_ID,
      clientSecret: FACEBOOK_CLIENT_SECRET,
      callbackURL: "/facebook/callback",
    },
    function (accessToken, refreshToken, profile, cb) {
      User.findOrCreate({ facebookId: profile.id }, function (err, user) {
        return cb(err, user);
      });
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});
