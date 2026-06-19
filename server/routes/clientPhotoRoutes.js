const express = require("express");

const {
  uploadClientPhotos,
  getClientPhotos,
  approvePhoto,
  rejectPhoto,
  deletePhoto,
} = require("../controllers/clientPhotoController");

const { protect } = require("../middleware/authMiddleware");
const adminOnly = require("../middleware/roleMiddleware");

const router = express.Router();


const upload = require("../config/multer");

// Client Upload
router.post("/", protect, upload.array("images", 10), uploadClientPhotos);


// Admin View All
router.get("/", protect, adminOnly, getClientPhotos);


// Admin Approve
router.patch(
  "/:id/approve",
  protect,
  adminOnly,
  approvePhoto
);


// Admin Reject
router.patch(
  "/:id/reject",
  protect,
  adminOnly,
  rejectPhoto
);


// Delete
router.delete(
  "/:id",
  protect,
  adminOnly,
  deletePhoto
);

module.exports = router;