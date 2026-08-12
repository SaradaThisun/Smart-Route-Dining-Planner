import java.util.*;

class Graph {

    private Map<String, List<Road>> graph = new HashMap<>();

  
    class Road {
        String destination;
        int distance;

        Road(String destination, int distance) {
            this.destination = destination;
            this.distance = distance;
        }

        @Override
        public String toString() {
            return destination + " (" + distance + " km)";
        }
    }

   
    public void addLocation(String location) {
        graph.putIfAbsent(location, new ArrayList<>());
    }


    public void addRoad(String source, String destination, int distance) {

        addLocation(source);
        addLocation(destination);

        graph.get(source).add(new Road(destination, distance));
        graph.get(destination).add(new Road(source, distance));
    }


    public List<Road> getNeighbors(String location) {
        return graph.getOrDefault(location, new ArrayList<>());
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

        route.addRoad("Colombo", "Kalutara", 43);
        route.addRoad("Kalutara", "Bentota", 60);
        route.addRoad("Bentota", "Galle", 35);

        route.displayGraph();
    }
}
