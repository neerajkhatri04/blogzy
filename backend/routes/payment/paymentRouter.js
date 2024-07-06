const express = require("express");
const paymentRouter = express.Router();
require("dotenv").config();
const Razorpay = require("razorpay");
const crypto = require("crypto");
const mongoose = require("mongoose");
const Plan = require("../../models/Plan/Plan");
const Payment = require("../../models/Payment/Payment");
const isAuthenticated = require("../../middlewares/isAuthenticated");
const paymentController = require("../../controllers/payment/payment");

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_SECRET,
});

//!Create order api using post method http://localhost:8000/api/v1/payments/create-order
paymentRouter.post("/create-order", async (req, res) => {
  try {
    const { subscriptionPlanId } = req.body;
    const user = req.user;

    if (!mongoose.isValidObjectId(subscriptionPlanId)) {
      return res.status(400).json({
        message: "Invalid subscription plan id",
      });
    }
    const plan = await Plan.findById(subscriptionPlanId);
    if (!plan) {
      return res.status(400).json({
        message: "Plan not found",
      });
    }

    try {
      const options = {
        amount: Number(plan.price * 100),
        currency: "INR",
        receipt: crypto.randomBytes(10).toString("hex"),
        payment_capture: 1,
      };
      const response = razorpay.orders.create(options, (err, order) => {
        if (err) {
          return res.status(500).json({
            message: "Something went wrong",
          });
        }
        console.log(response);
        res.status(200).json({
          data: order,
          subscriptionPlanId,
        });
      });
      //   res.status(200).json({
      //     id: response.id,
      //     currency: response.currency,
      //     amount: response.amount,
      //   });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "Something went wrong",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Something went wrong",
    });
  }
});

//!Verify order api using post method http://localhost:8000/api/v1/payments/verify-order
paymentRouter.post("/verify-order", async () => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
    req.body;

  // console.log("req.body", req.body);

  try {
    // Create Sign
    const sign = razorpay_order_id + "|" + razorpay_payment_id;

    // Create ExpectedSign
    const expectedSign = crypto
      .createHmac("sha256", {}.RAZORPAY_SECRET)
      .update(sign.toString())
      .digest("hex");

    // console.log(razorpay_signature === expectedSign);

    // Create isAuthentic
    const isAuthentic = expectedSign === razorpay_signature;
    // Condition
    if (isAuthentic) {
      const payment = new Payment({
        user: req.user,
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature,
      });

      // Save Payment
      await payment.save();

      // Send Message
      res.json({
        message: "Payement Successfully",
      });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error!" });
    console.log(error);
  }
});

//! Free plan
paymentRouter.get("/free-plan", isAuthenticated, paymentController.free);

module.exports = paymentRouter;
