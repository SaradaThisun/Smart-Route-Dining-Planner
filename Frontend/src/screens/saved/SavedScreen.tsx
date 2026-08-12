import React, { useCallback, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  RefreshControl,
} from "react-native";

import { useFocusEffect } from "@react-navigation/native";

import { getSavedTrips } from "../../services/tripService";

const SavedScreen = () => {
  const [trips, setTrips] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const loadTrips = async () => {
    try {
      const response = await getSavedTrips();
      setTrips(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      loadTrips();
    }, [])
  );

  const onRefresh = () => {
    setRefreshing(true);
    loadTrips();
  };

  const renderItem = ({ item }: any) => (
    <View style={styles.card}>
      <Text style={styles.route}>
        {item.start} → {item.destination}
      </Text>

      <Text style={styles.distance}>
        📏 {item.distance} km
      </Text>

      <Text style={styles.stops}>
        📍 {item.route.length} Stops
      </Text>

      <Text style={styles.date}>
        Saved on{" "}
        {new Date(item.createdAt).toLocaleDateString()}
      </Text>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator
          size="large"
          color="#1565C0"
        />
      </View>
    );
  }

  return (
    <FlatList
      data={trips}
      keyExtractor={(item) => item._id}
      renderItem={renderItem}
      contentContainerStyle={styles.container}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
        />
      }
      ListHeaderComponent={
        <>
          <Text style={styles.title}>
            💾 Saved Trips
          </Text>

          <Text style={styles.subtitle}>
            Your saved journeys
          </Text>
        </>
      }
      ListEmptyComponent={
        <View style={styles.empty}>
          <Text style={styles.emptyText}>
            No saved trips yet.
          </Text>
        </View>
      }
    />
  );
};

export default SavedScreen;


const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#F4F7FB",
    flexGrow: 1,
  },

  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F4F7FB",
  },

  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#1565C0",
    marginTop: 20,
  },

  subtitle: {
    color: "#777",
    marginBottom: 25,
  },

  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 18,
    marginBottom: 18,
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: {
      width: 0,
      height: 3,
    },
  },

  route: {
    fontSize: 20,
    fontWeight: "700",
    color: "#1565C0",
    marginBottom: 10,
  },

  distance: {
    fontSize: 16,
    color: "#2E7D32",
    marginBottom: 5,
  },

  stops: {
    fontSize: 15,
    color: "#555",
    marginBottom: 5,
  },

  date: {
    fontSize: 13,
    color: "#999",
  },

  empty: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 100,
  },

  emptyText: {
    fontSize: 18,
    color: "#999",
  },
});