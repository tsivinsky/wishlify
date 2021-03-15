import create from "zustand";
import { combine } from "zustand/middleware";
import { isServer } from "../helpers";

function getDefaultValues() {
  if (!isServer) {
    try {
      return {
        token: localStorage.getItem("token") as string,
      };
    } catch (error) {}
  }

  return {
    token: "",
  };
}

export const useTokenStore = create(
  combine(getDefaultValues(), (set) => ({
    setToken: (token: string) => {
      try {
        localStorage.setItem("token", token);
      } catch (error) {}

      set({ token });
    },
  }))
);
