import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
  Linking,
  Image,
  Modal,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Picker } from '@react-native-picker/picker';
import { getRecommendations } from '../../services/recommendationService';
import { getShortestRoute } from '../../services/routeService';
import { saveTrip } from '../../services/tripService';
import styles from '../../styles/routes/RouteStyles';

const cities = [
  'Colombo',
  'Negombo',
  'Kadawatha',
  'Warakapola',
  'Kegalle',
  'Kurunegala',
  'Kandy',
  'Dambulla',
  'Sigiriya',
  'Kalutara',
  'Bentota',
  'Galle',
  'Matara',
  'Nuwara Eliya',
  'Ella',
  'Anuradhapura',
  'Jaffna',
];

const restaurantImages = [
  {match: 'pizza hut', source: require('../../assets/images/pizzahut.jpg')},
  {match: 'kfc', source: require('../../assets/images/kfc.jpg')},
  {match: 'burger king', source: require('../../assets/images/burgerking.jpg')},
  {match: 'java', source: require('../../assets/images/java.jpg')},
  {match: 'barista', source: require('../../assets/images/barista.jpg')},
  {match: 'dutch fort', source: require('../../assets/images/gall fort.jpg')},
];
const defaultRestaurantImage = require('../../assets/images/restaurant.jpg');

const RoutesScreen = () => {
  const [start, setStart] = useState('Colombo');
  const [destination, setDestination] = useState('Kandy');
  const [route, setRoute] = useState<string[]>([]);
  const [distance, setDistance] = useState(0);
  const estimatedTime = (distance / 60).toFixed(1);
  const [restaurants, setRestaurants] = useState<any[]>([]);
  const [selectedRestaurant, setSelectedRestaurant] = useState<any | null>(null);
  const [cuisineFilter, setCuisineFilter] = useState('all');
  const [budgetFilter, setBudgetFilter] = useState('all');
  const [mealFilter, setMealFilter] = useState('all');
  const [dietaryFilter, setDietaryFilter] = useState('all');

  const recommendationCount = route.length * 2;

  const findRoute = async () => {
    try {
      const result = await getShortestRoute(start, destination);

      setRoute(result.path);
      setDistance(result.totalDistance);
      const response = await getRecommendations(result.path);

      setRestaurants(response.restaurants);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSaveTrip = async () => {
    try {
      await saveTrip({
        start,
        destination,
        distance,
        route,
      });

      Alert.alert('Success', 'Trip saved successfully!');
    } catch (error) {
      console.log(error);
      Alert.alert('Error', 'Unable to save trip.');
    }
  };

  const openGoogleMaps = async () => {
    if (route.length === 0) {
      Alert.alert('No Route', 'Please find a route first.');
      return;
    }

    const origin = encodeURIComponent(start);
    const destinationPoint = encodeURIComponent(destination);

    const waypoints = route
      .slice(1, route.length - 1)
      .map(city => encodeURIComponent(city))
      .join('|');

    let url = `https://www.google.com/maps/dir/?api=1&origin=${origin}&destination=${destinationPoint}`;

    if (waypoints.length > 0) {
      url += `&waypoints=${waypoints}`;
    }

    url += '&travelmode=driving';

    try {
      await Linking.openURL(url);
    } catch (error) {
      Alert.alert('Error', 'Unable to open Google Maps.');
    }
  };

  const getRestaurantImage = (restaurant: any) => {
    const name = String(restaurant?.name || '').toLowerCase();
    return restaurantImages.find(item => name.includes(item.match))?.source ||
      defaultRestaurantImage;
  };

  const openRestaurantInMaps = async (restaurant: any) => {
    const hasCoordinates =
      restaurant?.latitude !== undefined && restaurant?.longitude !== undefined;
    const query = hasCoordinates
      ? `${restaurant.latitude},${restaurant.longitude}`
      : `${restaurant?.name || 'Restaurant'}, ${restaurant?.city || ''}`;
    const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;

    try {
      await Linking.openURL(url);
    } catch (error) {
      Alert.alert('Error', 'Unable to open Google Maps.');
    }
  };

  const filteredRestaurants = restaurants.filter(restaurant => {
    const cuisine = String(
      restaurant.cuisineType || restaurant.cuisine || restaurant.category || '',
    ).toLowerCase();
    const budget = String(restaurant.priceRange || '').toLowerCase();
    const meal = String(restaurant.mealType || restaurant.meal || '').toLowerCase();
    const dietary = String(
      restaurant.dietaryPreference || restaurant.dietary || '',
    ).toLowerCase();

    return (
      (cuisineFilter === 'all' || cuisine.includes(cuisineFilter)) &&
      (budgetFilter === 'all' || budget === budgetFilter) &&
      (mealFilter === 'all' || meal.includes(mealFilter)) &&
      (dietaryFilter === 'all' || dietary.includes(dietaryFilter))
    );
  });

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>Plan Your Journey</Text>

          <Text style={styles.subtitle}>
            Find the fastest route and discover great places along your journey.
          </Text>
        </View>

        <View style={styles.plannerCard}>
          <Text style={styles.label}>Starting City</Text>

          <View style={styles.picker}>
            <Picker
              selectedValue={start}
              onValueChange={setStart}
              style={styles.pickerSelect}
              itemStyle={styles.pickerItem}
              dropdownIconColor="#111827"
            >
              {cities.map(city => (
                <Picker.Item key={city} label={city} value={city} color="#FFFFFF" />
              ))}
            </Picker>
          </View>

          <Text style={styles.label}>Destination</Text>

          <View style={styles.picker}>
            <Picker
              selectedValue={destination}
              onValueChange={setDestination}
              style={styles.destinationPickerSelect}
              itemStyle={styles.destinationPickerItem}
              dropdownIconColor="#111827"
            >
              {cities.map(city => (
                <Picker.Item key={city} label={city} value={city} color="#FFFFFF" />
              ))}
            </Picker>
          </View>

          <TouchableOpacity style={styles.button} onPress={findRoute}>
            <Text style={styles.buttonText}>Find Best Route</Text>
          </TouchableOpacity>
        </View>

        {route.length > 0 && (
          <View style={styles.summaryContainer}>
            <View style={styles.summaryCard}>
              <Text style={styles.summaryIcon}>📏</Text>

              <Text style={styles.summaryValue}>{distance} km</Text>

              <Text style={styles.summaryLabel}>Distance</Text>
            </View>

            <View style={styles.summaryCard}>
              <Text style={styles.summaryIcon}>⏱</Text>

              <Text style={styles.summaryValue}>{estimatedTime} hrs</Text>

              <Text style={styles.summaryLabel}>Time</Text>
            </View>

            <View style={styles.summaryCard}>
              <Text style={styles.summaryIcon}>📍</Text>

              <Text style={styles.summaryValue}>{route.length}</Text>

              <Text style={styles.summaryLabel}>Stops</Text>
            </View>

            <View style={styles.summaryCard}>
              <Text style={styles.summaryIcon}>🍽</Text>

              <Text style={styles.summaryValue}>{recommendationCount}</Text>

              <Text style={styles.summaryLabel}>Places</Text>
            </View>
          </View>
        )}

        <View style={styles.progressCard}>
          <Text style={styles.progressTitle}>🚗 Trip Progress</Text>

          <View style={styles.progressHeader}>
            <Text style={styles.progressCity}>{start}</Text>

            <View style={styles.progressLine}>
              <View style={styles.progressFill} />
            </View>

            <Text style={styles.progressCity}>{destination}</Text>
          </View>

          <Text style={styles.progressSubtitle}>
            {route.length} Stops • {distance} km
          </Text>

          <View style={styles.timeline}>
            {route.map((city, index) => (
              <View key={index} style={styles.timelineItem}>
                <View style={styles.timelineLeft}>
                  <View style={styles.circle} />

                  {index !== route.length - 1 && (
                    <View style={styles.verticalLine} />
                  )}
                </View>

                <Text style={styles.timelineCity}>{city}</Text>
              </View>
            ))}
          </View>

          <TouchableOpacity
            style={styles.startTripButton}
            onPress={openGoogleMaps}
          >
            <Text style={styles.startTripButtonText}>🚗 Start Trip</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.filterCard}>
          <View style={styles.filterHeader}>
            <Text style={styles.filterTitle}>🍽 Restaurant Filters</Text>
            <TouchableOpacity
              onPress={() => {
                setCuisineFilter('all');
                setBudgetFilter('all');
                setMealFilter('all');
                setDietaryFilter('all');
              }}
            >
              <Text style={styles.clearFilters}>Clear</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.filterLabel}>Cuisine Type</Text>
          <View style={styles.filterPicker}>
            <Picker selectedValue={cuisineFilter} onValueChange={setCuisineFilter} style={[styles.filterPickerSelect, cuisineFilter === 'all' && styles.filterPlaceholder]} dropdownIconColor="#111827">
              <Picker.Item label="All cuisines" value="all" color="#111827" />
              <Picker.Item label="Indian" value="indian" color="#FFFFFF" />
              <Picker.Item label="Mexican" value="mexican" color="#FFFFFF" />
              <Picker.Item label="Fast Food" value="fast" color="#FFFFFF" />
              <Picker.Item label="Seafood" value="seafood" color="#FFFFFF" />
              <Picker.Item label="Sri Lankan" value="sri lankan" color="#FFFFFF" />
            </Picker>
          </View>

          <View style={styles.filterColumns}>
            <View style={styles.filterColumn}>
              <Text style={styles.filterLabel}>Budget Range</Text>
              <View style={styles.filterPicker}>
                <Picker selectedValue={budgetFilter} onValueChange={setBudgetFilter} style={[styles.filterPickerSelect, budgetFilter === 'all' && styles.filterPlaceholder]} dropdownIconColor="#111827">
                  <Picker.Item label="Any budget" value="all" color="#111827" />
                  <Picker.Item label="$" value="$" color="#FFFFFF" />
                  <Picker.Item label="$$" value="$$" color="#FFFFFF" />
                  <Picker.Item label="$$$" value="$$$" color="#FFFFFF" />
                  <Picker.Item label="$$$$" value="$$$$" color="#FFFFFF" />
                </Picker>
              </View>
            </View>
            <View style={styles.filterColumn}>
              <Text style={styles.filterLabel}>Meal Type</Text>
              <View style={styles.filterPicker}>
                <Picker selectedValue={mealFilter} onValueChange={setMealFilter} style={[styles.filterPickerSelect, mealFilter === 'all' && styles.filterPlaceholder]} dropdownIconColor="#111827">
                  <Picker.Item label="Any meal" value="all" color="#111827" />
                  <Picker.Item label="Breakfast" value="breakfast" color="#FFFFFF" />
                  <Picker.Item label="Lunch" value="lunch" color="#FFFFFF" />
                  <Picker.Item label="Dinner" value="dinner" color="#FFFFFF" />
                  <Picker.Item label="Snack" value="snack" color="#FFFFFF" />
                </Picker>
              </View>
            </View>
          </View>

          <Text style={styles.filterLabel}>Dietary Preference</Text>
          <View style={styles.filterPicker}>
            <Picker selectedValue={dietaryFilter} onValueChange={setDietaryFilter} style={[styles.filterPickerSelect, dietaryFilter === 'all' && styles.filterPlaceholder]} dropdownIconColor="#111827">
              <Picker.Item label="Any preference" value="all" color="#111827" />
              <Picker.Item label="Vegetarian" value="vegetarian" color="#FFFFFF" />
              <Picker.Item label="Vegan" value="vegan" color="#FFFFFF" />
              <Picker.Item label="Halal" value="halal" color="#FFFFFF" />
            </Picker>
          </View>
        </View>

        <View style={styles.recommendationCard}>
          <Text style={styles.recommendationTitle}>
            🍽 Recommended Restaurants
          </Text>

          {filteredRestaurants.length === 0 ? (
            <Text style={styles.noRecommendation}>
              No restaurants found along this route.
            </Text>
          ) : (
            filteredRestaurants.map((restaurant, index) => (
              <TouchableOpacity
                key={restaurant._id || index}
                style={styles.restaurantItem}
                activeOpacity={0.8}
                onPress={() => setSelectedRestaurant(restaurant)}
              >
                <Image
                  source={getRestaurantImage(restaurant)}
                  style={styles.restaurantThumbnail}
                />
                <View style={styles.restaurantTop}>
                  <Text style={styles.restaurantName}>{restaurant.name}</Text>

                  <Text style={styles.rating}>⭐ {restaurant.rating}</Text>
                </View>

                <Text style={styles.restaurantCity}>📍 {restaurant.city}</Text>

                <Text style={styles.restaurantType}>{restaurant.category}</Text>

                <Text style={styles.restaurantHours}>
                  🕒 {restaurant.openingHours}
                </Text>

                <Text style={styles.restaurantPrice}>
                  💲 {restaurant.priceRange}
                </Text>
              </TouchableOpacity>
            ))
          )}
        </View>

        <Modal
          visible={selectedRestaurant !== null}
          transparent
          animationType="fade"
          onRequestClose={() => setSelectedRestaurant(null)}
        >
          {selectedRestaurant && (
            <View style={styles.modalBackdrop}>
              <View style={styles.restaurantModal}>
                <Image
                  source={getRestaurantImage(selectedRestaurant)}
                  style={styles.restaurantModalImage}
                />

                <TouchableOpacity
                  style={styles.closeButton}
                  onPress={() => setSelectedRestaurant(null)}
                  accessibilityLabel="Close restaurant details"
                >
                  <Text style={styles.closeButtonText}>×</Text>
                </TouchableOpacity>

                <Text style={styles.modalRestaurantName}>
                  {selectedRestaurant.name}
                </Text>
                <Text style={styles.modalRestaurantRating}>
                  ⭐ {selectedRestaurant.rating}  •  {selectedRestaurant.priceRange}
                </Text>
                <Text style={styles.modalDetail}>📍 {selectedRestaurant.city}</Text>
                <Text style={styles.modalDetail}>
                  🍽 {selectedRestaurant.category || 'Restaurant'}
                </Text>
                <Text style={styles.modalDetail}>
                  🕒 {selectedRestaurant.openingHours || 'Opening hours unavailable'}
                </Text>
                {selectedRestaurant.address && (
                  <Text style={styles.modalDetail}>🏠 {selectedRestaurant.address}</Text>
                )}
                {selectedRestaurant.description && (
                  <Text style={styles.modalDescription}>
                    {selectedRestaurant.description}
                  </Text>
                )}
                <TouchableOpacity
                  style={styles.goButton}
                  onPress={() => openRestaurantInMaps(selectedRestaurant)}
                >
                  <Text style={styles.goButtonText}>GO</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </Modal>

        {route.length > 0 && (
          <View style={styles.resultCard}>
            <Text style={styles.routeTitle}>Route Summary</Text>

            <Text style={styles.distance}>📏 {distance} km</Text>

            <Text style={styles.stops}>📍 {route.length} Stops</Text>

            <View style={styles.divider} />

            {route.map((city, index) => (
              <View key={index} style={styles.routeItem}>
                <View style={styles.dot} />

                <Text style={styles.city}>{city}</Text>
              </View>
            ))}

            <TouchableOpacity
              style={styles.saveButton}
              onPress={handleSaveTrip}
            >
              <Text style={styles.saveButtonText}>Save Trip</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default RoutesScreen;
