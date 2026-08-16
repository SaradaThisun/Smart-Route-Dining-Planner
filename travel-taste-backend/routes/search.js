// routes/search.js
// Search endpoint that uses HashMap for city-based lookups
// and BST for rating-based filtering.

const express = require('express');
const router = express.Router();

const restaurants = require('../data/restaurants.json');
const PlaceHashMap = require('../HashMap');
const { BinarySearchTree } = require('../utils/bst');

// Build HashMap index: group restaurants by city (extracted from name)
const cityMap = new PlaceHashMap();

// Map each restaurant to a city/region based on its name or known location
const CITY_MAPPING = {
  'Colombo': { minLat: 6.85, maxLat: 6.98, minLng: 79.82, maxLng: 79.90 },
  'Kandy': { minLat: 7.25, maxLat: 7.35, minLng: 80.60, maxLng: 80.70 },
  'Ella': { minLat: 6.82, maxLat: 6.90, minLng: 81.00, maxLng: 81.10 },
  'Galle': { minLat: 6.00, maxLat: 6.05, minLng: 80.18, maxLng: 80.25 },
  'Nuwara Eliya': { minLat: 6.90, maxLat: 6.98, minLng: 80.75, maxLng: 80.82 },
  'Sigiriya': { minLat: 7.90, maxLat: 7.98, minLng: 80.72, maxLng: 80.80 },
  'Dambulla': { minLat: 7.82, maxLat: 7.90, minLng: 80.62, maxLng: 80.70 },
  'Anuradhapura': { minLat: 8.28, maxLat: 8.38, minLng: 80.37, maxLng: 80.45 },
  'Trincomalee': { minLat: 8.55, maxLat: 8.62, minLng: 81.18, maxLng: 81.25 },
  'Jaffna': { minLat: 9.62, maxLat: 9.70, minLng: 79.98, maxLng: 80.08 },
  'Mirissa': { minLat: 5.92, maxLat: 5.98, minLng: 80.42, maxLng: 80.50 },
  'Hikkaduwa': { minLat: 6.10, maxLat: 6.18, minLng: 80.08, maxLng: 80.15 },
  'Matara': { minLat: 5.92, maxLat: 5.98, minLng: 80.50, maxLng: 80.58 },
  'Polonnaruwa': { minLat: 7.90, maxLat: 7.98, minLng: 80.98, maxLng: 81.06 },
  'Bentota': { minLat: 6.40, maxLat: 6.46, minLng: 79.97, maxLng: 80.03 },
  'Negombo': { minLat: 7.17, maxLat: 7.25, minLng: 79.80, maxLng: 79.88 },
  'Haputale': { minLat: 6.72, maxLat: 6.80, minLng: 80.92, maxLng: 81.00 },
  'Arugam Bay': { minLat: 6.80, maxLat: 6.88, minLng: 81.80, maxLng: 81.88 },
  'Unawatuna': { minLat: 5.98, maxLat: 6.05, minLng: 80.22, maxLng: 80.28 },
};

// Assign restaurants to cities using coordinate bounds
function getCityForRestaurant(restaurant) {
  for (const [city, bounds] of Object.entries(CITY_MAPPING)) {
    if (
      restaurant.lat >= bounds.minLat &&
      restaurant.lat <= bounds.maxLat &&
      restaurant.lng >= bounds.minLng &&
      restaurant.lng <= bounds.maxLng
    ) {
      return city;
    }
  }
  return 'Other';
}

// Build the city HashMap index on startup
restaurants.forEach((restaurant) => {
  const city = getCityForRestaurant(restaurant);
  cityMap.addPlace(city, { ...restaurant, city });
});

// Build BST index for rating-based queries
const ratingBST = BinarySearchTree.fromRestaurants(restaurants, 'rating');

// Build BST index for price-based queries
const priceBST = BinarySearchTree.fromRestaurants(restaurants, 'price');

/**
 * GET /search
 * Search restaurants using HashMap (city) and BST (rating/price) indexes.
 * 
 * Query parameters:
 *   - city (string): City name for HashMap lookup
 *   - cuisine (string): Cuisine type filter
 *   - minRating (number): Minimum rating (uses BST)
 *   - maxPrice (number): Maximum price level (uses BST)
 *   - q (string): General text search across name and cuisine
 */
router.get('/', (req, res) => {
  try {
    const { city, cuisine, minRating, maxPrice, q } = req.query;
    let results = [];

    // City-based lookup using HashMap (O(1) lookup)
    if (city) {
      const cityResults = cityMap.getPlaces(city);
      if (cityResults.length > 0) {
        results = cityResults;
      } else {
        // Try case-insensitive partial match
        const allData = cityMap.display();
        for (const [cityName, places] of Object.entries(allData)) {
          if (cityName.toLowerCase().includes(city.toLowerCase())) {
            results.push(...places);
          }
        }
      }
    } else {
      // If no city specified, start with all restaurants
      results = [...restaurants];
    }

    // Rating filter using BST (O(log n + k))
    if (minRating) {
      const ratingThreshold = parseFloat(minRating);
      const ratedResults = ratingBST.findGreaterThanOrEqual(ratingThreshold);
      const ratedIds = new Set(ratedResults.map((r) => r.id));
      results = results.filter((r) => ratedIds.has(r.id));
    }

    // Price filter using BST (O(log n + k))
    if (maxPrice) {
      const priceThreshold = parseInt(maxPrice, 10);
      const pricedResults = priceBST.findLessThanOrEqual(priceThreshold);
      const pricedIds = new Set(pricedResults.map((r) => r.id));
      results = results.filter((r) => pricedIds.has(r.id));
    }

    // Cuisine filter
    if (cuisine) {
      results = results.filter((r) =>
        r.cuisine.toLowerCase().includes(cuisine.toLowerCase())
      );
    }

    // General text search
    if (q) {
      const query = q.toLowerCase();
      results = results.filter(
        (r) =>
          r.name.toLowerCase().includes(query) ||
          r.cuisine.toLowerCase().includes(query)
      );
    }

    res.json({
      count: results.length,
      filters: {
        city: city || null,
        cuisine: cuisine || null,
        minRating: minRating || null,
        maxPrice: maxPrice || null,
        query: q || null,
      },
      restaurants: results,
    });
  } catch (error) {
    console.error('Search error:', error);
    res.status(500).json({ error: 'Search failed' });
  }
});

/**
 * GET /search/cities
 * List all available cities with restaurant counts.
 * Uses the HashMap to provide instant city listing.
 */
router.get('/cities', (req, res) => {
  try {
    const allData = cityMap.display();
    const cities = Object.entries(allData).map(([city, places]) => ({
      city,
      count: places.length,
    }));

    res.json({
      totalCities: cities.length,
      cities: cities.sort((a, b) => b.count - a.count),
    });
  } catch (error) {
    console.error('Cities list error:', error);
    res.status(500).json({ error: 'Failed to list cities' });
  }
});

module.exports = router;
