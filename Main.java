import java.util.ArrayList;
import java.util.List;


public class Main {

    public static void main(String[] args) {

        List<Restaurant> restaurantsAlongRoute = new ArrayList<>();
        restaurantsAlongRoute.add(new Restaurant("Spice Garden", "Sri Lankan", 4.5, 0.8, 2, true, true, true));
        restaurantsAlongRoute.add(new Restaurant("Burger Hub", "Fast Food", 3.8, 0.3, 1, true, true, true));
        restaurantsAlongRoute.add(new Restaurant("The Grand Table", "Fine Dining", 4.8, 3.5, 4, true, true, false));
        restaurantsAlongRoute.add(new Restaurant("Noodle Street", "Chinese", 4.2, 1.2, 2, false, false, true));
        restaurantsAlongRoute.add(new Restaurant("Cafe Bloom", "Cafe", 4.0, 0.5, 2, true, false, true));
        restaurantsAlongRoute.add(new Restaurant("Rustic Pizza", "Italian", 4.3, 2.0, 3, true, true, true));

       
        List<Restaurant> filtered = new ArrayList<>();
        for (Restaurant r : restaurantsAlongRoute) {
            if (r.getPriceLevel() <= 3 && r.hasParking()) {
                filtered.add(r);
            }
        }

       
        RestaurantPriorityQueue rankingQueue = new RestaurantPriorityQueue();
        for (Restaurant r : filtered) {
            rankingQueue.insert(r);
        }

     
        System.out.println("Ranked restaurant recommendations along your route:\n");
        int rank = 1;
        while (!rankingQueue.isEmpty()) {
            Restaurant best = rankingQueue.extractMax();
            System.out.println(rank + ". " + best);
            rank++;
        }
    }
}
