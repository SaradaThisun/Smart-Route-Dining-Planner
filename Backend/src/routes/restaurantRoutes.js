const express = require("express");

const router = express.Router();

const {
  getRestaurants,
  createRestaurant,
} = require("../controllers/restaurantController");

router.get("/", getRestaurants);

router.post("/", createRestaurant);

module.exports = router;