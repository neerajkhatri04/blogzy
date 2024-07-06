const express = require("express");
const isAuthenticated = require("../../middlewares/isAuthenticated");
const categoryController = require("../../controllers/categories/categoryController");
const categoriesRouter = express.Router();

//! Create
categoriesRouter.post(
  "/create",
  isAuthenticated,
  categoryController.createCategory
);

//!List
categoriesRouter.get("/", categoryController.fetchAllCategories);

//!Update
categoriesRouter.put(
  "/:categoryId",
  isAuthenticated,
  categoryController.update
);

//!Get a post
categoriesRouter.get("/:categoryId", categoryController.getCategory);

//!Delete
categoriesRouter.delete(
  "/:categoryId",
  isAuthenticated,
  categoryController.deleteCategory
);

module.exports = categoriesRouter;
