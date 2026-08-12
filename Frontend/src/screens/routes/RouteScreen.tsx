import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
  Linking,
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

const RoutesScreen = () => {
  const [start, setStart] = useState('Colombo');
  const [destination, setDestination] = useState('Kandy');
  const [route, setRoute] = useState<string[]>([]);
  const [distance, setDistance] = useState(0);
  const estimatedTime = (distance / 60).toFixed(1);
  const [restaurants, setRestaurants] = useState<any[]>([]);

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
            <Picker selectedValue={start} onValueChange={setStart}>
              {cities.map(city => (
                <Picker.Item key={city} label={city} value={city} />
              ))}
            </Picker>
          </View>

          <Text style={styles.label}>Destination</Text>

          <View style={styles.picker}>
            <Picker selectedValue={destination} onValueChange={setDestination}>
              {cities.map(city => (
                <Picker.Item key={city} label={city} value={city} />
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

        <View style={styles.recommendationCard}>
          <Text style={styles.recommendationTitle}>
            🍽 Recommended Restaurants
          </Text>

          {restaurants.length === 0 ? (
            <Text style={styles.noRecommendation}>
              No restaurants found along this route.
            </Text>
          ) : (
            restaurants.map((restaurant, index) => (
              <View key={index} style={styles.restaurantItem}>
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
              </View>
            ))
          )}
        </View>

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
