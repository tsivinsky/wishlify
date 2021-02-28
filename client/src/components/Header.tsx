import React from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../store";

export const Header: React.FC = () => {
  const { auth } = useAuth();

  const isUserAuthenticated = Boolean(
    auth.user !== null && auth.token !== null
  );

  return (
    <header>
      <NavLink to="/">
        <h1>Wishlify</h1>
      </NavLink>

      {isUserAuthenticated ? (
        <nav>
          <NavLink to="/account">Account</NavLink>
        </nav>
      ) : null}
    </header>
  );
};
