const express = require("express");
const multer = require("multer");
const {
  createPost,
  listPost,
  updatePost,
  getPost,
  deletePost,
} = require("../../controllers/posts/postController");
const storage = require("../../utils/fileUpload");
const isAuthenticated = require("../../middlewares/isAuthenticated");
const checkUserPlan = require("../../middlewares/checkUserPlan");
const postRouter = express.Router();

//!multer instance
const upload = multer({ storage });
//! Create
postRouter.post(
  "/create",
  isAuthenticated,
  checkUserPlan,
  upload.single("image"),
  createPost
);

//!List
postRouter.get("/", listPost);

//!Update
postRouter.put("/:postId", isAuthenticated, updatePost);

//!Get a post
postRouter.get("/:postId", getPost);

//!Delete
postRouter.delete("/:postId", isAuthenticated, deletePost);

module.exports = postRouter;
