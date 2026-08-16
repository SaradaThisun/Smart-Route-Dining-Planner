const { LinkedList } = require('./linkedList');

function getGridKey(lat, lng, precision = 10) {
  const roundedLat = Math.round(lat * precision) / precision;
  const roundedLng = Math.round(lng * precision) / precision;
  return `${roundedLat}_${roundedLng}`;
}

function buildGridIndex(restaurants, precision = 10) {
  const grid = {}; 

  restaurants.forEach((restaurant) => {
    const key = getGridKey(restaurant.lat, restaurant.lng, precision);
    if (!grid[key]) {
      grid[key] = new LinkedList();
    }
    grid[key].append(restaurant);
  });

  return grid;
}

function getNearbyRestaurants(grid, lat, lng, precision = 10) {
  const results = [];
  const cellSize = 1 / precision;

  for (let latOffset = -1; latOffset <= 1; latOffset++) {
    for (let lngOffset = -1; lngOffset <= 1; lngOffset++) {
      const checkLat = lat + latOffset * cellSize;
      const checkLng = lng + lngOffset * cellSize;
      const key = getGridKey(checkLat, checkLng, precision);
      if (grid[key]) {
        grid[key].forEach((restaurant) => results.push(restaurant));
      }
    }
  }

  const uniqueResults = Array.from(
    new Map(results.map((r) => [r.id, r])).values()
  );

  return uniqueResults;
}

module.exports = { buildGridIndex, getNearbyRestaurants, getGridKey };