import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "@react-native-vector-icons/ionicons";
import type { ComponentProps } from "react";

import ExploreScreen from "../screens/explore/ExploreScreen";
import RouteScreen from "../screens/routes/RouteScreen";
import SavedScreen from "../screens/saved/SavedScreen";
import ProfileScreen from "../screens/profile/ProfileScreen";

type IconName = ComponentProps<typeof Ionicons>["name"];

const Tab = createBottomTabNavigator();

const icons: Record<
  string,
  { active: IconName; inactive: IconName }
> = {
  Explore: {
    active: "compass",
    inactive: "compass-outline",
  },
  Routes: {
    active: "map",
    inactive: "map-outline",
  },
  Saved: {
    active: "bookmark",
    inactive: "bookmark-outline",
  },
  Profile: {
    active: "person",
    inactive: "person-outline",
  },
};

const MainTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,

        tabBarActiveTintColor: "#1565C0",
        tabBarInactiveTintColor: "#757575",

        tabBarStyle: {
          height: 65,
          paddingBottom: 8,
          paddingTop: 8,
        },

        tabBarIcon: ({ focused, color, size }) => {
          const icon = icons[route.name];

          return (
            <Ionicons
              name={focused ? icon.active : icon.inactive}
              size={size}
              color={color}
            />
          );
        },
      })}
    >
      <Tab.Screen name="Explore" component={ExploreScreen} />
      <Tab.Screen name="Routes" component={RouteScreen} />
      <Tab.Screen name="Saved" component={SavedScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

export default MainTabNavigator;