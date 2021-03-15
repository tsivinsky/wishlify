import Link from "next/link";
import { isUserAuthorized } from "../helpers";
import { useAuth } from "../store";

export const Header: React.FC = () => {
  const { auth } = useAuth();

  return (
    <header>
      <Link href="/">
        <a>
          <h1>Wishlify</h1>
        </a>
      </Link>

      {isUserAuthorized(auth) ? (
        <nav>
          <Link href="/account">
            <a>Account</a>
          </Link>
          <button>Log out</button>
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
