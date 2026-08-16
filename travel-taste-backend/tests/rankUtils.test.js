// tests/rankUtils.test.js
// Unit tests for the Priority Queue and scoring algorithm

const { PriorityQueue, calculateScore, rankRestaurants } = require('../utils/rankUtils');

describe('PriorityQueue', () => {
  let pq;

  beforeEach(() => {
    pq = new PriorityQueue();
  });

  test('should start empty', () => {
    expect(pq.isEmpty()).toBe(true);
  });

  test('should enqueue items with priority', () => {
    pq.enqueue('low', 1);
    pq.enqueue('high', 10);
    pq.enqueue('mid', 5);
    expect(pq.isEmpty()).toBe(false);
  });

  test('should dequeue highest priority first', () => {
    pq.enqueue('low', 1);
    pq.enqueue('high', 10);
    pq.enqueue('mid', 5);

    const first = pq.dequeue();
    expect(first.item).toBe('high');
    expect(first.priority).toBe(10);
  });

  test('should dequeue in priority order', () => {
    pq.enqueue('C', 3);
    pq.enqueue('A', 1);
    pq.enqueue('B', 2);

    expect(pq.dequeue().item).toBe('C');
    expect(pq.dequeue().item).toBe('B');
    expect(pq.dequeue().item).toBe('A');
    expect(pq.isEmpty()).toBe(true);
  });

  test('toLinkedList should return sorted linked list', () => {
    pq.enqueue('worst', 10);
    pq.enqueue('best', 90);
    pq.enqueue('mid', 50);

    const list = pq.toLinkedList();
    const arr = list.toArray();

    expect(arr).toEqual(['best', 'mid', 'worst']);
    expect(list.length).toBe(3);
  });
});

describe('calculateScore', () => {
  const baseRestaurant = {
    rating: 4.5,
    price: 2,
    cuisine: 'Sri Lankan',
    halal: true,
    vegetarian: true,
  };

  test('should return a positive score for valid restaurant', () => {
    const score = calculateScore(baseRestaurant, 2);
    expect(score).toBeGreaterThan(0);
  });

  test('higher rating should give higher score', () => {
    const highRating = { ...baseRestaurant, rating: 5.0 };
    const lowRating = { ...baseRestaurant, rating: 2.0 };

    const highScore = calculateScore(highRating, 5);
    const lowScore = calculateScore(lowRating, 5);

    expect(highScore).toBeGreaterThan(lowScore);
  });

  test('closer distance should give higher score', () => {
    const closeScore = calculateScore(baseRestaurant, 1);
    const farScore = calculateScore(baseRestaurant, 9);

    expect(closeScore).toBeGreaterThan(farScore);
  });

  test('matching cuisine preference should boost score', () => {
    const withPref = calculateScore(baseRestaurant, 5, { cuisine: 'Sri Lankan' });
    const withoutPref = calculateScore(baseRestaurant, 5, {});

    expect(withPref).toBeGreaterThan(withoutPref);
  });

  test('matching budget should boost score', () => {
    const withinBudget = calculateScore(baseRestaurant, 5, { budget: 3 });
    const overBudget = calculateScore(baseRestaurant, 5, { budget: 1 });

    expect(withinBudget).toBeGreaterThan(overBudget);
  });

  test('halal preference should add bonus when matched', () => {
    const halalScore = calculateScore(baseRestaurant, 5, { halal: true });
    const noHalalPref = calculateScore(baseRestaurant, 5, {});

    expect(halalScore).toBeGreaterThan(noHalalPref);
  });

  test('vegetarian preference should add bonus when matched', () => {
    const vegScore = calculateScore(baseRestaurant, 5, { vegetarian: true });
    const noVegPref = calculateScore(baseRestaurant, 5, {});

    expect(vegScore).toBeGreaterThan(noVegPref);
  });
});

describe('rankRestaurants', () => {
  test('should return ranked linked list', () => {
    const restaurants = [
      {
        restaurant: { id: 1, rating: 4.0, price: 2, cuisine: 'Sri Lankan', halal: true, vegetarian: true },
        distanceFromRoute: 5,
        distanceAlongRoute: 10,
      },
      {
        restaurant: { id: 2, rating: 5.0, price: 1, cuisine: 'Sri Lankan', halal: true, vegetarian: true },
        distanceFromRoute: 1,
        distanceAlongRoute: 20,
      },
    ];

    const result = rankRestaurants(restaurants);
    const arr = result.toArray();

    expect(arr.length).toBe(2);
    // Restaurant 2 should rank higher (better rating + closer distance)
    expect(arr[0].id).toBe(2);
    expect(arr[1].id).toBe(1);
    // Each item should have a score
    expect(arr[0].score).toBeGreaterThan(arr[1].score);
  });

  test('should handle empty input', () => {
    const result = rankRestaurants([]);
    expect(result.toArray()).toEqual([]);
  });
});
