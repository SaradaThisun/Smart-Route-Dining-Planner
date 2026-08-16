// graph.js
// Represents the travel route as a Graph: each waypoint is a Node,
// connected to the next waypoint by an Edge (with a real distance weight).
// This models the route the same way a graph algorithm (like Dijkstra)
// would treat a road network, even though our route is currently linear
// (a hiker's fixed path, not branching roads).

const turf = require('@turf/turf');

class GraphNode {
  constructor(id, lat, lng) {
    this.id = id;
    this.lat = lat;
    this.lng = lng;
    this.edges = []; // connections to other nodes
  }
}

class Graph {
  constructor() {
    this.nodes = new Map(); // id -> GraphNode
  }

  addNode(id, lat, lng) {
    const node = new GraphNode(id, lat, lng);
    this.nodes.set(id, node);
    return node;
  }

  addEdge(fromId, toId) {
    const fromNode = this.nodes.get(fromId);
    const toNode = this.nodes.get(toId);
    if (!fromNode || !toNode) return;

    const from = turf.point([fromNode.lng, fromNode.lat]);
    const to = turf.point([toNode.lng, toNode.lat]);
    const distance = turf.distance(from, to, { units: 'kilometers' });

    fromNode.edges.push({ to: toId, distance });
    toNode.edges.push({ to: fromId, distance }); // undirected for simplicity
  }

  // Builds a Graph from a simple ordered list of route coordinates
  static fromRouteCoords(routeCoords) {
    const graph = new Graph();
    routeCoords.forEach(([lng, lat], index) => {
      graph.addNode(index, lat, lng);
    });
    for (let i = 0; i < routeCoords.length - 1; i++) {
      graph.addEdge(i, i + 1);
    }
    return graph;
  }

  // Traverses the graph in order, returning cumulative distance
  // at each node (this is what positions stops along the route)
  getCumulativeDistances() {
    const distances = [];
    let total = 0;
    const nodeIds = Array.from(this.nodes.keys()).sort((a, b) => a - b);

    nodeIds.forEach((id, index) => {
      if (index > 0) {
        const prevNode = this.nodes.get(nodeIds[index - 1]);
        const edge = prevNode.edges.find((e) => e.to === id);
        if (edge) total += edge.distance;
      }
      distances.push({ nodeId: id, cumulativeDistance: total });
    });

    return distances;
  }

  getTotalDistance() {
    const distances = this.getCumulativeDistances();
    return distances.length ? distances[distances.length - 1].cumulativeDistance : 0;
  }

  /**
   * Dijkstra's Shortest Path Algorithm
   * Finds the shortest distance from a source node to ALL other nodes in the graph.
   * Uses a simple priority queue (min-heap approach via sorted array).
   *
   * Time Complexity: O((V + E) log V) with a proper min-heap
   * Space Complexity: O(V) for distance and previous maps
   *
   * @param {number|string} sourceId - The starting node ID
   * @returns {Object} { distances, previous } where:
   *   - distances: Map of nodeId -> shortest distance from source
   *   - previous: Map of nodeId -> previous nodeId on shortest path
   */
  dijkstra(sourceId) {
    const distances = new Map();
    const previous = new Map();
    const visited = new Set();

    // Priority queue: array of { id, distance }, sorted by distance (min first)
    const pq = [];

    // Initialize all distances to Infinity
    for (const [id] of this.nodes) {
      distances.set(id, Infinity);
      previous.set(id, null);
    }

    // Distance to source is 0
    distances.set(sourceId, 0);
    pq.push({ id: sourceId, distance: 0 });

    while (pq.length > 0) {
      // Sort to get minimum distance node (acts as min-heap extract)
      pq.sort((a, b) => a.distance - b.distance);
      const { id: currentId } = pq.shift();

      // Skip if already visited
      if (visited.has(currentId)) continue;
      visited.add(currentId);

      const currentNode = this.nodes.get(currentId);
      if (!currentNode) continue;

      // Explore all neighbors (relaxation step)
      for (const edge of currentNode.edges) {
        if (visited.has(edge.to)) continue;

        const newDistance = distances.get(currentId) + edge.distance;

        // If we found a shorter path, update it
        if (newDistance < distances.get(edge.to)) {
          distances.set(edge.to, newDistance);
          previous.set(edge.to, currentId);
          pq.push({ id: edge.to, distance: newDistance });
        }
      }
    }

    return { distances, previous };
  }

  /**
   * Finds the shortest path between two nodes using Dijkstra's algorithm.
   * Returns the path as an ordered array of node IDs and the total distance.
   *
   * @param {number|string} startId - Starting node ID
   * @param {number|string} endId - Destination node ID
   * @returns {Object} { path: Array<nodeId>, distance: number }
   */
  getShortestPath(startId, endId) {
    const { distances, previous } = this.dijkstra(startId);

    // Reconstruct path by backtracking from end to start
    const path = [];
    let current = endId;

    // If distance is Infinity, no path exists
    if (distances.get(endId) === Infinity) {
      return { path: [], distance: Infinity };
    }

    while (current !== null) {
      path.unshift(current);
      current = previous.get(current);
    }

    return {
      path,
      distance: Math.round(distances.get(endId) * 100) / 100,
    };
  }

  /**
   * Adds a restaurant as a node in the graph, connected to the nearest
   * waypoint on the route. This allows Dijkstra to find paths through
   * restaurants along the travel route.
   *
   * @param {Object} restaurant - Restaurant object with id, lat, lng
   * @param {string} idPrefix - Prefix for the node ID (default: 'r')
   */
  addRestaurantNode(restaurant, idPrefix = 'r') {
    const nodeId = `${idPrefix}${restaurant.id}`;
    this.addNode(nodeId, restaurant.lat, restaurant.lng);

    // Connect to the nearest route waypoint
    let minDistance = Infinity;
    let nearestNodeId = null;

    for (const [id, node] of this.nodes) {
      if (id === nodeId) continue;

      const from = turf.point([node.lng, node.lat]);
      const to = turf.point([restaurant.lng, restaurant.lat]);
      const dist = turf.distance(from, to, { units: 'kilometers' });

      if (dist < minDistance) {
        minDistance = dist;
        nearestNodeId = id;
      }
    }

    if (nearestNodeId !== null) {
      // Manually add edge with pre-calculated distance
      const restaurantNode = this.nodes.get(nodeId);
      const nearestNode = this.nodes.get(nearestNodeId);

      restaurantNode.edges.push({ to: nearestNodeId, distance: minDistance });
      nearestNode.edges.push({ to: nodeId, distance: minDistance });
    }

    return nodeId;
  }
}

module.exports = { Graph, GraphNode };