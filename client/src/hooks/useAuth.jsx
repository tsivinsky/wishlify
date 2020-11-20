import { useState } from "react";

export default function useAuth() {
  const [auth, setAuth] = useState(() => {
    if (localStorage.getItem("user")) {
      return { state: true, user: JSON.parse(localStorage.getItem("user")) };
    }

    return { state: false, user: {} };
  });

  return [auth, setAuth];
}
