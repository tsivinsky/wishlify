import { PageProps } from "../types";

export default function Account({}: PageProps) {
  const { auth } = useAuth();

  return (
    <div className="home-page">
      <h1>Hello, {auth.user!.name}!</h1>
    </div>
  );
}
