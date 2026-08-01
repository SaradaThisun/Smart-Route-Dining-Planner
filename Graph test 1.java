import java.util.*;

class Graph {

    private Map<String, List<String>> graph = new HashMap<>();

    public void addLocation(String location) {
        graph.putIfAbsent(location, new ArrayList<>());
    }

    public void addRoad(String source, String destination) {
        graph.get(source).add(destination);
        graph.get(destination).add(source);
    }

    public void displayGraph() {
        for (String location : graph.keySet()) {
            System.out.println(location + " -> " + graph.get(location));
        }
    }

    public static void main(String[] args) {

        Graph route = new Graph();

        route.addLocation("Colombo");
        route.addLocation("Kalutara");
        route.addLocation("Bentota");
        route.addLocation("Galle");

        route.addRoad("Colombo", "Kalutara");
        route.addRoad("Kalutara", "Bentota");
        route.addRoad("Bentota", "Galle");

        route.displayGraph();
    }
}