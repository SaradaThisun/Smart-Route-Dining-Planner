// tests/bst.test.js
// Unit tests for the Binary Search Tree data structure

const { BinarySearchTree, BSTNode } = require('../utils/bst');

describe('BSTNode', () => {
  test('should create node with key, value, and null children', () => {
    const node = new BSTNode(4.5, { name: 'Test' });
    expect(node.key).toBe(4.5);
    expect(node.value).toEqual({ name: 'Test' });
    expect(node.left).toBeNull();
    expect(node.right).toBeNull();
  });
});

describe('BinarySearchTree', () => {
  let bst;

  beforeEach(() => {
    bst = new BinarySearchTree();
  });

  test('should start empty', () => {
    expect(bst.root).toBeNull();
    expect(bst.size).toBe(0);
  });

  test('should insert first element as root', () => {
    bst.insert(4.5, { name: 'Restaurant A' });
    expect(bst.root.key).toBe(4.5);
    expect(bst.size).toBe(1);
  });

  test('should insert smaller keys to the left', () => {
    bst.insert(4.5, { name: 'Mid' });
    bst.insert(3.0, { name: 'Low' });
    expect(bst.root.left.key).toBe(3.0);
  });

  test('should insert larger keys to the right', () => {
    bst.insert(4.5, { name: 'Mid' });
    bst.insert(5.0, { name: 'High' });
    expect(bst.root.right.key).toBe(5.0);
  });

  test('insert should return the tree for chaining', () => {
    const result = bst.insert(4.5, { name: 'Test' });
    expect(result).toBe(bst);
  });
});

describe('search', () => {
  let bst;

  beforeEach(() => {
    bst = new BinarySearchTree();
    bst.insert(4.5, { id: 1, name: 'A' });
    bst.insert(3.0, { id: 2, name: 'B' });
    bst.insert(5.0, { id: 3, name: 'C' });
    bst.insert(4.0, { id: 4, name: 'D' });
  });

  test('should find existing key', () => {
    const result = bst.search(4.5);
    expect(result.name).toBe('A');
  });

  test('should return null for non-existing key', () => {
    expect(bst.search(2.0)).toBeNull();
  });

  test('should find leaf nodes', () => {
    const result = bst.search(4.0);
    expect(result.name).toBe('D');
  });
});

describe('findGreaterThanOrEqual', () => {
  let bst;

  beforeEach(() => {
    bst = new BinarySearchTree();
    [4.5, 3.0, 5.0, 4.0, 2.5, 4.8].forEach((rating, i) => {
      bst.insert(rating, { id: i + 1, rating });
    });
  });

  test('should find all restaurants with rating >= 4.5', () => {
    const results = bst.findGreaterThanOrEqual(4.5);
    expect(results.length).toBe(3); // 4.5, 5.0, 4.8
    results.forEach((r) => expect(r.rating).toBeGreaterThanOrEqual(4.5));
  });

  test('should return all items when threshold is very low', () => {
    const results = bst.findGreaterThanOrEqual(0);
    expect(results.length).toBe(6);
  });

  test('should return empty when threshold is too high', () => {
    const results = bst.findGreaterThanOrEqual(6.0);
    expect(results.length).toBe(0);
  });
});

describe('findLessThanOrEqual', () => {
  let bst;

  beforeEach(() => {
    bst = new BinarySearchTree();
    [4.5, 3.0, 5.0, 4.0, 2.5, 4.8].forEach((rating, i) => {
      bst.insert(rating, { id: i + 1, rating });
    });
  });

  test('should find all restaurants with rating <= 4.0', () => {
    const results = bst.findLessThanOrEqual(4.0);
    expect(results.length).toBe(3); // 2.5, 3.0, 4.0
    results.forEach((r) => expect(r.rating).toBeLessThanOrEqual(4.0));
  });
});

describe('findInRange', () => {
  let bst;

  beforeEach(() => {
    bst = new BinarySearchTree();
    [4.5, 3.0, 5.0, 4.0, 2.5, 4.8].forEach((rating, i) => {
      bst.insert(rating, { id: i + 1, rating });
    });
  });

  test('should find restaurants in rating range 3.5-4.8', () => {
    const results = bst.findInRange(3.5, 4.8);
    results.forEach((r) => {
      expect(r.rating).toBeGreaterThanOrEqual(3.5);
      expect(r.rating).toBeLessThanOrEqual(4.8);
    });
  });

  test('should return empty for invalid range', () => {
    const results = bst.findInRange(6.0, 7.0);
    expect(results.length).toBe(0);
  });
});

describe('inOrderTraversal', () => {
  test('should return all values sorted by key', () => {
    const bst = new BinarySearchTree();
    bst.insert(4.5, 'C');
    bst.insert(3.0, 'A');
    bst.insert(5.0, 'D');
    bst.insert(3.5, 'B');

    const result = bst.inOrderTraversal();
    expect(result).toEqual(['A', 'B', 'C', 'D']);
  });

  test('should return empty array for empty tree', () => {
    const bst = new BinarySearchTree();
    expect(bst.inOrderTraversal()).toEqual([]);
  });
});

describe('findMin / findMax', () => {
  let bst;

  beforeEach(() => {
    bst = new BinarySearchTree();
    bst.insert(4.5, { name: 'Mid' });
    bst.insert(2.0, { name: 'Low' });
    bst.insert(5.0, { name: 'High' });
  });

  test('findMin should return lowest rated restaurant', () => {
    expect(bst.findMin().name).toBe('Low');
  });

  test('findMax should return highest rated restaurant', () => {
    expect(bst.findMax().name).toBe('High');
  });

  test('findMin should return null for empty tree', () => {
    const empty = new BinarySearchTree();
    expect(empty.findMin()).toBeNull();
  });

  test('findMax should return null for empty tree', () => {
    const empty = new BinarySearchTree();
    expect(empty.findMax()).toBeNull();
  });
});

describe('fromRestaurants', () => {
  test('should build BST from restaurant array', () => {
    const restaurants = [
      { id: 1, name: 'A', rating: 4.5 },
      { id: 2, name: 'B', rating: 3.0 },
      { id: 3, name: 'C', rating: 5.0 },
    ];

    const bst = BinarySearchTree.fromRestaurants(restaurants);
    expect(bst.size).toBe(3);
    expect(bst.findMax().name).toBe('C');
    expect(bst.findMin().name).toBe('B');
  });

  test('should support custom field', () => {
    const restaurants = [
      { id: 1, name: 'Cheap', price: 1 },
      { id: 2, name: 'Mid', price: 2 },
      { id: 3, name: 'Expensive', price: 3 },
    ];

    const bst = BinarySearchTree.fromRestaurants(restaurants, 'price');
    expect(bst.size).toBe(3);
    expect(bst.findMin().name).toBe('Cheap');
    expect(bst.findMax().name).toBe('Expensive');
  });
});
