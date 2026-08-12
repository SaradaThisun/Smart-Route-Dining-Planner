const express = require("express");

const router = express.Router();

const {
  getQueue,
  getBestPlace,
  removeBestPlace,
} = require("../controllers/priorityQueueController");

router.get("/", getQueue);

router.get("/best", getBestPlace);

router.delete("/best", removeBestPlace);

module.exports = router;