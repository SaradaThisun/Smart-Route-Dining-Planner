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
}

module.exports = { Graph, GraphNode };