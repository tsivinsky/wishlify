import create from "zustand";
import { combine } from "zustand/middleware";

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
