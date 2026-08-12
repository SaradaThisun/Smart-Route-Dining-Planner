const { getGraph } = require("./routeService");
const { placeMap } = require("./placeLoaderService");
const PriorityQueue = require("../dataStructures/PriorityQueue");
const LinkedList = require("../dataStructures/LinkedList");

const recommendPlaces = (start, end) => {

    const calculateScore = (place) => {
    let score = 0;

    score += place.rating * 20;

    if (place.familyFriendly)
        score += 5;

    if (place.parking)
        score += 5;

    if (place.priceRange === "$")
        score += 10;

    if (place.priceRange === "$$")
        score += 8;

    if (place.priceRange === "$$$")
        score += 5;

    return score;
};

    const graph = getGraph();

    const shortestRoute = graph.shortestPath(start, end);

    const queue = new PriorityQueue();

    // Get places for every city on the route
    shortestRoute.path.forEach(city => {

        const places = placeMap.getPlaces(city);

        places.forEach(place => {

            // Recommendation score
                place.score = calculateScore(place);

            queue.enqueue(place);

        });

    });

    const list = new LinkedList();

    while (!queue.isEmpty()) {

        list.append(queue.dequeue());

    }

    return {

        route: shortestRoute.path,

        distance: shortestRoute.distance,

        recommendations: list.toArray()

    };

};

module.exports = {
    recommendPlaces
};