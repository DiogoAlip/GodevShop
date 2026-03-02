import axios from "axios";

const GoDevApi = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export { GoDevApi };
