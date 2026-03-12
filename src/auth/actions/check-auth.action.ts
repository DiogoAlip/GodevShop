import { GoDevApi } from "@/api/GodevApi";
import type { AuthResponse } from "../interfaces/auth.response";

export const checkAuthAction = async (): Promise<AuthResponse> => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("No token found");

  try {
    const { data } = await GoDevApi.get<AuthResponse>("/auth/check-status", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    localStorage.setItem("token", data.token);

    return data;
  } catch (error) {
    localStorage.removeItem("token");
    console.log(error);
    throw new Error("Token expired or not valid");
  }
};
