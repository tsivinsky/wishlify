import React from "react";
import { useAuth } from "../store";

export const Home: React.FC<PageProps> = () => {
  const { auth } = useAuth();

  return (
    <div className="home-page">
      <h1>Homepage</h1>
      <h2>Email: {auth.user?.email}</h2>
    </div>
  );
};
