import Link from "next/link";
import { NextRouter } from "next/router";
import { useSession } from "../store";

export const Header: React.FC<{ router: NextRouter }> = ({ router }) => {
  const { removeSession } = useSession();

  function logout() {
    if (!confirm("Are you sure you want to sign out?")) return;

    removeSession();

    router.push("/");
  }

  return (
    <header>
      <h1>Wishlify</h1>

      <nav>
        <Link href="/home">Home</Link>
        <Link href="/account">Account</Link>
        <button className="btn btn-secondary" onClick={logout}>
          Sign Out
        </button>
      </nav>
    </header>
  );
};
