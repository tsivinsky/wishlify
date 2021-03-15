import React from "react";
import { useAuth } from "../store";

export const Account: React.FC<PageProps> = () => {
  const { auth } = useAuth();

  console.log(auth);

  return (
    <div className="account-page">
      <h1>Hello, {auth.user?.name}!</h1>
    </div>
  );
};
