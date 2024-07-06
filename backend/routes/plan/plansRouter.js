const express = require("express");
const isAuthenticated = require("../../middlewares/isAuthenticated");
const planController = require("../../controllers/plans/planController");
const planRouter = express.Router();

//! Create
planRouter.post("/create", isAuthenticated, planController.createPlan);

//!List
planRouter.get("/", planController.lists);

//!Update
planRouter.put("/:planId", isAuthenticated, planController.update);

//!Get a plan
planRouter.get("/:planId", planController.getPlan);

//!Delete
planRouter.delete("/:planId", isAuthenticated, planController.deletePlan);

module.exports = planRouter;
