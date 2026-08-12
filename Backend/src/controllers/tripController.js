const Trip = require("../models/trip");

// Save Trip
const saveTrip = async (req, res) => {
  try {
    const { start, destination, distance, route } = req.body;

    const trip = await Trip.create({
      user: req.user._id,
      start,
      destination,
      distance,
      route,
    });

    res.status(201).json({
      success: true,
      message: "Trip saved successfully",
      data: trip,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get User Trips
const getTrips = async (req, res) => {
  try {
    const trips = await Trip.find({
      user: req.user._id,
    }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: trips.length,
      data: trips,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  saveTrip,
  getTrips,
};