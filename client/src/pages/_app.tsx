import { AppProps } from "next/app";
import { Toaster } from "react-hot-toast";
import { AuthProxy } from "../components";

import "../scss/style.scss";

export default function App({ Component, pageProps, router }: AppProps) {
  return (
    <AuthProxy>
      <Toaster />
      <Component router={router} {...pageProps} />
    </AuthProxy>
  );
}
