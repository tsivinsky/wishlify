import Link from "next/link";
import { NextRouter } from "next/router";
import { useSession } from "../store";

export const Header: React.FC<{ router: NextRouter }> = ({ router }) => {
  const { user, removeSession } = useSession();

  function logout() {
    if (!confirm("Are you sure?")) return;

    removeSession();

    router.push("/");
  }

  return (
    <header>
      <Link href={user ? "/home" : "/"}>
        <a>
          <h1>Wishlify</h1>
        </a>
      </Link>

      {user && (
        <nav>
          <Link href="/account">
            <a>Account</a>
          </Link>
          <button className="btn btn-logout" onClick={logout}>
            Log out
          </button>
        </nav>
      )}
    </header>
  );
};
