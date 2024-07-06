const asyncHandler = require("express-async-handler");
const Plan = require("../../models/Plan/Plan");
const Payment = require("../../models/Payment/Payment");
const User = require("../../models/User/User");

const paymentController = {
  free: asyncHandler(async (req, res) => {
    const user = await User.findById(req.user);
    if (!user) {
      throw new Error("User not found");
    }
    user.hasSelectedPlan = true;
    await user.save();
    res.status(200).json({
      status: "success",
      message: "Free plan selected",
      user,
    });
  }),
};

module.exports = paymentController;
