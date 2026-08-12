import api from "./api";

export const getRecommendations = async (cities: string[]) => {
  const response = await api.post("/recommendations/route", {
    cities,
  });

  return response.data;
};