const axios = require("axios");

const GOOGLE_API_KEY = process.env.GOOGLE_MAPS_API_KEY;

const getRoute = async (origin, destination) => {
  try {
    const url = "https://maps.googleapis.com/maps/api/directions/json";

    const response = await axios.get(url, {
      params: {
        origin,
        destination,
        key: GOOGLE_API_KEY,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Google Directions API Error:", error.message);
    throw error;
  }
};

module.exports = {
  getRoute,
};