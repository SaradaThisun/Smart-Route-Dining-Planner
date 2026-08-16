// tests/gridIndex.test.js
// Unit tests for the Grid Spatial Index

const { buildGridIndex, getNearbyRestaurants, getGridKey } = require('../utils/gridIndex');

describe('getGridKey', () => {
  test('should generate consistent key for same coordinates', () => {
    const key1 = getGridKey(6.9, 79.8);
    const key2 = getGridKey(6.9, 79.8);
    expect(key1).toBe(key2);
  });

  test('should generate different keys for different coordinates', () => {
    const key1 = getGridKey(6.9, 79.8);
    const key2 = getGridKey(7.3, 80.6);
    expect(key1).not.toBe(key2);
  });

  test('should round coordinates to grid precision', () => {
    const key = getGridKey(6.934, 79.856, 10);
    expect(key).toBe('6.9_79.9');
  });
});

describe('buildGridIndex', () => {
  const testRestaurants = [
    { id: 1, name: 'Restaurant A', lat: 6.9, lng: 79.8 },
    { id: 2, name: 'Restaurant B', lat: 6.9, lng: 79.8 },
    { id: 3, name: 'Restaurant C', lat: 7.3, lng: 80.6 },
  ];

  test('should create grid index from restaurant list', () => {
    const grid = buildGridIndex(testRestaurants);
    expect(grid).toBeDefined();
    expect(typeof grid).toBe('object');
  });

  test('should group nearby restaurants in same cell', () => {
    const grid = buildGridIndex(testRestaurants);
    const key = getGridKey(6.9, 79.8);
    expect(grid[key]).toBeDefined();
    expect(grid[key].length).toBe(2);
  });

  test('should place distant restaurants in different cells', () => {
    const grid = buildGridIndex(testRestaurants);
    const keyA = getGridKey(6.9, 79.8);
    const keyB = getGridKey(7.3, 80.6);
    expect(keyA).not.toBe(keyB);
    expect(grid[keyA].length).toBe(2);
    expect(grid[keyB].length).toBe(1);
  });
});

describe('getNearbyRestaurants', () => {
  const testRestaurants = [
    { id: 1, name: 'Near', lat: 6.9, lng: 79.85 },
    { id: 2, name: 'Also Near', lat: 6.91, lng: 79.86 },
    { id: 3, name: 'Far Away', lat: 8.5, lng: 81.2 },
  ];

  test('should find restaurants near given coordinates', () => {
    const grid = buildGridIndex(testRestaurants);
    const nearby = getNearbyRestaurants(grid, 6.9, 79.85);
    expect(nearby.length).toBeGreaterThanOrEqual(1);
  });

  test('should not return distant restaurants', () => {
    const grid = buildGridIndex(testRestaurants);
    const nearby = getNearbyRestaurants(grid, 6.9, 79.85);
    const ids = nearby.map((r) => r.id);
    expect(ids).not.toContain(3); // Far away restaurant
  });

  test('should return unique results (no duplicates)', () => {
    const grid = buildGridIndex(testRestaurants);
    const nearby = getNearbyRestaurants(grid, 6.9, 79.85);
    const ids = nearby.map((r) => r.id);
    const uniqueIds = [...new Set(ids)];
    expect(ids.length).toBe(uniqueIds.length);
  });

  test('should return empty array when no restaurants nearby', () => {
    const grid = buildGridIndex(testRestaurants);
    const nearby = getNearbyRestaurants(grid, 0, 0); // Middle of ocean
    expect(nearby).toEqual([]);
  });
});
