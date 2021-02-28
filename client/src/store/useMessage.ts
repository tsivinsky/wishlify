import create from "zustand";
import { combine } from "zustand/middleware";

interface IMessage {
  text: string;
}

const initialState: IMessage = {
  text: "",
};

export const useMessage = create(
  combine(
    {
      message: initialState,
    },
    (set) => ({
      setMessage: (message: IMessage) => set({ message }),
      removeMessage: () => set({ message: initialState }),
    })
  )
);
