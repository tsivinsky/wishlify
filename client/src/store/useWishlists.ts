import create, { State } from "zustand";
import { IWishlist } from "../types";

export const useWishlists = create(
  combine(
    {
      wishlists: [] as Array<IWishlist>,
    },
    (set) => ({
      setWishlists: (wishlists: Array<IWishlist>) => set({ wishlists }),
      clearWishlists: () => set({ wishlists: [] as Array<IWishlist> }),
    })
  )
);
