const express = require("express");
const connectDB = require("./utils/connectDB");
require("dotenv").config();
const cors = require("cors");
const postRouter = require("./routes/post/postsRouter");
const userRouter = require("./routes/user/userRouter");
const cookieParser = require("cookie-parser");
const passport = require("./utils/passport-config");
const app = express();
const session = require("express-session");
const categoriesRouter = require("./routes/category/categoriesRouter");
const planRouter = require("./routes/plan/plansRouter");
const paymentRouter = require("./routes/payment/paymentRouter");

const PORT = process.env.PORT || 3000;

//!Middleware
app.use(express.json());
const corsOptions = {
  origin: ["http://localhost:5173"],
  credentials: true,
};
app.use(cors(corsOptions));

//***Passport middleware***//
// Initialize session middleware
// app.use(
//   session({
//     secret: "secret",
//     resave: false,
//     saveUninitialized: false,
//   })
// );
app.use(passport.initialize());
app.use(cookieParser());
// app.use(passport.session());

//*****Routes handler******/
app.use("/api/v1/posts", postRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/categories", categoriesRouter);
app.use("/api/v1/plans", planRouter);
app.use("/api/v1/payments", paymentRouter);

//!Not found error handler
app.use((req, res, next) => {
  res.status(404).json({
    status: "Failed",
    message: "Route not found",
  });
});

//!Error handling middleware
app.use((err, req, res, next) => {
  const message = err.message;
  const stack = err.stack;
  res.status(500).json({
    status: "Failed",
    message,
    stack,
  });
});

//!Start the server
app.listen(PORT, () => {
  console.log(`Listening on PORT: ${PORT}`);
});

//!Connect to DB
connectDB();
