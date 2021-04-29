import create, { State } from "zustand";
import { IWishlist } from "../types";

interface IState extends State {
  wishlists: Array<IWishlist>;
  setWishlists: (wishlists: Array<IWishlist>) => void;
}

export const useWishlists = create<IState>((set) => ({
  wishlists: [],
  setWishlists: (wishlists) => {
    set({ wishlists });
  },
}));
