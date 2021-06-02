import { AppProps } from "next/app";
import Head from "next/head";
import { Toaster } from "react-hot-toast";
import { AuthProxy, Header } from "../components";

import "../scss/style.scss";

const routesWithHeader = [
  "/home",
  "/account",
  "/[username]",
  "/[username]/[displayName]",
];

export default function App({ Component, pageProps, router }: AppProps) {
  return (
    <AuthProxy>
      <Head>
        <title>Wishlify</title>
        <link rel="shortcut icon" href="/assets/favicon.png" />
      </Head>

      {routesWithHeader.includes(router.pathname) && <Header router={router} />}

      <Toaster />
      <Component router={router} {...pageProps} />
    </AuthProxy>
  );
}
