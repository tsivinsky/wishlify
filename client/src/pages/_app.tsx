import { AppProps } from "next/app";
import { Notification, AuthProxy } from "../components";

import "../scss/style.scss";

export default function App({ Component, pageProps, router }: AppProps) {
  return (
    <AuthProxy>
      <Notification />
      <Component router={router} {...pageProps} />
    </AuthProxy>
  );
}
