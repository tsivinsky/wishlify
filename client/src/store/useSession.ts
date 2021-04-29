import create, { State } from "zustand";
import { isServer } from "../helpers";
import { IUser } from "../types";

interface IState extends State {
  token: string | null;
  user: IUser | null;
  setSession: (token: string, user: IUser) => void;
  removeSession: () => void;
}

function getDefaultTokenValue(): string | null {
  if (!isServer && localStorage.getItem("token")) {
    return localStorage.getItem("token");
  }

  return null;
}

export const useSession = create<IState>((set) => ({
  token: getDefaultTokenValue(),
  user: null,
  setSession: (token, user) => {
    set({ token, user });

    localStorage.setItem("token", token);
  },
  removeSession: () => {
    set({ token: null, user: null });

    localStorage.removeItem("token");
  },
}));
