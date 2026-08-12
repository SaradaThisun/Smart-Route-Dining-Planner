const PlaceHashMap = require("../dataStructures/HashMap");

const placeMap = new PlaceHashMap();

// Sample Data
placeMap.addPlace("Colombo", {
  name: "Pizza Hut Colombo",
  type: "restaurant",
  rating: 4.5,
});

placeMap.addPlace("Colombo", {
  name: "Shangri-La Colombo",
  type: "hotel",
  rating: 5.0,
});

placeMap.addPlace("Kandy", {
  name: "KFC Kandy",
  type: "restaurant",
  rating: 4.3,
});

placeMap.addPlace("Kandy", {
  name: "Earl's Regency",
  type: "hotel",
  rating: 4.8,
});

placeMap.addPlace("Kegalle", {
  name: "Cafe Kegalle",
  type: "cafe",
  rating: 4.1,
});

module.exports = placeMap;