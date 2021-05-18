import { Header } from "../components";
import { useSession } from "../store";
import { PageProps } from "../types";

export default function Account({ router }: PageProps) {
  const { user } = useSession();

  return (
    <div id="page" className="account-page">
      <Header router={router} />

      <h1>Hello, {user!.username}!</h1>
    </div>
  );
}
