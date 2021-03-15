import { useEffect } from "react";
import { useAuth, useLoading } from "../store";
import { isUserAuthorized } from "../helpers";

export default function Index({ router }: PageProps) {
  const { auth } = useAuth();
  const { loading, stopLoading } = useLoading();

  // Redirect to /home if user is not authorized
  useEffect(() => {
    if (isUserAuthorized(auth)) {
      router.push("/home");
    }
  }, [auth]);

  useEffect(() => {
    if (loading) {
      stopLoading();
    }
  }, [auth]);

  return (
    <div className="home-page">
      <h1>Wishlify</h1>
    </div>
  );
}
