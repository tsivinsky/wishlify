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
      <h1>Wishlify</h1>

      {user ? (
        <nav>
          <Link href="/home">
            <a>Home</a>
          </Link>
          <Link href="/account">
            <a>Account</a>
          </Link>
          <button className="btn btn-logout" onClick={logout}>
            Log out
          </button>
        </nav>
      ) : (
        <nav>
          <Link href="/">
            <a>Home</a>
          </Link>
        </nav>
      )}
    </header>
  );
};
