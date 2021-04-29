import { useSession } from "../store";
import { PageProps } from "../types";

export default function Account({}: PageProps) {
  const { user } = useSession();

  return (
    <div className="home-page">
      <h1>Hello, {user!.username}!</h1>
    </div>
  );
}
