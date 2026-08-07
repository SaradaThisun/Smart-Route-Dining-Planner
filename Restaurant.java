/**
 * Restaurant.java
 * -----------------------------------------------------------
 * Represents a single restaurant candidate found along the
 * user's travel route. Holds the raw attributes (rating,
 * distance from route, price, availability, facilities) plus
 * a computed "overallScore" that the Priority Queue uses to
 * rank restaurants against each other.
 * -----------------------------------------------------------
 */
public class Restaurant {

    private String name;
    private String cuisineType;
    private double rating;              // 0.0 - 5.0 (from reviews)
    private double distanceFromRoute;   // in kilometers, off the planned route
    private int priceLevel;             // 1 (cheap) - 4 (expensive)
    private boolean isOpenNow;
    private boolean hasParking;
    private boolean isFamilyFriendly;
    private double overallScore;        // computed ranking score

    public Restaurant(String name, String cuisineType, double rating,
                       double distanceFromRoute, int priceLevel,
                       boolean isOpenNow, boolean hasParking, boolean isFamilyFriendly) {
        this.name = name;
        this.cuisineType = cuisineType;
        this.rating = rating;
        this.distanceFromRoute = distanceFromRoute;
        this.priceLevel = priceLevel;
        this.isOpenNow = isOpenNow;
        this.hasParking = hasParking;
        this.isFamilyFriendly = isFamilyFriendly;
        this.overallScore = calculateScore();
    }

    /**
     * Scoring formula combining the factors mentioned in the report:
     * higher rating, shorter distance from route, lower price, and
     * availability all push a restaurant higher up the ranking.
     *
     * Weights can be tuned later without changing the Priority Queue logic.
     */
    private double calculateScore() {
        double score = 0.0;
        score += rating * 20;                 // rating contributes most (0-100)
        score -= distanceFromRoute * 5;        // farther from route = lower score
        score -= priceLevel * 3;               // pricier = slightly lower score
        score += isOpenNow ? 10 : -50;          // closed restaurants are pushed down hard
        score += hasParking ? 5 : 0;
        score += isFamilyFriendly ? 5 : 0;
        return score;
    }

    public double getOverallScore() {
        return overallScore;
    }

    public String getName() {
        return name;
    }

    public String getCuisineType() {
        return cuisineType;
    }

    public double getRating() {
        return rating;
    }

    public double getDistanceFromRoute() {
        return distanceFromRoute;
    }

    public int getPriceLevel() {
        return priceLevel;
    }

    public boolean isOpenNow() {
        return isOpenNow;
    }

    public boolean hasParking() {
        return hasParking;
    }

    public boolean isFamilyFriendly() {
        return isFamilyFriendly;
    }

    @Override
    public String toString() {
        return String.format(
            "%-18s | Cuisine: %-10s | Rating: %.1f | Dist: %.1fkm | Price: %d | Open: %-5s | Score: %.2f",
            name, cuisineType, rating, distanceFromRoute, priceLevel, isOpenNow, overallScore
        );
    }
}
