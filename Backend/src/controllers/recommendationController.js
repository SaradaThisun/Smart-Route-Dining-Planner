const { recommendPlaces } = require("../services/recommendationService");
const Place = require("../models/Place");

const getRecommendations = (req, res) => {
  const { start, end } = req.query;

  if (!start || !end) {
    return res.status(400).json({
      success: false,
      message: "Start and End are required",
    });
  }

  const result = recommendPlaces(start, end);

  res.json({
    success: true,
    data: result,
  });
};

const getRouteRecommendations = async (req, res) => {
  try {
    const { cities } = req.body;

    if (!cities || !Array.isArray(cities) || cities.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Cities are required",
      });
    }

    const restaurants = await Place.find({
      city: { $in: cities },
      type: "restaurant",
    }).sort({ rating: -1 });

    const hotels = await Place.find({
      city: { $in: cities },
      type: "hotel",
    }).sort({ rating: -1 });

    res.status(200).json({
      success: true,
      restaurants,
      hotels,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getRecommendations,
  getRouteRecommendations,
};
