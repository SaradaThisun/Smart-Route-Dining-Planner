const PriorityQueue = require("../dataStructures/PriorityQueue");

const queue = new PriorityQueue();

queue.enqueue({
  name: "Pizza Hut Kandy",
  type: "restaurant",
  rating: 4.8,
  score: 98,
});

queue.enqueue({
  name: "KFC Kandy",
  type: "restaurant",
  rating: 4.4,
  score: 90,
});

queue.enqueue({
  name: "Earl's Regency",
  type: "hotel",
  rating: 4.9,
  score: 100,
});

queue.enqueue({
  name: "Cafe Kegalle",
  type: "cafe",
  rating: 4.1,
  score: 75,
});

module.exports = queue;
