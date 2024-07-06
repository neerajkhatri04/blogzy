const passport = require("passport");
const User = require("../models/User/User");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const JWTStrategy = require("passport-jwt").Strategy; //Strategy for jwt
const ExtractJWT = require("passport-jwt").ExtractJwt; //Extract from jwt
var GoogleStrategy = require("passport-google-oauth20").Strategy;
require("dotenv").config();

//! Configure passport local strategy
passport.use(
  new LocalStrategy(
    {
      usernameField: "username",
    },
    async (username, password, done) => {
      try {
        const user = await User.findOne({ username });
        if (!user) {
          return done(null, false, {
            message: "User doesn't exist with this username.",
          });
        }
        const match = await bcrypt.compare(password, user.password);
        console.log(password);
        console.log(match);

        if (match) {
          return done(null, user);
        } else {
          return done(null, false, {
            message: "Incorrect password",
          });
        }
      } catch (error) {
        return done(error);
      }
    }
  )
);

//**********GOOGLE OAUTH*************//
//!JWT options
const options = {
  jwtFromRequest: ExtractJWT.fromExtractors([
    (req) => {
      let token = null;
      if (req && req.cookies) {
        token = req.cookies["token"];
        return token;
      }
    },
  ]),
  secretOrKey: process.env.JWT_SECRET,
};

//!JWT
passport.use(
  new JWTStrategy(options, async (jwt_payload, done) => {
    try {
      const user = User.findById(jwt_payload.id);
      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    } catch (error) {
      return done(error, false);
    }
  })
);

//!Google Oauth
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:8000/api/v1/users/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        //?check if user found
        let user = await User.findOne({ googleId: profile.id });
        //? google properties
        const {
          id,
          displayName,
          name,
          _json: { picture },
        } = profile;

        //?check is email exists
        let email = "";
        if (Array.isArray(profile?.emails) && profile?.emails?.length > 0) {
          email = profile.emails[0].value;
        }
        //?User not found
        if (!email) {
          user = await User.create({
            username: displayName,
            googleId: id,
            profilePicture: picture,
            authMethod: "google",
            email,
          });
        }
        done(null, user);
      } catch (error) {
        done(error, null);
      }
    }
  )
);

module.exports = passport;
