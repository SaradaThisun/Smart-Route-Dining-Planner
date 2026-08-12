const express = require("express");

const router = express.Router();

const {
  getRecommendations,
  getRouteRecommendations,
} = require("../controllers/recommendationController");

router.get("/", getRecommendations);

// NEW
router.post("/route", getRouteRecommendations);

module.exports = router;