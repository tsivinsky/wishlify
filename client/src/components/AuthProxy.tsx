import { PropsWithChildren, useEffect } from "react";
import { api } from "../helpers";
import { useAuth, useMessage, useTokenStore } from "../store";

export const AuthProxy: React.FC = (props: PropsWithChildren<{}>) => {
  const { token } = useTokenStore();
  const { setAuth } = useAuth();
  const { setMessage } = useMessage();

  useEffect(() => {
    if (token) {
      api.user
        .getAuthorizedUser(token)
        .then((user) => setAuth(token, user))
        .catch((err) => setMessage({ text: err as string }));
    }
  }, []);

  return <>{props.children}</>;
};
