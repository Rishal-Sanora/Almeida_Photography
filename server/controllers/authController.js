const User = require("../models/User");
const bcrypt = require("bcryptjs");
const generateToken = require("../utils/generateToken");

const registerUser = async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      phone,
    });

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id),
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
const loginUser = async (req, res) => {
  try {

    const { email, password } = req.body;

    const user = await User.findOne({
      email,
    });

    if (
      user &&
      (await bcrypt.compare(password, user.password))
    ) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: generateToken(user._id),
      });

    } else {
      res.status(401).json({
        message: "Invalid credentials",
      });
    }

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
const getProfile = async (req, res) => {
  res.json(req.user);
};

const logoutUser = async (req, res) => {
  res.json({
    message: "Logout successful",
  });
};

const crypto = require("crypto");
const nodemailer = require("nodemailer");

const forgotPassword = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const resetToken = crypto.randomBytes(20).toString("hex");
    user.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex");
    user.resetPasswordExpire = Date.now() + 10 * 60 * 1000; // 10 minutes
    await user.save();

    const clientUrl = process.env.CLIENT_URL || "http://localhost:5174";
    const resetUrl = `${clientUrl}/reset-password/${resetToken}`;

    try {
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
      });

      const mailOptions = {
        from: `"Almeida Photography" <${process.env.EMAIL_USER}>`,
        to: user.email,
        subject: "Password Reset Request - Almeida Photography",
        html: `
          <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #fce7f3; border-radius: 10px; background-color: #fffaf0;">
            <h2 style="color: #ec4899; text-transform: uppercase; letter-spacing: 2px;">Almeida Photography</h2>
            <p>Hello ${user.name},</p>
            <p>We received a request to reset your password. If you didn't make this request, you can safely ignore this email.</p>
            <p>Click the secure button below to set a new password:</p>
            <a href="${resetUrl}" style="display: inline-block; padding: 14px 28px; margin: 20px 0; background: #ec4899; color: white; text-decoration: none; border-radius: 8px; font-weight: bold; text-transform: uppercase; letter-spacing: 1px;">Reset Password</a>
            <p>Or copy and paste this link into your browser:</p>
            <p style="word-break: break-all; color: #6b7280; font-size: 14px;">${resetUrl}</p>
            <hr style="border: none; border-top: 1px solid #fbcfe8; margin: 30px 0;">
            <p style="font-size: 12px; color: #9ca3af;">Best regards,<br>The Almeida Photography Team</p>
          </div>
        `
      };

      await transporter.sendMail(mailOptions);
      res.status(200).json({ message: "Email sent successfully to your inbox." });
    } catch (emailError) {
      console.error("Gmail failed, bypassing Ethereal and directly returning reset URL:", emailError.message);
      
      // Absolute final fallback: just give the link to the user directly
      res.status(200).json({ 
        message: "Email systems offline. Click the direct link below to reset your password.",
        resetUrl 
      });
    }

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const resetPassword = async (req, res) => {
  try {
    console.log("Reset Password requested. Token from params:", req.params.resettoken);
    const resetPasswordToken = crypto.createHash("sha256").update(req.params.resettoken).digest("hex");
    console.log("Computed Hash:", resetPasswordToken);
    
    const user = await User.findOne({
      resetPasswordToken,
      resetPasswordExpire: { $gt: Date.now() }
    });
    
    console.log("Found User:", user ? user.email : "null");

    if (!user) return res.status(400).json({ message: "Invalid or expired token" });

    user.password = await bcrypt.hash(req.body.password, 10);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();

    res.status(200).json({ message: "Password updated successfully" });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  getProfile,
  forgotPassword,
  resetPassword,
};