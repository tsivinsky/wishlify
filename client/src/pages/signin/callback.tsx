import { useEffect } from "react";
import { api } from "../../helpers";
import { useMessage, useSession } from "../../store";
import { PageProps } from "../../types";

export default function Callback({ router }: PageProps) {
  const { token } = router.query;
  const { setSession } = useSession();
  const { setMessage } = useMessage();

  useEffect(() => {
    if (token) {
      api.user
        .getAuthorizedUser(token as string)
        .then((user) => {
          setSession(token as string, user);

          router.push("/home");
        })
        .catch((err) => setMessage({ text: err }));
    }
  }, [token]);

  return null;
}
