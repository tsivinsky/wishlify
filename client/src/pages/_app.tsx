import { AppProps } from "next/app";
import { AuthProxy, Header } from "../components";

import "../scss/style.scss";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProxy>
      <Header />
      <Component {...pageProps} />
    </AuthProxy>
  );
}
