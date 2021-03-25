import { useEffect } from "react";
import { AppProps } from "next/app";
import { Header, Notification } from "../components";
import { api } from "../helpers";
import { useAuth, useLoading, useMessage, useTokenStore } from "../store";

import "../scss/style.scss";

export default function App({ Component, pageProps, router }: AppProps) {
  const { auth, setAuth } = useAuth();
  const { setMessage } = useMessage();
  const { token } = useTokenStore();
  const { stopLoading } = useLoading();

  // Get user's data if token exists in localStorage
  useEffect(() => {
    if (token && !auth.user) {
      api.user
        .getAuthorizedUser(token)
        .then((user) => setAuth(token, user))
        .catch((err) => setMessage(err))
        .then(() => stopLoading());
    }
  }, []);

  return (
    <>
      <Header router={router} />
      <Notification />
      <Component router={router} {...pageProps} />
    </>
  );
}
