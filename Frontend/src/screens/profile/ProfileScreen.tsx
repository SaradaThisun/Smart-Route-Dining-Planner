import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ScrollView,
} from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";
import Ionicons from '@react-native-vector-icons/ionicons';
import { useNavigation } from "@react-navigation/native";

const ProfileScreen = () => {
  const navigation = useNavigation<any>();

  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    const storedUser = await AsyncStorage.getItem("user");

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  };

  const logout = async () => {
    Alert.alert(
      "Logout",
      "Are you sure you want to logout?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Logout",
          style: "destructive",
          onPress: async () => {
            await AsyncStorage.removeItem("token");
            await AsyncStorage.removeItem("user");

            navigation.replace("Login");
          },
        },
      ]
    );
  };

  return (

    


    <ScrollView style={styles.container}>
      <View style={styles.header}>

        <View style={styles.avatar}>
          <Ionicons
            name="person"
            size={60}
            color="#1565C0"
          />
        </View>

        <Text style={styles.name}>
          {user?.fullName}
        </Text>

        <Text style={styles.email}>
          {user?.email}
        </Text>

      </View>

      <View style={styles.statsContainer}>

        <View style={styles.statBox}>
          <Text style={styles.statNumber}>12</Text>
          <Text style={styles.statTitle}>
            Trips
          </Text>
        </View>

        <View style={styles.statBox}>
          <Text style={styles.statNumber}>35</Text>
          <Text style={styles.statTitle}>
            Places
          </Text>
        </View>

        <View style={styles.statBox}>
          <Text style={styles.statNumber}>4.9</Text>
          <Text style={styles.statTitle}>
            Rating
          </Text>
        </View>

      </View>

      <View style={styles.menu}>

        <MenuItem
          icon="person-outline"
          title="My Account"
        />

        <MenuItem
          icon="lock-closed-outline"
          title="Change Password"
        />

        <MenuItem
          icon="information-circle-outline"
          title="About"
        />

        <MenuItem
          icon="log-out-outline"
          title="Logout"
          onPress={logout}
          color="#E53935"
        />

      </View>

    </ScrollView>
  );
};

const MenuItem = ({
  icon,
  title,
  onPress,
  color = "#333",
}: any) => (
  <TouchableOpacity
    style={styles.menuItem}
    onPress={onPress}
  >
    <Ionicons
      name={icon}
      size={24}
      color={color}
    />

    <Text
      style={[
        styles.menuText,
        { color },
      ]}
    >
      {title}
    </Text>

    <Ionicons
      name="chevron-forward"
      size={20}
      color="#AAA"
    />
  </TouchableOpacity>
);

export default ProfileScreen;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F7FB",
  },

  header: {
    alignItems: "center",
    paddingVertical: 40,
    backgroundColor: "#1565C0",
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },

  avatar: {
    width: 110,
    height: 110,
    borderRadius: 55,
    backgroundColor: "#FFF",
    justifyContent: "center",
    alignItems: "center",
  },

  name: {
    color: "#FFF",
    fontSize: 24,
    fontWeight: "700",
    marginTop: 15,
  },

  email: {
    color: "#E3F2FD",
    marginTop: 5,
  },

  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 25,
    marginHorizontal: 20,
  },

  statBox: {
    backgroundColor: "#FFF",
    width: 100,
    padding: 20,
    borderRadius: 18,
    alignItems: "center",
    elevation: 3,
  },

  statNumber: {
    fontSize: 24,
    fontWeight: "700",
    color: "#1565C0",
  },

  statTitle: {
    color: "#666",
    marginTop: 5,
  },

  menu: {
    marginTop: 35,
    marginHorizontal: 20,
  },

  menuItem: {
    backgroundColor: "#FFF",
    flexDirection: "row",
    alignItems: "center",
    padding: 18,
    borderRadius: 15,
    marginBottom: 15,
  },

  menuText: {
    flex: 1,
    fontSize: 17,
    marginLeft: 15,
    fontWeight: "600",
  },
});