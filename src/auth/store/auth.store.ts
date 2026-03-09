import { create } from "zustand";
import type { User } from "@/interfaces/user.interface";
import { loginAction } from "../actions/login.action";

type AuthStore = {
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<boolean>;
};

export const useAuthStore = create<AuthStore>()((set) => ({
  user: null,
  token: null,
  login: async (email: string, password: string) => {
    console.log(email, password);

    try {
      const data = await loginAction(email, password);
      localStorage.setItem("token", data.token);
      set({ user: data.user, token: data.token });
      return true;
    } catch (error) {
      console.log(error);
      localStorage.removeItem("token");
      set({ user: null, token: null });
      return false;
    }
  },
}));
