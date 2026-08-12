const { getGraph } = require("../services/routeService");

const displayGraph = (req, res) => {
  const graph = getGraph();

  const result = {};

  for (const [city, neighbors] of graph.adjacencyList) {
    result[city] = neighbors;
  }

  res.status(200).json({
    success: true,
    graph: result,
  });
};

const getNeighbors = (req, res) => {
  const graph = getGraph();

  const { city } = req.params;

  const neighbors = graph.getNeighbors(city);

  res.status(200).json({
    success: true,
    city,
    neighbors,
  });
};

const shortestRoute = (req, res) => {
  const graph = getGraph();

  const { start, end } = req.query;

  if (!start || !end) {
    return res.status(400).json({
      success: false,
      message: "Start and end cities are required.",
    });
  }

  const result = graph.shortestPath(start, end);

  res.status(200).json({
    success: true,
    start,
    destination: end,
    totalDistance: result.distance,
    path: result.path,
  });
};

module.exports = {
  displayGraph,
  getNeighbors,
  shortestRoute,
};