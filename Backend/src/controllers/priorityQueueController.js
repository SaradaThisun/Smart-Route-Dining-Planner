const queue = require("../services/priorityQueueService");

const getQueue = (req, res) => {
  res.json({
    success: true,
    recommendations: queue.getAll(),
  });
};

const getBestPlace = (req, res) => {
  res.json({
    success: true,
    bestPlace: queue.peek(),
  });
};

const removeBestPlace = (req, res) => {
  const removed = queue.dequeue();

  res.json({
    success: true,
    removed,
    remaining: queue.getAll(),
  });
};

module.exports = {
  getQueue,
  getBestPlace,
  removeBestPlace,
};