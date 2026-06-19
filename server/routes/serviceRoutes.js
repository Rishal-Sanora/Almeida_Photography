const express = require("express");
const multer = require("multer");
const path = require("path");
const router = express.Router();

const {
  getServices,
  createService,
  updateService,
  deleteService
} = require("../controllers/serviceController");

const upload = require("../config/multer");

router.get("/", getServices);
router.post("/", upload.single("image"), createService);
router.put("/:id", upload.single("image"), updateService);
router.delete("/:id", deleteService);

module.exports = router;