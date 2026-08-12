import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from "react-native";

import styles from "../../styles/home/HomeStyles";

const HomeScreen = () => {

  const [startCity, setStartCity] = useState("Colombo");
  const [destination, setDestination] = useState("Kandy");

  const popularPlaces = [
    "Kandy",
    "Ella",
    "Sigiriya",
    "Galle",
    "Nuwara Eliya",
  ];

  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
    >

      <Text style={styles.greeting}>Good Morning 👋</Text>

      <Text style={styles.name}>
        Welcome to TravelPal
      </Text>

      <Text style={styles.subtitle}>
        Where would you like to travel today?
      </Text>

      <View style={styles.card}>

        <Text style={styles.label}>
          Start Location
        </Text>

        <TouchableOpacity style={styles.selector}>
          <Text style={styles.selectorText}>
            {startCity}
          </Text>
        </TouchableOpacity>

        <Text style={styles.label}>
          Destination
        </Text>

        <TouchableOpacity style={styles.selector}>
          <Text style={styles.selectorText}>
            {destination}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.findButton}>
          <Text style={styles.findButtonText}>
            Find Route
          </Text>
        </TouchableOpacity>

      </View>

      <Text style={styles.sectionTitle}>
        Popular Destinations
      </Text>

      {
        popularPlaces.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.placeCard}
          >
            <Text style={styles.placeText}>
              📍 {item}
            </Text>
          </TouchableOpacity>
        ))
      }

      <Text style={styles.sectionTitle}>
        Quick Access
      </Text>

      <View style={styles.quickRow}>

        <TouchableOpacity style={styles.quickCard}>
          <Text style={styles.quickIcon}>❤️</Text>
          <Text style={styles.quickText}>Favorites</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.quickCard}>
          <Text style={styles.quickIcon}>🕒</Text>
          <Text style={styles.quickText}>History</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.quickCard}>
          <Text style={styles.quickIcon}>👤</Text>
          <Text style={styles.quickText}>Profile</Text>
        </TouchableOpacity>

      </View>

    </ScrollView>
  );
};

export default HomeScreen;