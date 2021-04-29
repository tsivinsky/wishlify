import create, { State } from "zustand";

interface IState extends State {
  loading: boolean;
  startLoading: () => void;
  stopLoading: () => void;
}

export const useLoading = create<IState>((set) => ({
  loading: true,
  startLoading: () => set({ loading: true }),
  stopLoading: () => set({ loading: false }),
}));
