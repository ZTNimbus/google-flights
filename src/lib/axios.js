import axios from "axios";
import { BASE_URL } from "../constants";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
    "x-rapidapi-key": import.meta.env.VITE_API_KEY,
  },
});

export default axiosInstance;
