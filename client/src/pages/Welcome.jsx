// Import dependencies
import React from "react";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "../axios";
import useAuth from "../hooks/useAuth";

export default function Welcome() {
  const history = useHistory();
  const [, setAuth] = useAuth();

  const [showLoginForm, setShowLoginForm] = useState(true);
  const [message, setMessage] = useState({ text: "", type: "" });

  async function login(e) {
    e.preventDefault();

    const email = document.querySelector("#email-input").value;
    const password = document.querySelector("#password-input").value;

    const response = await axios.post("/login", { email, password });

    answerResponse(response);
  }

  async function register(e) {
    e.preventDefault();

    const name = document.querySelector("#name-input").value;
    const email = document.querySelector("#email-input").value;
    const password = document.querySelector("#password-input").value;

    const response = await axios.post("/register", { name, email, password });

    answerResponse(response);
  }

  function answerResponse(response) {
    if (!response.data.data) {
      const { message } = response.data;

      setMessage({ text: message, type: "error" });
    } else {
      const { message, data: user } = response.data;

      setMessage({ text: message, type: "success" });

      setAuth({ state: true, user });

      localStorage.setItem("user", JSON.stringify(user));

      window.location.reload();
    }
  }

  return (
    <div className="welcome-page">
      {message.text !== "" ? (
        <div>
          <span
            style={{
              color: message.type == "error" ? "#b00020" : "green",
            }}
          >
            {message.text}
          </span>
        </div>
      ) : null}

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
