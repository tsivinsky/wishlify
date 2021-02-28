import React from "react";
import { useAuth } from "../store";

export const Account: React.FC = () => {
  const { auth } = useAuth();

  if (auth.user) {
    return (
      <div className="account-page">
        <h1>Hello, {auth.user.name}!</h1>
      </div>
    );
  }

  return null;
};
