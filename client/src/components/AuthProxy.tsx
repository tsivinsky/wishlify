import React, { PropsWithChildren, useEffect } from "react";
import { useAuth, useLoading, useMessage } from "../store";
import { api } from "../helpers";

export const AuthProxy = (props: PropsWithChildren<{}>) => {
  const { setAuth } = useAuth();
  const { stopLoading } = useLoading();
  const { setMessage } = useMessage();

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      api.user
        .getAuthorizedUser(token)
        .then((user) => setAuth(token, user))
        .catch((err) => setMessage({ text: err?.response?.data }))
        .then(() => stopLoading());
    } else {
      stopLoading();
    }
  }, []);

  return <>{props.children}</>;
};
