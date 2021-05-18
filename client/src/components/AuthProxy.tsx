import React, { useEffect } from "react";
import { api } from "../helpers";
import { useLoading, useMessage, useSession } from "../store";

export const AuthProxy: React.FC = (props) => {
  const { token, setSession } = useSession();
  const { loading, stopLoading } = useLoading();
  const { setMessage } = useMessage();

  useEffect(() => {
    if (token) {
      api.user
        .getAuthorizedUser(token)
        .then((user) => setSession(token, user))
        .catch((err) => setMessage({ text: err.message, type: "error" }))
        .then(() => stopLoading());
    } else {
      stopLoading();
    }
  }, [token]);

  if (loading) {
    // TODO: Show loading screen
    return null;
  }

  return <>{props.children}</>;
};
