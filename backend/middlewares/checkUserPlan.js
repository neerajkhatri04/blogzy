const User = require("../models/User/User");
const asyncHandler = require("express-async-handler");

const checkUserPlan = asyncHandler(async (req, res, next) => {
  try {
    const user = await User.findById(req.user);
    if (!user?.hasSelectedPlan) {
      return res.status(401).json({
        status: "Failed",
        message: "Please subscribe to a plan first",
      });
    }
    next();
  } catch (error) {
    return res.status(500).json({
      status: "Failed",
      message: error.message,
    });
  }
});

module.exports = checkUserPlan;
