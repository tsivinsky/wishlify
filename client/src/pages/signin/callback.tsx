import { useEffect } from "react";
import toast from "react-hot-toast";
import { api } from "../../helpers";
import { useSession } from "../../store";
import { PageProps } from "../../types";

export default function Callback({ router }: PageProps) {
  const { token } = router.query;
  const { setSession } = useSession();

  useEffect(() => {
    if (token) {
      api.user
        .getAuthorizedUser(token as string)
        .then((user) => {
          setSession(token as string, user);

          router.push("/home");
        })
        .catch((err) => toast.error(err.message));
    }
  }, [token]);

  return null;
}
