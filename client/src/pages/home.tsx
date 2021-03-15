import { useRouter } from "next/router";
import { useAuth } from "../store";
import { isUserAuthorized, isServer } from "../helpers";

export default function Home() {
  const { push } = useRouter();
  const { auth } = useAuth();

  if (!isUserAuthorized(auth) && !isServer) {
    push("/");
  }

  if (auth.user) {
    return (
      <div className="home-page">
        <h1>Home page</h1>
      </div>
    );
  }

  return null;
}
