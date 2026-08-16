// middleware/validateRequest.js
// Input validation middleware for API endpoints.
// Validates request body structure and types before reaching route handlers.

/**
 * Validates the POST /recommend request body.
 * Ensures routeCoords is a valid array of [lng, lat] coordinate pairs,
 * and preferences (if provided) contain valid types and ranges.
 */
function validateRecommendRequest(req, res, next) {
  const { routeCoords, preferences } = req.body;

  // Validate routeCoords existence and type
  if (!routeCoords) {
    return res.status(400).json({
      error: 'Missing required field: routeCoords',
      details: 'routeCoords must be an array of [lng, lat] coordinate pairs',
    });
  }

  if (!Array.isArray(routeCoords)) {
    return res.status(400).json({
      error: 'Invalid type: routeCoords must be an array',
    });
  }

  if (routeCoords.length < 2) {
    return res.status(400).json({
      error: 'routeCoords must contain at least 2 coordinate pairs',
    });
  }

  // Validate each coordinate pair
  for (let i = 0; i < routeCoords.length; i++) {
    const coord = routeCoords[i];

    if (!Array.isArray(coord) || coord.length !== 2) {
      return res.status(400).json({
        error: `Invalid coordinate at index ${i}: each coordinate must be a [lng, lat] pair`,
      });
    }

    const [lng, lat] = coord;

    if (typeof lng !== 'number' || typeof lat !== 'number') {
      return res.status(400).json({
        error: `Invalid coordinate at index ${i}: lng and lat must be numbers`,
      });
    }

    if (lat < -90 || lat > 90) {
      return res.status(400).json({
        error: `Invalid latitude at index ${i}: must be between -90 and 90`,
      });
    }

    if (lng < -180 || lng > 180) {
      return res.status(400).json({
        error: `Invalid longitude at index ${i}: must be between -180 and 180`,
      });
    }
  }

  // Validate preferences (optional)
  if (preferences !== undefined) {
    if (typeof preferences !== 'object' || Array.isArray(preferences)) {
      return res.status(400).json({
        error: 'Invalid type: preferences must be an object',
      });
    }

    const { cuisine, budget, maxDistance, halal, vegetarian } = preferences;

    if (cuisine !== undefined && typeof cuisine !== 'string') {
      return res.status(400).json({
        error: 'Invalid type: preferences.cuisine must be a string',
      });
    }

    if (budget !== undefined) {
      if (typeof budget !== 'number' || budget < 1 || budget > 3) {
        return res.status(400).json({
          error: 'Invalid value: preferences.budget must be a number between 1 and 3',
        });
      }
    }

    if (maxDistance !== undefined) {
      if (typeof maxDistance !== 'number' || maxDistance <= 0) {
        return res.status(400).json({
          error: 'Invalid value: preferences.maxDistance must be a positive number',
        });
      }
    }

    if (halal !== undefined && typeof halal !== 'boolean') {
      return res.status(400).json({
        error: 'Invalid type: preferences.halal must be a boolean',
      });
    }

    if (vegetarian !== undefined && typeof vegetarian !== 'boolean') {
      return res.status(400).json({
        error: 'Invalid type: preferences.vegetarian must be a boolean',
      });
    }
  }

  next();
}

/**
 * Validates restaurant data for POST/PUT /restaurants endpoints.
 */
function validateRestaurantData(req, res, next) {
  const { name, lat, lng, rating, cuisine, price } = req.body;

  if (!name || typeof name !== 'string' || name.trim().length === 0) {
    return res.status(400).json({
      error: 'Missing or invalid field: name must be a non-empty string',
    });
  }

  if (typeof lat !== 'number' || lat < -90 || lat > 90) {
    return res.status(400).json({
      error: 'Invalid field: lat must be a number between -90 and 90',
    });
  }

  if (typeof lng !== 'number' || lng < -180 || lng > 180) {
    return res.status(400).json({
      error: 'Invalid field: lng must be a number between -180 and 180',
    });
  }

  if (typeof rating !== 'number' || rating < 0 || rating > 5) {
    return res.status(400).json({
      error: 'Invalid field: rating must be a number between 0 and 5',
    });
  }

  if (!cuisine || typeof cuisine !== 'string') {
    return res.status(400).json({
      error: 'Missing or invalid field: cuisine must be a non-empty string',
    });
  }

  if (typeof price !== 'number' || price < 1 || price > 3) {
    return res.status(400).json({
      error: 'Invalid field: price must be a number between 1 and 3',
    });
  }

  next();
}

module.exports = { validateRecommendRequest, validateRestaurantData };
