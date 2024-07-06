const asyncHandler = require("express-async-handler");
const Plan = require("../../models/Plan/Plan");

const planController = {
  //!Create
  createPlan: asyncHandler(async (req, res) => {
    const { planName, features, price } = req.body;
    //?If plan is already exist
    const planFound = await Plan.findOne({ planName });
    if (planFound) {
      throw new Error("Plan already exists");
    }

    //?Only 2 plans are allowed
    const planCount = await Plan.countDocuments();
    if (planCount >= 2) {
      throw new Error("Only two plans are allowed");
    }
    //?Create Plan
    const plan = new Plan({ planName, features, price, user: req.user });
    await plan.save();
    res.status(201).json({
      status: "success",
      message: "Plan created successfully",
      plan,
    });
  }),

  //!List
  lists: asyncHandler(async (req, res) => {
    const plans = await Plan.find();
    res.status(200).json({
      status: "success",
      message: "Plans listed successfully",
      plans,
    });
  }),

  //!Get a plan
  getPlan: asyncHandler(async (req, res) => {
    const planId = req.params.planId;
    const planFound = await Plan.findById(planId);
    if (!planFound) {
      throw new Error("Plan not found");
    }
    res.status(200).json({
      status: "success",
      message: "Plan fetched successfully",
      planFound,
    });
  }),

  //!delete
  deletePlan: asyncHandler(async (req, res) => {
    const planId = req.params.planId;
    const planFound = await Plan.findById(planId);
    if (!planFound) {
      throw new Error("Plan not found");
    }
    await Plan.findByIdAndDelete(planId);
    res.status(200).json({
      status: "success",
      message: "Plan deleted successfully",
    });
  }),

  //!Update plan
  update: asyncHandler(async (req, res) => {
    const planId = req.params.planId;
    const planFound = await Plan.findById(planId);
    if (!planFound) {
      throw new Error("Plan not found");
    }
    const planUpdated = await Plan.findByIdAndUpdate(
      planId,
      {
        planName: req.body.planName,
        feature: req.body.features,
        price: req.body.price,
      },
      { new: true }
    );
    res.status(200).json({
      status: "success",
      message: "Plan updated successfully",
      planUpdated,
    });
  }),
};

module.exports = planController;
