import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  FlatList,
  Image,
  StyleSheet,
  ActivityIndicator,
} from "react-native";

import SearchBar from "../../components/explore/SearchBar";
import CategoryCard from "../../components/explore/CategoryCard";
import SectionHeader from "../../components/explore/SectionHeader";
import PlaceCard from "../../components/explore/PlaceCard";
import { SafeAreaView } from "react-native-safe-area-context";

import api from "../../services/api";

const banner = require("../../assets/images/banner.jpg");
const hotelImage = require("../../assets/images/hotel.jpg");
const restaurantImage = require("../../assets/images/restaurant.jpg");
const attractionImage = require("../../assets/images/attraction.jpg");
const cafeImage = require("../../assets/images/cafe.jpg");

interface Place {
  _id: string;
  name: string;
  type: string;
  city: string;
  rating: number;
  priceRange: string;
  image: string;
}

const ExploreScreen = () => {
  const [places, setPlaces] = useState<Place[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    loadPlaces();
  }, []);

  const loadPlaces = async () => {
    try {
      const response = await api.get("/places");
      setPlaces(response.data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const filterPlaces = (type: string) => {
    return places.filter(
      place =>
        place.type === type &&
        place.name.toLowerCase().includes(search.toLowerCase())
    );
  };

  const getImage = (type: string) => {
    switch (type) {
      case "hotel":
        return hotelImage;

      case "restaurant":
        return restaurantImage;

      case "attraction":
        return attractionImage;

      case "cafe":
        return cafeImage;

      default:
        return banner;
    }
  };

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
    
    <SafeAreaView
    style={{ flex: 1 }}
    edges={["top"]}
  >

    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
    >
      <Image
        source={banner}
        style={styles.banner}
      />

      <View style={styles.header}>
        <Text style={styles.greeting}>
          👋 Good Afternoon
        </Text>

        <Text style={styles.title}>
          Explore Sri Lanka
        </Text>
      </View>

      <SearchBar
        value={search}
        onChangeText={setSearch}
      />

      <View style={styles.categories}>
       <ScrollView
  horizontal
  showsHorizontalScrollIndicator={false}
  contentContainerStyle={styles.categories}
>
  <CategoryCard emoji="🏨" title="Hotels" />
  <CategoryCard emoji="🍽" title="Restaurants" />
  <CategoryCard emoji="⭐" title="Attractions" />
  <CategoryCard emoji="☕" title="Cafes" />
</ScrollView>
      </View>

      <SectionHeader title="🏨 Hotels" />

      <FlatList
        horizontal
        data={filterPlaces("hotel")}
        keyExtractor={item => item._id}
        renderItem={({ item }) => (
          <PlaceCard
            place={item}
            image={getImage(item.type)}
          />
        )}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.list}
      />

      <SectionHeader title="🍽 Restaurants" />

      <FlatList
        horizontal
        data={filterPlaces("restaurant")}
        keyExtractor={item => item._id}
        renderItem={({ item }) => (
          <PlaceCard
            place={item}
            image={getImage(item.type)}
          />
        )}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.list}
      />

      <SectionHeader title="⭐ Attractions" />

      <FlatList
        horizontal
        data={filterPlaces("attraction")}
        keyExtractor={item => item._id}
        renderItem={({ item }) => (
          <PlaceCard
            place={item}
            image={getImage(item.type)}
          />
        )}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.list}
      />

      <SectionHeader title="☕ Cafes" />

      <FlatList
        horizontal
        data={filterPlaces("cafe")}
        keyExtractor={item => item._id}
        renderItem={({ item }) => (
          <PlaceCard
            place={item}
            image={getImage(item.type)}
          />
        )}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.list}
      />
    </ScrollView>
    </SafeAreaView>
  );
};

export default ExploreScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F7FA",
  },

  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  banner: {
    width: "100%",
    height: 220,
  },

  header: {
    paddingHorizontal: 20,
    marginTop: 20,
  },

  greeting: {
    fontSize: 16,
    color: "#666",
  },

  title: {
    fontSize: 30,
    fontWeight: "700",
    color: "#1565C0",
    marginTop: 5,
  },

  categories: {
  paddingHorizontal: 20,
  paddingVertical: 10,
  gap: 15,
},

  list: {
    paddingHorizontal: 20,
    paddingBottom: 10,
  },
});