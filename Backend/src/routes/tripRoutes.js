const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
  saveTrip,
  getTrips,
} = require("../controllers/tripController");

router.post("/", protect, saveTrip);

router.get("/", protect, getTrips);

module.exports = router;