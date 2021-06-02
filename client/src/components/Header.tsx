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
      <Link href="/home">
        <div id="name">
          <img
            src="/assets/logo.svg"
            id="logo"
            width="64px"
            height="64px"
            alt="logo"
          />

          <h1>Wishlify</h1>
        </div>
      </Link>

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
