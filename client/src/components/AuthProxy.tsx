import React, { useEffect } from "react";
import { api } from "../helpers";
import { useAuth, useLoading, useMessage, useTokenStore } from "../store";

export const AuthProxy: React.FC = (props) => {
  const { setAuth } = useAuth();
  const { token } = useTokenStore();
  const { loading, stopLoading } = useLoading();
  const { setMessage } = useMessage();

  useEffect(() => {
    if (token) {
      api.user
        .getAuthorizedUser(token)
        .then((user) => setAuth(token, user))
        .catch((err) => setMessage({ text: err }))
        .then(() => stopLoading());
    } else {
      stopLoading();
    }
  }, [token]);

  if (!loading) {
    return <>{props.children}</>;
  }

  return null;
};
