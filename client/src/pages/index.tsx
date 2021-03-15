import { useRouter } from "next/router";
import { useAuth } from "../store";
import { isUserAuthorized, isServer } from "../helpers";

export default function Index() {
  const { push } = useRouter();
  const { auth } = useAuth();

  if (isUserAuthorized(auth) && !isServer) {
    push("/home");
  }

  return (
    <div className="home-page">
      <h1>Wishlify</h1>
    </div>
  );
}
