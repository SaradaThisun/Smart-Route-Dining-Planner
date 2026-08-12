const Place = require("../models/Place");
const PlaceHashMap = require("../dataStructures/HashMap");

const placeMap = new PlaceHashMap();

const loadPlaces = async () => {
  const places = await Place.find();

  // Clear existing data
  placeMap.map.clear();

  places.forEach((place) => {
    placeMap.addPlace(place.city, place);
  });

  console.log(`✅ Loaded ${places.length} places into HashMap`);

  return placeMap;
};

module.exports = {
  loadPlaces,
  placeMap,
};