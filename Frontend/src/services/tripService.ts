import api from "./api";
import AsyncStorage from "@react-native-async-storage/async-storage";

const getToken = async () => {
  return await AsyncStorage.getItem("token");
};

export const saveTrip = async (tripData: any) => {
  const token = await getToken();

  const response = await api.post("/trips", tripData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

export const getSavedTrips = async () => {
  const token = await getToken();

  const response = await api.get("/trips", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};