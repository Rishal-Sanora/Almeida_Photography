const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("./models/User");
require("dotenv").config();

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    
    // Check if an admin exists
    const adminExists = await User.findOne({ email: "admin@almeida.com" });
    if (!adminExists) {
      const hashedPassword = await bcrypt.hash("admin123", 10);
      await User.create({
        name: "Super Admin",
        email: "admin@almeida.com",
        password: hashedPassword,
        role: "admin"
      });
      console.log("SUCCESS: Admin created! Email: admin@almeida.com | Password: admin123");
    } else {
      console.log("SUCCESS: Admin already exists! Email: admin@almeida.com | Password: admin123");
    }
  } catch (error) {
    console.error("Error seeding admin:", error);
  } finally {
    process.exit();
  }
};

seed();
