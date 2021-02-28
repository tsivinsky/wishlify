import create from "zustand";
import { combine } from "zustand/middleware";

export const useLoading = create(
  combine(
    {
      loading: true,
    },
    (set) => ({
      startLoading: () => set({ loading: true }),
      stopLoading: () => set({ loading: false }),
    })
  )
);
