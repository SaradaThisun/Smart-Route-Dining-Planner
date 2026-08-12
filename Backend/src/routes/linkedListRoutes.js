const express = require("express");

const router = express.Router();

const {
    getRecommendations
} = require("../controllers/linkedListController");

router.get("/", getRecommendations);

module.exports = router;