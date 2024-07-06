const asyncHandler = require("express-async-handler");
const User = require("../../models/User/User");
const bcrypt = require("bcrypt");
const passport = require("passport");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const userController = {
  //!Registration
  register: asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;

    //?Find the user
    const userFound = await User.findOne({ email, username });
    if (userFound) {
      throw new Error("User already exists");
    }

    //?Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    //?Create the user
    const user = new User({
      username,
      email,
      password: hashedPassword,
    });
    await user.save();
    res.status(201).json({
      status: "success",
      message: "User registered successfully",
      user,
    });
  }),
  //!Login
  login: asyncHandler(async (req, res, next) => {
    passport.authenticate("local", (err, user, info) => {
      if (err) return next(err);
      //?User not exist
      if (!user) {
        return res.status(401).json({
          status: "Failed",
          message: info.message,
        });
      }

      //?Generate token
      console.log(process.env.JWT_SECRET);
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      console.log(token);
      //?Set the token into cookie
      res.cookie("token", token, {
        maxAge: 1000 * 60 * 60 * 24 * 7,
        httpOnly: true,
        secure: false,
        sameSite: "strict",
      });
      //?Send the response
      res.status(200).json({
        status: "success",
        message: "Logged in successfully",
        username: user?.username,
        email: user?.email,
        _id: user?._id,
      });
    })(req, res, next);
  }),

  //!Google Auth
  googleAuth: passport.authenticate("google", { scope: ["profile"] }),
  //!Google Auth callback
  googleAuthCallback: asyncHandler(async (req, res, next) => {
    passport.authenticate(
      "google",
      {
        failureRedirect: "/login",
        session: false,
      },
      (err, user, info) => {
        if (err) next(err);
        if (!user) {
          res.redirect("http://localhost:5173/google-login-error");
        }

        //token
        const token = jwt.sign({ id: user?._id }, process.env.JWT_SECRET, {
          expiresIn: "7d",
        });
        //?Set the token into cookie
        res.cookie("token", token, {
          maxAge: 1000 * 60 * 60 * 24 * 7,
          httpOnly: true,
          secure: false,
          sameSite: "strict",
        });
        //?Redirect to user dashboard
        res.redirect("http://localhost:5173/dashboard");
      }
    )(req, res, next);
  }),

  //!Check user authentication
  checkAuthenticated: asyncHandler(async (req, res) => {
    const token = req.cookies["token"];
    if (!token) {
      return res.status(401).json({
        isAuthenticated: false,
      });
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      //?Find  the user
      const user = await User.findById(decoded.id);
      if (user) {
        return res.status(200).json({
          isAuthenticated: true,
          _id: user._id,
          username: user.username,
          email: user.email,
          profilePicture: user?.profilePicture,
        });
      } else {
        return res.status(401).json({
          isAuthenticated: false,
        });
      }
    } catch (error) {
      return res.status(401).json({
        isAuthenticated: false,
        error,
      });
    }
  }),
  //!logout
  logout: asyncHandler(async (req, res) => {
    res.cookie("token", " ", { maxAge: 1 });
    res.status(200).json({
      status: "success",
      message: "Logged out successfully",
    });
  }),
  //!Profile
  profile: asyncHandler(async (req, res) => {
    const userId = req.user;
    const userFound = await User.findById(userId)
      .populate("posts")
      .select(
        "-password -accountVerificationToken -passwordVerificationToken -passwordResetToken -passwordResetExpires -accountVerificationExpires"
      );
    if (!userFound) {
      throw new Error("User not found");
    }
    res.status(200).json({
      status: "success",
      message: "User profile fetched successfully",
      userFound,
    });
  }),
};
module.exports = userController;
