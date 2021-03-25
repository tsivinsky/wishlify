import { useEffect } from "react";
import { AppProps } from "next/app";
import { Header, Notification } from "../components";
import { api, isServer } from "../helpers";
import { useAuth, useLoading, useMessage, useTokenStore } from "../store";

import "../scss/style.scss";

const ROUTES_REQUIRE_AUTH = [
  "/home",
  "/account",
  "/[username]",
  "/[username]/[displayName]",
];

export default function App({ Component, pageProps, router }: AppProps) {
  const { auth, setAuth } = useAuth();
  const { setMessage } = useMessage();
  const { token } = useTokenStore();
  const { loading, stopLoading } = useLoading();

  // Get user's data if token exists in localStorage
  useEffect(() => {
    if (token && !auth.user) {
      api.user
        .getAuthorizedUser(token)
        .then((user) => setAuth(token, user))
        .catch((err) => setMessage(err))
        .then(() => stopLoading());
    } else {
      stopLoading();
    }
  }, []);

  useEffect(() => {
    if (
      !isServer &&
      ROUTES_REQUIRE_AUTH.includes(router.pathname) &&
      !loading &&
      !auth.user
    ) {
      router.push("/");
    }
  }, [router.pathname, loading, auth]);

  return (
    <>
      <Header router={router} />
      <Notification />
      <Component router={router} {...pageProps} />
    </>
  );
}
