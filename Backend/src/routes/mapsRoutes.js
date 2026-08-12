const express = require("express");

const router = express.Router();

const { getRoute } = require("../controllers/mapsController");

router.get("/route", getRoute);

module.exports = router;