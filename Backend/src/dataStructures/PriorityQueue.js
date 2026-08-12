class PriorityQueue {
  constructor() {
    this.items = [];
  }

  // Higher score = higher priority
  enqueue(place) {
    this.items.push(place);

    this.items.sort((a, b) => b.score - a.score);
  }

  dequeue() {
    return this.items.shift();
  }

  peek() {
    return this.items[0];
  }

  isEmpty() {
    return this.items.length === 0;
  }

  getAll() {
    return this.items;
  }
}

module.exports = PriorityQueue;