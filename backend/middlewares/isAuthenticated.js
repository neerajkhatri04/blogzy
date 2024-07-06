const passport = require("passport");

const isAuthenticated = (req, res, next) => {
  passport.authenticate("jwt", { session: false }, (error, user, info) => {
    if (error || !user) {
      return res.status(401).json({
        isAuthenticated: false,
        message: info ? info?.message : "Login required, no token found",
        error: error ? error?.message : undefined,
      });
    }

    console.log("user from middlware:", user._conditions);
    //?Pass user to req.user
    req.user = user?._conditions?._id;
    next();
  })(req, res, next);
};

module.exports = isAuthenticated;
