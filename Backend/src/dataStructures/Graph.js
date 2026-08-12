class Graph {
  constructor() {
    this.adjacencyList = new Map();
  }

  addCity(city) {
    if (!this.adjacencyList.has(city)) {
      this.adjacencyList.set(city, []);
    }
  }

  addRoad(city1, city2, distance) {
    this.addCity(city1);
    this.addCity(city2);

    this.adjacencyList.get(city1).push({
      city: city2,
      distance,
    });

    this.adjacencyList.get(city2).push({
      city: city1,
      distance,
    });
  }

  getNeighbors(city) {
    return this.adjacencyList.get(city) || [];
  }

  displayGraph() {
    for (const [city, neighbors] of this.adjacencyList) {
      console.log(city, neighbors);
    }
  }

  shortestPath(start, end) {
    const distances = {};
    const previous = {};
    const visited = new Set();

    for (const city of this.adjacencyList.keys()) {
      distances[city] = Infinity;
      previous[city] = null;
    }

    distances[start] = 0;

    while (visited.size < this.adjacencyList.size) {
      let currentCity = null;

      for (const city in distances) {
        if (
          !visited.has(city) &&
          (currentCity === null ||
            distances[city] < distances[currentCity])
        ) {
          currentCity = city;
        }
      }

      if (currentCity === null) break;

      visited.add(currentCity);

      const neighbors = this.getNeighbors(currentCity);

      for (const neighbor of neighbors) {
        const newDistance =
          distances[currentCity] + neighbor.distance;

        if (newDistance < distances[neighbor.city]) {
          distances[neighbor.city] = newDistance;
          previous[neighbor.city] = currentCity;
        }
      }
    }

    const path = [];

    let current = end;

    while (current) {
      path.unshift(current);
      current = previous[current];
    }

    return {
      distance: distances[end],
      path,
    };
  }
}

module.exports = Graph;