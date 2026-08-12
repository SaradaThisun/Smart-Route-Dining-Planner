const express = require("express");

const router = express.Router();

const {
  getPlacesByCity,
  displayHashMap,
} = require("../controllers/hashMapController");

router.get("/", displayHashMap);

router.get("/:city", getPlacesByCity);

module.exports = router;