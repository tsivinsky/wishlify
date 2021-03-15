import { useEffect } from "react";
import { useAuth, useLoading } from "../store";
import { isUserAuthorized } from "../helpers";

export default function Home({ router }: PageProps) {
  const { auth } = useAuth();
  const { loading } = useLoading();

  useEffect(() => {
    if (!isUserAuthorized(auth) && !loading) {
      router.push("/");
    }
  }, [auth]);

  if (auth.user) {
    return (
      <div className="home-page">
        <h1>Home page</h1>
      </div>
    );
  }

  return null;
}
