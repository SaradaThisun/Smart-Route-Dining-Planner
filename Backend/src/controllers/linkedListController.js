const list = require("../services/linkedListService");

const getRecommendations = (req, res) => {

    res.json({
        success: true,
        total: list.size(),
        recommendations: list.toArray()
    });

};

module.exports = {
    getRecommendations
};