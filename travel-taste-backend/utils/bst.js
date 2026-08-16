// bst.js
// Binary Search Tree (BST) implementation for efficient restaurant lookups.
// Indexes restaurants by rating, enabling fast range queries like
// "find all restaurants with rating >= 4.5" in O(log n + k) time
// where k is the number of results.

class BSTNode {
  constructor(key, value) {
    this.key = key;       // the rating (or other numeric field used for ordering)
    this.value = value;   // the restaurant data
    this.left = null;     // left child (smaller keys)
    this.right = null;    // right child (larger keys)
  }
}

class BinarySearchTree {
  constructor() {
    this.root = null;
    this.size = 0;
  }

  /**
   * Inserts a new node into the BST.
   * If keys are equal, the new node goes to the right subtree.
   * Time Complexity: O(log n) average, O(n) worst case (skewed tree)
   *
   * @param {number} key - The sort key (e.g., restaurant rating)
   * @param {Object} value - The data to store (e.g., restaurant object)
   */
  insert(key, value) {
    const newNode = new BSTNode(key, value);

    if (!this.root) {
      this.root = newNode;
      this.size++;
      return this;
    }

    let current = this.root;
    while (true) {
      if (key < current.key) {
        // Go left
        if (!current.left) {
          current.left = newNode;
          this.size++;
          return this;
        }
        current = current.left;
      } else {
        // Go right (equal keys go right)
        if (!current.right) {
          current.right = newNode;
          this.size++;
          return this;
        }
        current = current.right;
      }
    }
  }

  /**
   * Searches for a node with the exact key.
   * Returns the first matching value, or null if not found.
   * Time Complexity: O(log n) average
   *
   * @param {number} key - The key to search for
   * @returns {Object|null} The stored value or null
   */
  search(key) {
    let current = this.root;
    while (current) {
      if (key === current.key) return current.value;
      if (key < current.key) {
        current = current.left;
      } else {
        current = current.right;
      }
    }
    return null;
  }

  /**
   * Finds all values with key >= minKey.
   * Useful for queries like "find all restaurants with rating >= 4.0".
   * Time Complexity: O(log n + k) where k is the number of results
   *
   * @param {number} minKey - The minimum key threshold
   * @returns {Array} Array of matching values
   */
  findGreaterThanOrEqual(minKey) {
    const results = [];
    this._findGTE(this.root, minKey, results);
    return results;
  }

  _findGTE(node, minKey, results) {
    if (!node) return;

    // If current key >= minKey, add it and search left subtree too
    if (node.key >= minKey) {
      this._findGTE(node.left, minKey, results);
      results.push(node.value);
      this._findGTE(node.right, minKey, results);
    } else {
      // Current key < minKey, only search right subtree
      this._findGTE(node.right, minKey, results);
    }
  }

  /**
   * Finds all values with key <= maxKey.
   * Useful for queries like "find all restaurants with price <= 2".
   * Time Complexity: O(log n + k) where k is the number of results
   *
   * @param {number} maxKey - The maximum key threshold
   * @returns {Array} Array of matching values
   */
  findLessThanOrEqual(maxKey) {
    const results = [];
    this._findLTE(this.root, maxKey, results);
    return results;
  }

  _findLTE(node, maxKey, results) {
    if (!node) return;

    if (node.key <= maxKey) {
      this._findLTE(node.left, maxKey, results);
      results.push(node.value);
      this._findLTE(node.right, maxKey, results);
    } else {
      this._findLTE(node.left, maxKey, results);
    }
  }

  /**
   * Finds all values with key between minKey and maxKey (inclusive).
   * Useful for queries like "find restaurants with rating between 3.5 and 4.5".
   * Time Complexity: O(log n + k)
   *
   * @param {number} minKey - Minimum key (inclusive)
   * @param {number} maxKey - Maximum key (inclusive)
   * @returns {Array} Array of matching values
   */
  findInRange(minKey, maxKey) {
    const results = [];
    this._findRange(this.root, minKey, maxKey, results);
    return results;
  }

  _findRange(node, minKey, maxKey, results) {
    if (!node) return;

    // Only traverse left if there might be nodes >= minKey
    if (node.key > minKey) {
      this._findRange(node.left, minKey, maxKey, results);
    }

    // Add current node if within range
    if (node.key >= minKey && node.key <= maxKey) {
      results.push(node.value);
    }

    // Only traverse right if there might be nodes <= maxKey
    if (node.key < maxKey) {
      this._findRange(node.right, minKey, maxKey, results);
    }
  }

  /**
   * Returns all values sorted by key (in-order traversal).
   * Time Complexity: O(n)
   *
   * @returns {Array} All values in ascending key order
   */
  inOrderTraversal() {
    const results = [];
    this._inOrder(this.root, results);
    return results;
  }

  _inOrder(node, results) {
    if (!node) return;
    this._inOrder(node.left, results);
    results.push(node.value);
    this._inOrder(node.right, results);
  }

  /**
   * Finds the node with the minimum key value.
   * Time Complexity: O(log n) average
   *
   * @returns {Object|null} The value with the smallest key
   */
  findMin() {
    if (!this.root) return null;
    let current = this.root;
    while (current.left) {
      current = current.left;
    }
    return current.value;
  }

  /**
   * Finds the node with the maximum key value.
   * Time Complexity: O(log n) average
   *
   * @returns {Object|null} The value with the largest key
   */
  findMax() {
    if (!this.root) return null;
    let current = this.root;
    while (current.right) {
      current = current.right;
    }
    return current.value;
  }

  /**
   * Builds a BST from an array of restaurants, indexed by a given field.
   * 
   * @param {Array} restaurants - Array of restaurant objects
   * @param {string} field - The field to use as the BST key (default: 'rating')
   * @returns {BinarySearchTree} A new BST indexed by the specified field
   */
  static fromRestaurants(restaurants, field = 'rating') {
    const bst = new BinarySearchTree();
    restaurants.forEach((restaurant) => {
      bst.insert(restaurant[field], restaurant);
    });
    return bst;
  }
}

module.exports = { BinarySearchTree, BSTNode };
