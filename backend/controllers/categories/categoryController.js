const asyncHandler = require("express-async-handler");
const Category = require("../../models/Category/Category");

const categoryController = {
  //!Create
  createCategory: asyncHandler(async (req, res) => {
    const { categoryName } = req.body;
    //?If category is already exist
    const categoryFound = await Category.findOne({ categoryName });
    if (categoryFound) {
      throw new Error("Category already exists");
    }
    //?Create category
    const category = new Category({ categoryName, author: req.user });
    await category.save();
    res.status(201).json({
      status: "success",
      message: "Category created successfully",
      category,
    });
  }),

  //!List
  fetchAllCategories: asyncHandler(async (req, res) => {
    const categories = await Category.find();
    res.status(200).json({
      status: "success",
      message: "Categories listed successfully",
      categories,
    });
  }),

  //!Get a category
  getCategory: asyncHandler(async (req, res) => {
    const categoryId = req.params.categoryId;
    const categoryFound = await Category.findById(categoryId);
    if (!categoryFound) {
      throw new Error("Category not found");
    }
    res.status(200).json({
      status: "success",
      message: "Category fetched successfully",
      categoryFound,
    });
  }),

  //!delete
  deleteCategory: asyncHandler(async (req, res) => {
    const categoryId = req.params.categoryId;
    const categoryFound = await Category.findById(categoryId);
    if (!categoryFound) {
      throw new Error("Category not found");
    }
    await Category.findByIdAndDelete(categoryId);
    res.status(200).json({
      status: "success",
      message: "Category deleted successfully",
    });
  }),

  //!Update category
  update: asyncHandler(async (req, res) => {
    const categoryId = req.params.categoryId;
    const categoryFound = await Category.findById(categoryId);
    if (!categoryFound) {
      throw new Error("Category not found");
    }
    const categoryUpdated = await Category.findByIdAndUpdate(
      categoryId,
      {
        categoryName: req.body.categoryName,
        description: req.body.description,
      },
      { new: true }
    );
    res.status(200).json({
      status: "success",
      message: "Category updated successfully",
      categoryUpdated,
    });
  }),
};

module.exports = categoryController;
