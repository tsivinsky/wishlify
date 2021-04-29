import create, { State } from "zustand";
import { IMessage } from "../types";

interface IState extends State {
  message: IMessage;
  setMessage: (message: IMessage) => void;
  removeMessage: () => void;
}

export const useMessage = create<IState>((set) => ({
  message: null,
  setMessage: (message) => {
    set({ message });
  },
  removeMessage: () => {
    set({ message: null });
  },
}));
