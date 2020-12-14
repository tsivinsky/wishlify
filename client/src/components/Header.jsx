// Import dependencies
import React from "react";
import { NavLink } from "react-router-dom";
import { collect } from "react-recollect";
import { useHistory } from "react-router-dom";

function Header({ store }) {
  const history = useHistory();

  function logout() {
    store.auth = {
      state: false,
      user: null,
    };

    localStorage.removeItem("user");

    history.push("/");
  }

  return (
    <header>
      <NavLink to="/">
        <h1>Wishlify</h1>
      </NavLink>
      {store.auth.state ? (
        <nav>
          <button onClick={logout}>Log Out</button>
        </nav>
      ) : (
        <h3>Buy all of them</h3>
      )}
    </header>
  );
}

export default collect(Header);
