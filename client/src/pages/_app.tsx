import { AppProps } from "next/app";
import { AuthProxy, Header, Notification } from "../components";

import "../scss/style.scss";

export default function App({ Component, pageProps, router }: AppProps) {
  return (
    <AuthProxy>
      <Header router={router} />
      <Notification />
      <Component router={router} {...pageProps} />
    </AuthProxy>
  );
}
