// routeUtils.js
// Handles route-related geo math using turf.js:
// - distance of a restaurant from the route line (to filter out ones too far away)
// - distance ALONG the route to reach that restaurant (used for the Route Ruler positions)

const turf = require('@turf/turf');

function buildRouteLine(routeCoords) {
  // routeCoords: array of [lng, lat] points representing the path
  // turf expects [lng, lat] order (opposite of how we usually write lat/lng!)
  return turf.lineString(routeCoords);
}

function distanceFromRoute(routeLine, restaurantLat, restaurantLng) {
  // Returns the shortest distance (in km) from a restaurant to the route line
  const point = turf.point([restaurantLng, restaurantLat]);
  const nearest = turf.nearestPointOnLine(routeLine, point);
  return nearest.properties.dist; // distance in km
}

function distanceAlongRoute(routeLine, restaurantLat, restaurantLng) {
  // Returns how far along the route (in km, from the start) the
  // closest point to this restaurant is. This is what positions
  // the restaurant on the Route Ruler.
  const point = turf.point([restaurantLng, restaurantLat]);
  const nearest = turf.nearestPointOnLine(routeLine, point);
  return nearest.properties.location; // distance along the line in km
}

function getTotalRouteDistance(routeLine) {
  return turf.length(routeLine, { units: 'kilometers' });
}

module.exports = {
  buildRouteLine,
  distanceFromRoute,
  distanceAlongRoute,
  getTotalRouteDistance,
};