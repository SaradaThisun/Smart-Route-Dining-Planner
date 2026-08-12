import React from "react";
import {
  View,
  TextInput,
  StyleSheet,
} from "react-native";

import Ionicons from '@react-native-vector-icons/ionicons';
interface Props {
  value: string;
  onChangeText: (text: string) => void;
}

const SearchBar = ({
  value,
  onChangeText,
}: Props) => {
  return (
    <View style={styles.container}>
      <Ionicons
        name="search"
        size={22}
        color="#7A7A7A"
      />

      <TextInput
        style={styles.input}
        placeholder="Search hotels, restaurants..."
        placeholderTextColor="#999"
        value={value}
        onChangeText={onChangeText}
      />
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    marginHorizontal: 20,
    marginTop: 20,
    paddingHorizontal: 15,
    height: 55,
    borderRadius: 15,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,

    elevation: 3,
  },

  input: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
    color: "#222",
  },
});