import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

import Ionicons from '@react-native-vector-icons/ionicons';
interface Props {
  place: any;
  image: any;
}

const PlaceCard = ({
  place,
  image,
}: Props) => {
  return (
    <TouchableOpacity style={styles.card}>

      <Image
        source={image}
        style={styles.image}
      />

      <View style={styles.content}>

        <Text
          numberOfLines={1}
          style={styles.name}
        >
          {place.name}
        </Text>

        <View style={styles.locationRow}>
          <Ionicons
            name="location"
            size={15}
            color="#1565C0"
          />

          <Text style={styles.location}>
            {place.city}
          </Text>
        </View>

        <View style={styles.bottomRow}>
          <Text style={styles.rating}>
            ⭐ {place.rating}
          </Text>

          <Text style={styles.price}>
            {place.priceRange}
          </Text>
        </View>

      </View>

    </TouchableOpacity>
  );
};

export default PlaceCard;

const styles = StyleSheet.create({
  card: {
    width: 240,
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    overflow: "hidden",
    marginRight: 18,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 6,

    elevation: 5,
  },

  image: {
    width: "100%",
    height: 150,
  },

  content: {
    padding: 15,
  },

  name: {
    fontSize: 18,
    fontWeight: "700",
    color: "#222",
  },

  locationRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },

  location: {
    marginLeft: 5,
    color: "#666",
  },

  bottomRow: {
    marginTop: 12,
    flexDirection: "row",
    justifyContent: "space-between",
  },

  rating: {
    color: "#FF9800",
    fontWeight: "700",
  },

  price: {
    color: "#2E7D32",
    fontWeight: "700",
  },
});