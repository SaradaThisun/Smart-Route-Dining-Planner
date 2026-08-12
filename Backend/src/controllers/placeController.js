const Place = require("../models/Place");

// Get all places
const getPlaces = async (req, res) => {
  try {
    const { type, city } = req.query;

    const filter = {};

    if (type) filter.type = type;
    if (city) filter.city = city;

    const places = await Place.find(filter);

    res.status(200).json({
      success: true,
      count: places.length,
      data: places,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Create a place
const createPlace = async (req, res) => {
  try {
    const place = await Place.create(req.body);

    res.status(201).json({
      success: true,
      data: place,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getPlaces,
  createPlace,
};