import axios from "axios";

const api = axios.create({
  // Android Emulator
  baseURL: "http://10.0.2.2:5100/api",

  // iPhone Simulator
  // baseURL: "http://localhost:5100/api",

  timeout: 10000,
});

export default api;