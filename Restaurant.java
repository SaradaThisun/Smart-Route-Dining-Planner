public class Restaurant {

    private String name;
    private String cuisineType;
    private double rating;              
    private double distanceFromRoute;   
    private int priceLevel;             
    private boolean isOpenNow;
    private boolean hasParking;
    private boolean isFamilyFriendly;
    private double overallScore;        

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

    
    private double calculateScore() {
        double score = 0.0;
        score += rating * 20;                 
        score -= distanceFromRoute * 5;        
        score -= priceLevel * 3;               
        score += isOpenNow ? 10 : -50;          
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
