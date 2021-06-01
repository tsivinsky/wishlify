import { useSession } from "../store";
import { PageProps } from "../types";

export default function Account({}: PageProps) {
  const { user } = useSession();

  return (
    <div className="account-page">
      <main>
        <h2>Your account data</h2>

        <div id="data">
          <div id="username" className="row">
            <h3>Username</h3>
            <span>{user!.username}</span>
          </div>

          <div id="email" className="row">
            <h3>Email</h3>
            <span>{user!.email}</span>
          </div>

          <div id="creation-date" className="row">
            <h3>When you signed up</h3>
            <span>{parseDate(user!.createdAt)}</span>
          </div>
        </div>
      </main>
    </div>
  );
}

function parseDate(time: string) {
  const date = new Date(time);

  return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
}
