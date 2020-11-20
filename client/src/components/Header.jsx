// Import dependencies
import React from "react";
import { NavLink } from "react-router-dom";

export default function Header() {
  return (
    <header>
      <NavLink to="/">
        <h1>Wishlify</h1>
      </NavLink>
      <nav>
        <NavLink to="/register">Sign Up</NavLink>
        <NavLink to="/login">Sign In</NavLink>
      </nav>
    </header>
  );
}
