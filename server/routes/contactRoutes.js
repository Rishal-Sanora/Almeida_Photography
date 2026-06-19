const express = require("express");

const {
  createMessage,
  getMessages,
  deleteMessage
} = require(
  "../controllers/contactController"
);

const {
  protect
} = require(
  "../middleware/authMiddleware"
);

const adminOnly = require(
  "../middleware/roleMiddleware"
);

const router = express.Router();

router.post(
  "/",
  createMessage
);

router.get(
  "/",
  protect,
  adminOnly,
  getMessages
);

router.delete(
  "/:id",
  protect,
  adminOnly,
  deleteMessage
);

module.exports = router;