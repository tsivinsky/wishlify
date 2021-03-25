import { useAuth } from "../store";

export default function Home({ router }: PageProps) {
  const { auth } = useAuth();

  if (auth.user) {
    return (
      <div className="home-page">
        <h1>Hello, {auth.user.name}!</h1>
      </div>
    );
  }

  return null;
}
