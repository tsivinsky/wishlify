import { AppProps } from "next/app";
import { Header, Notification, AuthProxy } from "../components";

import "../scss/style.scss";

export default function App({ Component, pageProps, router }: AppProps) {
  return (
    <AuthProxy>
      {router.pathname !== "/" && <Header router={router} />}
      <Notification />
      <Component router={router} {...pageProps} />
    </AuthProxy>
  );
}
