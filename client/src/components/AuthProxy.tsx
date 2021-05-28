import React, { useEffect } from "react";
import toast from "react-hot-toast";
import { api } from "../helpers";
import { useLoading, useSession } from "../store";

export const AuthProxy: React.FC = (props) => {
  const { token, setSession } = useSession();
  const { loading, stopLoading } = useLoading();

  useEffect(() => {
    if (token) {
      api.user
        .getAuthorizedUser(token)
        .then((user) => setSession(token, user))
        .catch((err) => toast.error(err.message))
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
