import create from "zustand";
import { combine } from "zustand/middleware";

interface IAuth {
  token: string | null;
  user: IUser | null;
}

const initialState: IAuth = {
  token: null,
  user: null,
};

export const useAuth = create(
  combine(
    {
      auth: initialState,
    },
    (set) => ({
      setAuth: (token: string, user: IUser) => set({ auth: { token, user } }),
      removeAuth: () => set({ auth: initialState }),
    })
  )
);
