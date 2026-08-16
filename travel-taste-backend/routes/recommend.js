const express = require('express');
const router = express.Router();

const { validateRecommendRequest } = require('../middleware/validateRequest');
const restaurants = require('../data/restaurants.json');
const { buildGridIndex, getNearbyRestaurants } = require('../utils/gridIndex');
const {
  buildRouteLine,
  distanceFromRoute,
  distanceAlongRoute,
  getTotalRouteDistance,
} = require('../utils/routeUtils');
const { Graph } = require('../utils/graph');
const { rankRestaurants } = require('../utils/rankUtils');

const restaurantGrid = buildGridIndex(restaurants);

router.post('/', validateRecommendRequest, (req, res) => {
  try {
    const { routeCoords, preferences } = req.body;

    if (!routeCoords || routeCoords.length < 2) {
      return res.status(400).json({
        error: 'routeCoords must be an array of at least 2 [lng, lat] points',
      });
    }

    const routeLine = buildRouteLine(routeCoords);
    const totalDistance = getTotalRouteDistance(routeLine);
    // Build the Graph representation of the route (used to validate/verify total distance)
    const routeGraph = Graph.fromRouteCoords(routeCoords);
    const graphTotalDistance = routeGraph.getTotalDistance();

    const candidateMap = new Map();
    routeCoords.forEach(([lng, lat]) => {
      const nearby = getNearbyRestaurants(restaurantGrid, lat, lng);
      nearby.forEach((r) => candidateMap.set(r.id, r));
    });
    const candidates = Array.from(candidateMap.values());

    const withDistances = candidates
      .map((restaurant) => {
        const distFromRoute = distanceFromRoute(routeLine, restaurant.lat, restaurant.lng);
        const distAlongRoute = distanceAlongRoute(routeLine, restaurant.lat, restaurant.lng);
        return { restaurant, distanceFromRoute: distFromRoute, distanceAlongRoute: distAlongRoute };
      })
      .filter((r) => r.distanceFromRoute <= (preferences?.maxDistance || 10));

    const rankedList = rankRestaurants(withDistances, preferences || {});
    const ranked = rankedList.toArray(); // convert Linked List to array only for JSON output

    res.json({
      totalDistance: Math.round(totalDistance * 10) / 10,
      graphTotalDistance: Math.round(graphTotalDistance * 10) / 10,
      count: ranked.length,
      restaurants: ranked.map((r) => ({
        id: r.id,
        name: r.name,
        rating: r.rating,
        cuisine: r.cuisine,
        price: r.price,
        halal: r.halal,
        vegetarian: r.vegetarian,
        parking: r.parking,
        familyFriendly: r.familyFriendly,
        openingHours: r.openingHours,
        image: r.image,
        km: Math.round(r.distanceAlongRoute * 10) / 10,
        distanceFromRoute: Math.round(r.distanceFromRoute * 10) / 10,
        score: Math.round(r.score * 10) / 10,
      })),
    });
  } catch (error) {
    console.error('Recommend error:', error);
    res.status(500).json({ error: 'Something went wrong generating recommendations' });
  }
});

module.exports = router;