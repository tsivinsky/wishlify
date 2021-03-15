import React from "react";
import { NavLink, useHistory } from "react-router-dom";
import { useAuth } from "../store";

export const Header: React.FC = () => {
  const { auth, removeAuth } = useAuth();
  const history = useHistory();

  const isUserAuthenticated = Boolean(
    auth.user !== null && auth.token !== null
  );

  function logout() {
    removeAuth();

    history.push("/");
  }

  return (
    <header>
      <NavLink to="/">
        <h1>Wishlify</h1>
      </NavLink>

      {isUserAuthenticated ? (
        <nav>
          <NavLink to="/account">Account</NavLink>
          <button onClick={logout}>Log out</button>
        </nav>
      ) : (
        <nav>
          <NavLink to="/join">Sign Up</NavLink>
          <NavLink to="/login">Sign In</NavLink>
        </nav>
      )}
    </header>
  );
};
