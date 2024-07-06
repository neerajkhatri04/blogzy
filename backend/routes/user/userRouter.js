const express = require("express");
const userController = require("../../controllers/User/userController");
const isAuthenticated = require("../../middlewares/isAuthenticated");
const userRouter = express.Router();

//!Register
userRouter.post("/register", userController.register);
//!Login
userRouter.post("/login", userController.login);
//!LoginGoogle
userRouter.get("/auth/google", userController.googleAuth);
//!Google callback
userRouter.get("/auth/google/callback", userController.googleAuthCallback);
userRouter.get("/checkAuthenticated", userController.checkAuthenticated);

//!Logout
userRouter.post("/logout", userController.logout);
//!Profile
userRouter.get("/profile", isAuthenticated, userController.profile);
module.exports = userRouter;
