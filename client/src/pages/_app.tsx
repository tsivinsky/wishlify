import { AppProps } from "next/app";
import { useEffect } from "react";
import { Notification, AuthProxy } from "../components";
import { useMessage } from "../store";

import "../scss/style.scss";

export default function App({ Component, pageProps, router }: AppProps) {
  const { message, removeMessage } = useMessage();

  useEffect(() => {
    if (message) {
      setTimeout(removeMessage, 3000); // Remove notification after 3 seconds
    }
  }, [message]);

  useEffect(() => {
    removeMessage();
  }, [router.route]);

  return (
    <AuthProxy>
      <Notification />
      <Component router={router} {...pageProps} />
    </AuthProxy>
  );
}
