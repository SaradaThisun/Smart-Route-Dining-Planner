class PlaceHashMap {
  constructor() {
    this.map = new Map();
  }

  // Add a place to a city
  addPlace(city, place) {
    if (!this.map.has(city)) {
      this.map.set(city, []);
    }

    this.map.get(city).push(place);
  }

  // Get all places in a city
  getPlaces(city) {
    return this.map.get(city) || [];
  }

  // Show all data
  display() {
    return Object.fromEntries(this.map);
  }
}

module.exports = PlaceHashMap;