import { AppProps } from "next/app";
import { useRouter } from "next/router";
import { AuthProxy, Header, Notification } from "../components";

import "../scss/style.scss";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  console.log(router.route);

  return (
    <AuthProxy>
      <Header router={router} />
      <Notification />
      <Component router={router} {...pageProps} />
    </AuthProxy>
  );
}
