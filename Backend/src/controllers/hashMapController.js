const placeMap = require("../services/placeMapService");

const getPlacesByCity = (req, res) => {
  const { city } = req.params;

  const places = placeMap.getPlaces(city);

  res.json({
    success: true,
    city,
    count: places.length,
    places,
  });
};

const displayHashMap = (req, res) => {
  res.json({
    success: true,
    data: placeMap.display(),
  });
};

module.exports = {
  getPlacesByCity,
  displayHashMap,
};