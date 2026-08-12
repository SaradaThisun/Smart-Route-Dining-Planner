import api from "./api";

export const getShortestRoute = async (
  start: string,
  end: string
) => {
  const response = await api.get(
    `/routes/shortest-path?start=${start}&end=${end}`
  );

  return response.data;
};