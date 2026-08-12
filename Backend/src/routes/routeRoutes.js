const express = require("express");

const router = express.Router();

const {
  displayGraph,
  getNeighbors,
  shortestRoute,
} = require("../controllers/routeController");

router.get("/graph", displayGraph);
router.get("/shortest-path", shortestRoute);
router.get("/neighbors/:city", getNeighbors);

module.exports = router;