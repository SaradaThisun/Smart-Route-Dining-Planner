// gridIndex.js
// Implements a Hash Map for fast restaurant lookup by location.
// Instead of checking every restaurant against the route one-by-one (slow),
// we bucket restaurants into grid cells based on rounded lat/lng.
// This means we only need to check restaurants in nearby cells — much faster
// than scanning the entire dataset for every route segment.

function getGridKey(lat, lng, precision = 10) {
  // Rounds coordinates to create a grid cell key, e.g. "6.9_79.9"
  const roundedLat = Math.round(lat * precision) / precision;
  const roundedLng = Math.round(lng * precision) / precision;
  return `${roundedLat}_${roundedLng}`;
}

function buildGridIndex(restaurants, precision = 10) {
  // This is the actual Hash Map: a plain JS object acting as
  // key -> array of restaurants in that grid cell
  const grid = {};

  restaurants.forEach((restaurant) => {
    const key = getGridKey(restaurant.lat, restaurant.lng, precision);
    if (!grid[key]) {
      grid[key] = [];
    }
    grid[key].push(restaurant);
  });

  return grid;
}

function getNearbyRestaurants(grid, lat, lng, precision = 10) {
  // Checks the exact cell plus 8 surrounding cells (3x3 area)
  // so we don't miss restaurants just across a cell boundary
  const results = [];
  const cellSize = 1 / precision;

  for (let latOffset = -1; latOffset <= 1; latOffset++) {
    for (let lngOffset = -1; lngOffset <= 1; lngOffset++) {
      const checkLat = lat + latOffset * cellSize;
      const checkLng = lng + lngOffset * cellSize;
      const key = getGridKey(checkLat, checkLng, precision);
      if (grid[key]) {
        results.push(...grid[key]);
      }
    }
  }

  // Remove duplicates (a restaurant might appear in multiple checked cells)
  const uniqueResults = Array.from(
    new Map(results.map((r) => [r.id, r])).values()
  );

  return uniqueResults;
}

module.exports = { buildGridIndex, getNearbyRestaurants, getGridKey };