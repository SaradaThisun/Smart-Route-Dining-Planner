import java.util.ArrayList;
import java.util.List;

/**
 * Main.java
 * -----------------------------------------------------------
 * Demonstrates the Priority Queue ranking module in isolation.
 *
 * Flow (matches section 4 & 6 of the report):
 *   1. Restaurants found along the route are collected (normally
 *      this list would come from the Hash Map lookup after the
 *      Graph/Google Maps route step).
 *   2. Restaurants are filtered by the user's preferences
 *      (cuisine type, budget, open now, etc.).
 *   3. The filtered restaurants are inserted into the
 *      RestaurantPriorityQueue.
 *   4. Restaurants are extracted from the queue one by one —
 *      because it is a max-heap, they come out already ranked
 *      from most suitable to least suitable.
 * -----------------------------------------------------------
 */
public class Main {

    public static void main(String[] args) {

        // Step 1: sample restaurants "found" along the travel route
        List<Restaurant> restaurantsAlongRoute = new ArrayList<>();
        restaurantsAlongRoute.add(new Restaurant("Spice Garden", "Sri Lankan", 4.5, 0.8, 2, true, true, true));
        restaurantsAlongRoute.add(new Restaurant("Burger Hub", "Fast Food", 3.8, 0.3, 1, true, true, true));
        restaurantsAlongRoute.add(new Restaurant("The Grand Table", "Fine Dining", 4.8, 3.5, 4, true, true, false));
        restaurantsAlongRoute.add(new Restaurant("Noodle Street", "Chinese", 4.2, 1.2, 2, false, false, true));
        restaurantsAlongRoute.add(new Restaurant("Cafe Bloom", "Cafe", 4.0, 0.5, 2, true, false, true));
        restaurantsAlongRoute.add(new Restaurant("Rustic Pizza", "Italian", 4.3, 2.0, 3, true, true, true));

        // Step 2: apply user preference filtering
        // Example preferences: budget <= 3, must have parking
        List<Restaurant> filtered = new ArrayList<>();
        for (Restaurant r : restaurantsAlongRoute) {
            if (r.getPriceLevel() <= 3 && r.hasParking()) {
                filtered.add(r);
            }
        }

        // Step 3: insert filtered restaurants into the priority queue
        RestaurantPriorityQueue rankingQueue = new RestaurantPriorityQueue();
        for (Restaurant r : filtered) {
            rankingQueue.insert(r);
        }

        // Step 4: extract restaurants in ranked order (highest score first)
        System.out.println("Ranked restaurant recommendations along your route:\n");
        int rank = 1;
        while (!rankingQueue.isEmpty()) {
            Restaurant best = rankingQueue.extractMax();
            System.out.println(rank + ". " + best);
            rank++;
        }
    }
}
