const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = async () => {
  try {
    const connection = await mongoose.connect(process.env.DATABASE_URL);
    console.log("DB connected successfully");
  } catch (error) {
    console.log("Couldn't connect to database");
    process.exit(1);
  }
};

module.exports = connectDB;
