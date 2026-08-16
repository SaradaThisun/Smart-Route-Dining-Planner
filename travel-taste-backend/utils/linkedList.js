// linkedList.js
// A simple singly Linked List implementation.
// Used here to store restaurant results as a chain of nodes
// instead of a plain array, matching classic DSA structure.

class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.size = 0;
  }

  append(value) {
    const node = new Node(value);
    if (!this.head) {
      this.head = node;
      this.tail = node;
    } else {
      this.tail.next = node;
      this.tail = node;
    }
    this.size++;
    return this;
  }

  toArray() {
    // Converts the linked list into a plain array,
    // used only at the very end when preparing the JSON response
    const result = [];
    let current = this.head;
    while (current) {
      result.push(current.value);
      current = current.next;
    }
    return result;
  }

  forEach(callback) {
    let current = this.head;
    let index = 0;
    while (current) {
      callback(current.value, index);
      current = current.next;
      index++;
    }
  }

  get length() {
    return this.size;
  }
}

module.exports = { LinkedList, Node };