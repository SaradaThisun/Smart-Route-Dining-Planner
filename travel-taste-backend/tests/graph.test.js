// tests/graph.test.js
// Unit tests for the Graph data structure and Dijkstra's algorithm

const { Graph, GraphNode } = require('../utils/graph');

describe('GraphNode', () => {
  test('should create a node with id, lat, lng, and empty edges', () => {
    const node = new GraphNode(0, 6.9, 79.8);
    expect(node.id).toBe(0);
    expect(node.lat).toBe(6.9);
    expect(node.lng).toBe(79.8);
    expect(node.edges).toEqual([]);
  });
});

describe('Graph', () => {
  let graph;

  beforeEach(() => {
    graph = new Graph();
  });

  test('should start with empty nodes', () => {
    expect(graph.nodes.size).toBe(0);
  });

  test('should add nodes correctly', () => {
    graph.addNode(0, 6.9, 79.8);
    graph.addNode(1, 7.2, 80.6);
    expect(graph.nodes.size).toBe(2);
    expect(graph.nodes.get(0).lat).toBe(6.9);
  });

  test('should add edges with calculated distance', () => {
    graph.addNode(0, 6.9, 79.8);
    graph.addNode(1, 7.2, 80.6);
    graph.addEdge(0, 1);

    const node0 = graph.nodes.get(0);
    expect(node0.edges.length).toBe(1);
    expect(node0.edges[0].to).toBe(1);
    expect(node0.edges[0].distance).toBeGreaterThan(0);
  });

  test('edges should be undirected', () => {
    graph.addNode(0, 6.9, 79.8);
    graph.addNode(1, 7.2, 80.6);
    graph.addEdge(0, 1);

    const node0 = graph.nodes.get(0);
    const node1 = graph.nodes.get(1);
    expect(node0.edges.length).toBe(1);
    expect(node1.edges.length).toBe(1);
    expect(node0.edges[0].distance).toBe(node1.edges[0].distance);
  });

  test('addEdge should handle non-existent nodes gracefully', () => {
    graph.addNode(0, 6.9, 79.8);
    graph.addEdge(0, 99); // node 99 doesn't exist
    const node0 = graph.nodes.get(0);
    expect(node0.edges.length).toBe(0);
  });
});

describe('Graph.fromRouteCoords', () => {
  test('should build graph from route coordinates', () => {
    const coords = [
      [79.8612, 6.9271], // Colombo
      [80.6337, 7.2906], // Kandy
      [81.0466, 6.8667], // Ella
    ];

    const graph = Graph.fromRouteCoords(coords);
    expect(graph.nodes.size).toBe(3);
  });

  test('should connect consecutive waypoints', () => {
    const coords = [
      [79.8612, 6.9271],
      [80.6337, 7.2906],
      [81.0466, 6.8667],
    ];

    const graph = Graph.fromRouteCoords(coords);
    const node0 = graph.nodes.get(0);
    const node1 = graph.nodes.get(1);

    // Node 0 should connect to node 1
    expect(node0.edges.some((e) => e.to === 1)).toBe(true);
    // Node 1 should connect to both 0 and 2
    expect(node1.edges.length).toBe(2);
  });
});

describe('getCumulativeDistances', () => {
  test('should return cumulative distances along route', () => {
    const coords = [
      [79.8612, 6.9271],
      [80.6337, 7.2906],
      [81.0466, 6.8667],
    ];

    const graph = Graph.fromRouteCoords(coords);
    const distances = graph.getCumulativeDistances();

    expect(distances.length).toBe(3);
    expect(distances[0].cumulativeDistance).toBe(0);
    expect(distances[1].cumulativeDistance).toBeGreaterThan(0);
    expect(distances[2].cumulativeDistance).toBeGreaterThan(distances[1].cumulativeDistance);
  });
});

describe('getTotalDistance', () => {
  test('should return total route distance', () => {
    const coords = [
      [79.8612, 6.9271],
      [80.6337, 7.2906],
      [81.0466, 6.8667],
    ];

    const graph = Graph.fromRouteCoords(coords);
    const total = graph.getTotalDistance();

    expect(total).toBeGreaterThan(0);
    // Colombo to Ella via Kandy should be roughly 150-250 km
    expect(total).toBeGreaterThan(50);
  });

  test('should return 0 for single-node graph', () => {
    const graph = new Graph();
    graph.addNode(0, 6.9, 79.8);
    expect(graph.getTotalDistance()).toBe(0);
  });
});
