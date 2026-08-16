// routes/restaurants.js
// Full CRUD (Create, Read, Update, Delete) API for restaurant management.
// Uses the restaurants.json file as a simple data store.
// In production, this would be replaced with a database.

const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

const { validateRestaurantData } = require('../middleware/validateRequest');
const { BinarySearchTree } = require('../utils/bst');

const DATA_PATH = path.join(__dirname, '../data/restaurants.json');

// Helper: Load restaurants from JSON file
function loadRestaurants() {
  const raw = fs.readFileSync(DATA_PATH, 'utf8');
  return JSON.parse(raw);
}

// Helper: Save restaurants to JSON file
function saveRestaurants(restaurants) {
  fs.writeFileSync(DATA_PATH, JSON.stringify(restaurants, null, 2), 'utf8');
}

/**
 * GET /restaurants
 * List all restaurants with optional filters.
 * 
 * Query parameters:
 *   - cuisine (string): Filter by cuisine type (partial match, case-insensitive)
 *   - halal (boolean): Filter halal restaurants
 *   - vegetarian (boolean): Filter vegetarian restaurants
 *   - minRating (number): Minimum rating threshold
 *   - maxPrice (number): Maximum price level (1-3)
 *   - familyFriendly (boolean): Filter family-friendly restaurants
 *   - parking (boolean): Filter restaurants with parking
 *   - sortBy (string): Sort field — 'rating', 'price', or 'name'
 *   - order (string): Sort order — 'asc' or 'desc' (default: 'desc' for rating, 'asc' for others)
 */
router.get('/', (req, res) => {
  try {
    let restaurants = loadRestaurants();

    // Apply filters
    const { cuisine, halal, vegetarian, minRating, maxPrice, familyFriendly, parking, sortBy, order } = req.query;

    if (cuisine) {
      restaurants = restaurants.filter((r) =>
        r.cuisine.toLowerCase().includes(cuisine.toLowerCase())
      );
    }

    if (halal !== undefined) {
      restaurants = restaurants.filter((r) => r.halal === (halal === 'true'));
    }

    if (vegetarian !== undefined) {
      restaurants = restaurants.filter((r) => r.vegetarian === (vegetarian === 'true'));
    }

    if (familyFriendly !== undefined) {
      restaurants = restaurants.filter((r) => r.familyFriendly === (familyFriendly === 'true'));
    }

    if (parking !== undefined) {
      restaurants = restaurants.filter((r) => r.parking === (parking === 'true'));
    }

    // Use BST for efficient rating-based filtering
    if (minRating) {
      const ratingBST = BinarySearchTree.fromRestaurants(restaurants, 'rating');
      restaurants = ratingBST.findGreaterThanOrEqual(parseFloat(minRating));
    }

    if (maxPrice) {
      restaurants = restaurants.filter((r) => r.price <= parseInt(maxPrice, 10));
    }

    // Apply sorting
    if (sortBy) {
      const sortOrder = order || (sortBy === 'rating' ? 'desc' : 'asc');
      restaurants.sort((a, b) => {
        if (sortBy === 'name') {
          return sortOrder === 'asc'
            ? a.name.localeCompare(b.name)
            : b.name.localeCompare(a.name);
        }
        return sortOrder === 'asc' ? a[sortBy] - b[sortBy] : b[sortBy] - a[sortBy];
      });
    }

    res.json({
      count: restaurants.length,
      restaurants,
    });
  } catch (error) {
    console.error('List restaurants error:', error);
    res.status(500).json({ error: 'Failed to retrieve restaurants' });
  }
});

/**
 * GET /restaurants/:id
 * Get a single restaurant by ID.
 */
router.get('/:id', (req, res) => {
  try {
    const restaurants = loadRestaurants();
    const restaurant = restaurants.find((r) => r.id === parseInt(req.params.id, 10));

    if (!restaurant) {
      return res.status(404).json({ error: `Restaurant with id ${req.params.id} not found` });
    }

    res.json(restaurant);
  } catch (error) {
    console.error('Get restaurant error:', error);
    res.status(500).json({ error: 'Failed to retrieve restaurant' });
  }
});

/**
 * POST /restaurants
 * Add a new restaurant.
 * Automatically assigns the next available ID.
 */
router.post('/', validateRestaurantData, (req, res) => {
  try {
    const restaurants = loadRestaurants();
    const { name, lat, lng, rating, cuisine, price, halal, vegetarian, parking, familyFriendly, openingHours, image } = req.body;

    // Generate next ID
    const maxId = restaurants.reduce((max, r) => Math.max(max, r.id), 0);

    const newRestaurant = {
      id: maxId + 1,
      name,
      lat,
      lng,
      rating,
      cuisine,
      price,
      halal: halal || false,
      vegetarian: vegetarian || false,
      parking: parking || false,
      familyFriendly: familyFriendly || false,
      openingHours: openingHours || 'Not specified',
      image: image || '',
    };

    restaurants.push(newRestaurant);
    saveRestaurants(restaurants);

    res.status(201).json({
      message: 'Restaurant created successfully',
      restaurant: newRestaurant,
    });
  } catch (error) {
    console.error('Create restaurant error:', error);
    res.status(500).json({ error: 'Failed to create restaurant' });
  }
});

/**
 * PUT /restaurants/:id
 * Update an existing restaurant.
 */
router.put('/:id', (req, res) => {
  try {
    const restaurants = loadRestaurants();
    const index = restaurants.findIndex((r) => r.id === parseInt(req.params.id, 10));

    if (index === -1) {
      return res.status(404).json({ error: `Restaurant with id ${req.params.id} not found` });
    }

    // Merge existing data with updates (preserving ID)
    const updated = {
      ...restaurants[index],
      ...req.body,
      id: restaurants[index].id, // Prevent ID change
    };

    restaurants[index] = updated;
    saveRestaurants(restaurants);

    res.json({
      message: 'Restaurant updated successfully',
      restaurant: updated,
    });
  } catch (error) {
    console.error('Update restaurant error:', error);
    res.status(500).json({ error: 'Failed to update restaurant' });
  }
});

/**
 * DELETE /restaurants/:id
 * Delete a restaurant by ID.
 */
router.delete('/:id', (req, res) => {
  try {
    const restaurants = loadRestaurants();
    const index = restaurants.findIndex((r) => r.id === parseInt(req.params.id, 10));

    if (index === -1) {
      return res.status(404).json({ error: `Restaurant with id ${req.params.id} not found` });
    }

    const deleted = restaurants.splice(index, 1)[0];
    saveRestaurants(restaurants);

    res.json({
      message: 'Restaurant deleted successfully',
      restaurant: deleted,
    });
  } catch (error) {
    console.error('Delete restaurant error:', error);
    res.status(500).json({ error: 'Failed to delete restaurant' });
  }
});

module.exports = router;
