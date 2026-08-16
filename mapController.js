const googleMapsService = require("../services/googleMapsService");

const getRoute = async (req, res) => {
  try {
    const { origin, destination } = req.query;

    if (!origin || !destination) {
      return res.status(400).json({
        success: false,
        message: "Origin and destination are required.",
      });
    }

    const route = await googleMapsService.getRoute(origin, destination);

    res.status(200).json({
      success: true,
      data: route,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch route.",
    });
  }
};

module.exports = {
  getRoute,
};
