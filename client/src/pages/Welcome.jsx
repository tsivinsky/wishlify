// Import dependencies
import React from "react";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { collect } from "react-recollect";
import axios from "../axios";
import { showError, clearMessage } from "../helpers/messages";

function Welcome({ store }) {
  const history = useHistory();
  const [showLoginForm, setShowLoginForm] = useState(true);

  // Function for handling login form
  async function login(e) {
    e.preventDefault();

    const email = document.querySelector("#email-input").value;
    const password = document.querySelector("#password-input").value;

    try {
      const response = await axios.post("/login", { email, password });

      saveUser(response.data);

      clearMessage();
      history.push("/home");
    } catch (err) {
      if (err.response) {
        showError(err.response.data);
      }
    }
  }

  // Function for handling register form
  async function register(e) {
    e.preventDefault();

    const name = document.querySelector("#name-input").value;
    const email = document.querySelector("#email-input").value;
    const password = document.querySelector("#password-input").value;

    try {
      const response = await axios.post("/register", { name, email, password });

      saveUser(response.data);

      clearMessage();
      history.push("/home");
    } catch (err) {
      if (err.response) {
        showError(err.response.data);
      }
    }
  }

  // Function for saving user's data
  function saveUser(data) {
    // Save user id in localStorage
    localStorage.setItem("user", data._id);

    store.auth = {
      state: true,
      user: data,
    };
  }

  return (
    <div className="welcome-page">
      {showLoginForm ? (
        <>
          <form id="login-form">
            <input type="email" id="email-input" placeholder="Your email" />
            <input
              type="password"
              id="password-input"
              placeholder="Your password"
            />
            <button type="submit" onClick={login}>
              Log In
            </button>
          </form>
          <button onClick={() => setShowLoginForm(false)}>
            Doesn`t have an account?
          </button>
        </>
      ) : (
        <>
          <form id="register-form">
            <input type="text" id="name-input" placeholder="Your name" />
            <input type="email" id="email-input" placeholder="Your email" />
            <input
              type="password"
              id="password-input"
              placeholder="Create password"
            />
            <button type="submit" onClick={register}>
              Sign Up
            </button>
          </form>
          <button onClick={() => setShowLoginForm(true)}>
            Already have an account?
          </button>
        </>
      )}
    </div>
  );
}

export default collect(Welcome);
