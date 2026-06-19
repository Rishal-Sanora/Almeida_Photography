const mongoose = require("mongoose");
const crypto = require("crypto");
const User = require("./server/models/User");
require("dotenv").config({ path: "./server/.env" });

async function test() {
  await mongoose.connect(process.env.MONGO_URI || "mongodb://localhost:27017/photography");
  
  // Create a test user
  await User.deleteOne({ email: "testreset@example.com" });
  const user = await User.create({
    name: "Test Reset",
    email: "testreset@example.com",
    password: "password123",
    phone: "1234567890"
  });

  // Generate token
  const resetToken = crypto.randomBytes(20).toString("hex");
  user.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex");
  user.resetPasswordExpire = Date.now() + 10 * 60 * 1000;
  await user.save();

  console.log("Token generated:", resetToken);

  // Attempt to verify token
  const resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex");
  const foundUser = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() }
  });

  console.log("Found User with Token:", foundUser ? foundUser.email : "null");

  mongoose.disconnect();
}

test();
