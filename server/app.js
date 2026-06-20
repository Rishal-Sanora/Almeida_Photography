const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const connectDB = require("./config/db");

// Routes
const authRoutes = require("./routes/authRoutes");
const serviceRoutes = require("./routes/serviceRoutes");
const portfolioRoutes = require("./routes/portfolioRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
const contactRoutes = require("./routes/contactRoutes");
const uploadRoutes = require("./routes/uploadRoutes");
const clientPhotoRoutes = require("./routes/clientPhotoRoutes");

const path = require("path");
const app = express();

// Serve static uploads
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/auth", authRoutes);

app.use("/api/services", serviceRoutes);

app.use("/api/portfolio", portfolioRoutes);

app.use("/api/bookings", bookingRoutes);

app.use("/api/contact", contactRoutes);

app.use("/api/upload", uploadRoutes);

app.use("/api/clientphotos", clientPhotoRoutes);

// Home Route
app.get("/", (req, res) => {
  res.send("Photography Website API Running");
});

module.exports = app;