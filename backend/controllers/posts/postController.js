const asyncHandler = require("express-async-handler");
const Post = require("../../models/Post/Post");
const cloudinary = require("../../utils/fileUpload");
const Category = require("../../models/Category/Category");
const User = require("../../models/User/User");
//!Create
const createPost = asyncHandler(async (req, res) => {
  const { description, category } = req.body;

  //?find the category
  const categoryFound = await Category.findById(category);
  if (!categoryFound) {
    throw new Error("Category not found");
  }

  //?find the user
  const userFound = await User.findById(req.user);
  if (!userFound) {
    throw new Error("User not found");
  }
  const post = new Post({
    description,
    image: req.file,
    author: req.user,
    category,
  });
  await post.save();

  //?Push the post into the category array
  categoryFound.posts.push(post._id);
  await categoryFound.save();

  //?Push the post into the User model
  userFound.posts.push(post._id);
  await userFound.save();
  // Respond with Cloudinary response

  res.status(201).json({
    status: "success",
    message: "Post created successfully",
    post,
  });
  //
});
//!List
const listPost = asyncHandler(async (req, res) => {
  //Filter
  const { category, title, page = 1, limit = 10 } = req.query;
  let filter = {};
  if (category) {
    filter.category = category;
  }
  if (title) {
    filter.description = { $regex: title, $options: "i" };
  }

  const posts = await Post.find(filter)
    .populate("category")
    .sort({ createdAt: -1 })
    .skip((page - 1) * limit)
    .limit(limit);

  //!Total posts
  const totalPosts = await Post.countDocuments(filter);

  res.status(200).json({
    status: "success",
    message: "Posts listed successfully",
    posts,
    currentPage: page,
    perPage: limit,
    totalPages: Math.ceil(totalPosts / limit),
  });
});

//!Get a post
const getPost = asyncHandler(async (req, res) => {
  //?Get post id from params
  const postId = req.params.postId;
  //?Find the post
  const postFound = await Post.findById(postId);
  if (!postFound) {
    throw new Error("Post not found");
  }
  res.status(200).json({
    status: "success",
    message: "Post found successfully",
    postFound,
  });
});

//!Update
const updatePost = asyncHandler(async (req, res) => {
  //?Get post id from params
  const postId = req.params.postId;
  //?Find the post
  const postFound = await Post.findById(postId);
  if (!postFound) {
    throw new Error("Post not found");
  }
  //?Update
  const postUpdated = await Post.findByIdAndUpdate(
    postId,
    { title: req.body.title, description: req.body.description },
    { new: true }
  );
  res.status(200).json({
    status: "success",
    message: "Post updated successfully",
    postUpdated,
  });
});
//!Delete
const deletePost = asyncHandler(async (req, res) => {
  const postId = req.params.postId;
  await Post.findByIdAndDelete(postId);
  res.status(200).json({
    status: "success",
    message: "Post deleted successfully",
  });
});

module.exports = {
  createPost,
  listPost,
  getPost,
  updatePost,
  deletePost,
};
