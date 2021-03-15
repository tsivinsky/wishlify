import Link from "next/link";
import { NextRouter } from "next/router";
import { isUserAuthorized } from "../helpers";
import { useAuth } from "../store";

export const Header: React.FC<{ router: NextRouter }> = ({ router }) => {
  const { auth, removeAuth } = useAuth();

  function logout() {
    if (!confirm("Are you sure?")) return;

    removeAuth();

    router.push("/");
  }

  return (
    <header>
      <Link href={auth.user !== null ? "/home" : "/"}>
        <a>
          <h1>Wishlify</h1>
        </a>
      </Link>

      {isUserAuthorized(auth) ? (
        <nav>
          <Link href="/account">
            <a>Account</a>
          </Link>
          <button className="btn btn-logout" onClick={logout}>
            Log out
          </button>
        </nav>
      ) : (
        <nav>
          <Link href="/join">
            <a>Sign Up</a>
          </Link>
          <Link href="/login">
            <a>Sign In</a>
          </Link>
        </nav>
      )}
    </header>
  );
};
