import { store } from "react-recollect";

export function showError(text = "") {
  store.message = {
    text,
    error: true,
  };
}

export function showMessage(text = "") {
  store.message = {
    text,
    error: false,
  };
}

export function clearMessage() {
  store.message = null;
}
