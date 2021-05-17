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
      <div id="heading">
        <h1>Wishlify</h1>
        <div>
          <p>
            Wishlify allows you to store all your most wanted products in one
            place. Just create a wishlist and add the product in it by pasting
            its url.
          </p>
        </div>
      </div>

      <Link href="/signin">
        <button className="btn btn-primary">Sign In</button>
      </Link>
    </div>
  );
}
