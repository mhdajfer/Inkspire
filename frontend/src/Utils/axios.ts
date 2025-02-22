import axios from "axios";
import Cookies from "js-cookie";

export const axiosInstance = axios.create({
  baseURL: "https://api-inkspire.mhdajfer.in/api",
  withCredentials: true,
});

axiosInstance.interceptors.request.use((config) => {
  const token = Cookies.get("token");
  if (token) {
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
