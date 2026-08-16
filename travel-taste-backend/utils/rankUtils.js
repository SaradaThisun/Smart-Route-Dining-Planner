// rankUtils.js
// Priority Queue for scoring/ranking restaurants.
// Final sorted results are stored in a Linked List.

const { LinkedList } = require('./linkedList');

class PriorityQueue {
  constructor() {
    this.items = [];
  }

  enqueue(item, priority) {
    this.items.push({ item, priority });
    this.items.sort((a, b) => b.priority - a.priority);
  }

  dequeue() {
    return this.items.shift();
  }

  toLinkedList() {
    // Builds a Linked List from the sorted priority queue items
    const list = new LinkedList();
    this.items.forEach((entry) => list.append(entry.item));
    return list;
  }

  isEmpty() {
    return this.items.length === 0;
  }
}

function calculateScore(restaurant, distanceFromRoute, preferences = {}) {
  let score = 0;

  score += (restaurant.rating / 5) * 40;

  const maxRelevantDistance = preferences.maxDistance || 10;
  const distanceScore = Math.max(0, 1 - distanceFromRoute / maxRelevantDistance);
  score += distanceScore * 30;

  if (preferences.budget && restaurant.price <= preferences.budget) {
    score += 15;
  }

  if (
    preferences.cuisine &&
    restaurant.cuisine.toLowerCase().includes(preferences.cuisine.toLowerCase())
  ) {
    score += 10;
  }

  if (preferences.halal && restaurant.halal) score += 2.5;
  if (preferences.vegetarian && restaurant.vegetarian) score += 2.5;

  return score;
}

function rankRestaurants(restaurantsWithDistance, preferences = {}) {
  const pq = new PriorityQueue();

  restaurantsWithDistance.forEach(({ restaurant, distanceFromRoute, distanceAlongRoute }) => {
    const score = calculateScore(restaurant, distanceFromRoute, preferences);
    pq.enqueue(
      { ...restaurant, distanceFromRoute, distanceAlongRoute, score },
      score
    );
  });

  // Returns a Linked List instead of a plain array
  return pq.toLinkedList();
}

module.exports = { PriorityQueue, calculateScore, rankRestaurants };