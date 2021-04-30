import Link from "next/link";
import { useEffect } from "react";
import { useLoading, useSession } from "../store";
import { PageProps } from "../types";

export default function Index({ router }: PageProps) {
  const { user } = useSession();
  const { loading, stopLoading } = useLoading();

  // Redirect to /home if user is authenticated
  useEffect(() => {
    if (user) {
      router.push("/home");
    }
  }, [user]);

  useEffect(() => {
    if (loading) {
      stopLoading();
    }
  }, [user]);

  return (
    <div id="page" className="welcome-page">
      <div className="left-side">
        <h1>Wishlify</h1>
      </div>

      <div className="right-side">
        <Link href="/signin">
          <a>Sign In</a>
        </Link>
      </div>
    </div>
  );
}
