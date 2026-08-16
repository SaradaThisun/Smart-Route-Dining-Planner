// routes/optimizeStops.js
// Optimal Stop Planner — a Travelling Salesman Problem (TSP) inspired algorithm.
// Given a set of restaurant stops along a route, finds the best visiting order
// using the Nearest Neighbor heuristic to minimize total detour distance.

const express = require('express');
const router = express.Router();
const turf = require('@turf/turf');

const restaurants = require('../data/restaurants.json');
const { Graph } = require('../utils/graph');

/**
 * Calculates the Haversine distance between two points (in km).
 * @param {number} lat1 - Latitude of point 1
 * @param {number} lng1 - Longitude of point 1
 * @param {number} lat2 - Latitude of point 2
 * @param {number} lng2 - Longitude of point 2
 * @returns {number} Distance in kilometers
 */
function haversineDistance(lat1, lng1, lat2, lng2) {
  const from = turf.point([lng1, lat1]);
  const to = turf.point([lng2, lat2]);
  return turf.distance(from, to, { units: 'kilometers' });
}

/**
 * Nearest Neighbor Heuristic for TSP
 * Starts from the first stop and always visits the nearest unvisited stop next.
 * This is a greedy algorithm that produces a good (not necessarily optimal) solution.
 *
 * Time Complexity: O(n²) where n is the number of stops
 * Space Complexity: O(n) for visited tracking
 *
 * @param {Array} stops - Array of { id, lat, lng, name, ... }
 * @param {Object} startPoint - { lat, lng } starting coordinates
 * @returns {Array} Ordered array of stops in optimal visiting sequence
 */
function nearestNeighborTSP(stops, startPoint) {
  if (stops.length <= 1) return stops;

  const visited = new Set();
  const ordered = [];
  let currentLat = startPoint.lat;
  let currentLng = startPoint.lng;

  while (ordered.length < stops.length) {
    let nearestDist = Infinity;
    let nearestStop = null;

    for (const stop of stops) {
      if (visited.has(stop.id)) continue;

      const dist = haversineDistance(currentLat, currentLng, stop.lat, stop.lng);
      if (dist < nearestDist) {
        nearestDist = dist;
        nearestStop = stop;
      }
    }

    if (nearestStop) {
      visited.add(nearestStop.id);
      ordered.push({
        ...nearestStop,
        distanceFromPrevious: Math.round(nearestDist * 100) / 100,
      });
      currentLat = nearestStop.lat;
      currentLng = nearestStop.lng;
    }
  }

  return ordered;
}

/**
 * Calculates the total distance of a given stop order.
 * @param {Array} orderedStops - Stops in visiting order
 * @param {Object} startPoint - Starting coordinates
 * @param {Object} endPoint - Ending coordinates
 * @returns {number} Total trip distance in km
 */
function calculateTotalTripDistance(orderedStops, startPoint, endPoint) {
  let total = 0;
  let prevLat = startPoint.lat;
  let prevLng = startPoint.lng;

  for (const stop of orderedStops) {
    total += haversineDistance(prevLat, prevLng, stop.lat, stop.lng);
    prevLat = stop.lat;
    prevLng = stop.lng;
  }

  // Add distance from last stop to destination
  total += haversineDistance(prevLat, prevLng, endPoint.lat, endPoint.lng);

  return Math.round(total * 100) / 100;
}

/**
 * POST /optimize-stops
 * Given a start point, end point, and a list of restaurant IDs (or auto-select),
 * returns the optimal visiting order using the nearest-neighbor TSP heuristic.
 *
 * Request body:
 *   - startPoint: { lat, lng } — journey start
 *   - endPoint: { lat, lng } — journey destination
 *   - restaurantIds: [number] — specific restaurant IDs to visit (optional)
 *   - maxStops: number — max number of stops if auto-selecting (default: 5)
 *   - maxDetour: number — max detour distance in km (default: 15)
 */
router.post('/', (req, res) => {
  try {
    const { startPoint, endPoint, restaurantIds, maxStops = 5, maxDetour = 15 } = req.body;

    if (!startPoint || !startPoint.lat || !startPoint.lng) {
      return res.status(400).json({ error: 'startPoint with lat and lng is required' });
    }

    if (!endPoint || !endPoint.lat || !endPoint.lng) {
      return res.status(400).json({ error: 'endPoint with lat and lng is required' });
    }

    let selectedStops;

    if (restaurantIds && Array.isArray(restaurantIds) && restaurantIds.length > 0) {
      // Use specified restaurants
      selectedStops = restaurants.filter((r) => restaurantIds.includes(r.id));
    } else {
      // Auto-select: find restaurants near the direct route line
      const routeLine = turf.lineString([
        [startPoint.lng, startPoint.lat],
        [endPoint.lng, endPoint.lat],
      ]);

      selectedStops = restaurants
        .map((r) => {
          const point = turf.point([r.lng, r.lat]);
          const nearest = turf.nearestPointOnLine(routeLine, point);
          return { ...r, detourDistance: nearest.properties.dist };
        })
        .filter((r) => r.detourDistance <= maxDetour)
        .sort((a, b) => b.rating - a.rating) // Prefer higher rated
        .slice(0, maxStops);
    }

    if (selectedStops.length === 0) {
      return res.json({
        message: 'No restaurants found along this route within the specified detour distance',
        directDistance: Math.round(haversineDistance(startPoint.lat, startPoint.lng, endPoint.lat, endPoint.lng) * 100) / 100,
        optimizedStops: [],
        totalTripDistance: 0,
      });
    }

    // Apply nearest-neighbor TSP to find optimal visiting order
    const optimizedOrder = nearestNeighborTSP(selectedStops, startPoint);

    // Calculate distances
    const directDistance = haversineDistance(startPoint.lat, startPoint.lng, endPoint.lat, endPoint.lng);
    const totalTripDistance = calculateTotalTripDistance(optimizedOrder, startPoint, endPoint);
    const extraDistance = totalTripDistance - directDistance;

    // Build the graph for visualization
    const graph = new Graph();
    graph.addNode('start', startPoint.lat, startPoint.lng);
    optimizedOrder.forEach((stop, i) => {
      graph.addNode(`stop_${i}`, stop.lat, stop.lng);
    });
    graph.addNode('end', endPoint.lat, endPoint.lng);

    res.json({
      directDistance: Math.round(directDistance * 100) / 100,
      totalTripDistance,
      extraDistance: Math.round(extraDistance * 100) / 100,
      stopsCount: optimizedOrder.length,
      optimizedStops: optimizedOrder.map((stop, index) => ({
        order: index + 1,
        id: stop.id,
        name: stop.name,
        lat: stop.lat,
        lng: stop.lng,
        rating: stop.rating,
        cuisine: stop.cuisine,
        price: stop.price,
        distanceFromPrevious: stop.distanceFromPrevious,
      })),
    });
  } catch (error) {
    console.error('Optimize stops error:', error);
    res.status(500).json({ error: 'Failed to optimize stops' });
  }
});

module.exports = router;
