const Graph = require("../dataStructures/Graph");

const graph = new Graph();

/*
            Jaffna
               |
          Anuradhapura
               |
Negombo --- Colombo --- Kalutara
    |           |           |
Kurunegala  Kadawatha   Bentota
     |          |           |
     |      Warakapola      Galle
     |          |            |
 Dambulla --- Kegalle ----- Matara
     |           |
 Sigiriya      Kandy
     |           |
     |        Nuwara Eliya
     |           |
     -------- Ella ----------
*/

graph.addRoad("Colombo", "Negombo", 38);
graph.addRoad("Colombo", "Kadawatha", 16);
graph.addRoad("Colombo", "Kalutara", 40);

graph.addRoad("Negombo", "Kurunegala", 78);

graph.addRoad("Kurunegala", "Dambulla", 70);

graph.addRoad("Kadawatha", "Warakapola", 42);

graph.addRoad("Warakapola", "Kegalle", 20);

graph.addRoad("Kegalle", "Kandy", 40);

graph.addRoad("Kandy", "Nuwara Eliya", 76);

graph.addRoad("Nuwara Eliya", "Ella", 57);

graph.addRoad("Dambulla", "Sigiriya", 18);

graph.addRoad("Dambulla", "Kandy", 72);

graph.addRoad("Kalutara", "Bentota", 34);

graph.addRoad("Bentota", "Galle", 56);

graph.addRoad("Galle", "Matara", 46);

graph.addRoad("Matara", "Ella", 180);

graph.addRoad("Anuradhapura", "Jaffna", 197);

graph.addRoad("Anuradhapura", "Dambulla", 66);

graph.addRoad("Kurunegala", "Anuradhapura", 115);

const getGraph = () => graph;

module.exports = {
  getGraph,
};