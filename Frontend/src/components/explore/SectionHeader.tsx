import React from "react";
import {
  View,
  Text,
  StyleSheet,
} from "react-native";

interface Props {
  title: string;
}

const SectionHeader = ({
  title,
}: Props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {title}
      </Text>
    </View>
  );
};

export default SectionHeader;

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    marginBottom: 15,
    paddingHorizontal: 20,
  },

  title: {
    fontSize: 22,
    fontWeight: "700",
    color: "#1F2937",
  },
});