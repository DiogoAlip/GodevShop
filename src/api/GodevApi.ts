import axios from "axios";

const GoDevApi = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

GoDevApi.interceptors.request.use((connfig) => {
  const token = localStorage.getItem("token");

  if (token) {
    connfig.headers.Authorization = `Bearer ${token}`;
  }
  return connfig;
});

export { GoDevApi };
