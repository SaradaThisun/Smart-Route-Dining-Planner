import React from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
} from "react-native";

interface Props {
  emoji: string;
  title: string;
  onPress?: () => void;
}

const CategoryCard = ({
  emoji,
  title,
  onPress,
}: Props) => {
  return (
    <TouchableOpacity
      style={styles.card}
      onPress={onPress}
    >
      <Text style={styles.emoji}>
        {emoji}
      </Text>

      <Text style={styles.title}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default CategoryCard;

const styles = StyleSheet.create({
  card: {
    width: 85,
    height: 90,
    backgroundColor: "#FFFFFF",
    borderRadius: 18,

    justifyContent: "center",
    alignItems: "center",

    marginRight: 15,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,

    elevation: 4,
  },

  emoji: {
    fontSize: 30,
  },

  title: {
    marginTop: 10,
    fontWeight: "600",
    color: "#333",
    textAlign: "center",
    fontSize: 13,
  },
});