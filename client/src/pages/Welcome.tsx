import React, { FormEvent, useState } from "react";
import { useHistory } from "react-router-dom";
import { api } from "../helpers";
import { useAuth, useMessage } from "../store";

export const Welcome: React.FC = () => {
  const history = useHistory();

  const { setMessage } = useMessage();
  const { setAuth } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function login(e: FormEvent) {
    e.preventDefault();

    const data = {
      email,
      password,
    };

    try {
      const { user, token } = await api.auth.login(data);

      // Save token in localStorage
      localStorage.setItem("token", token);

      // Save user's data and token in global state
      setAuth(token, user);

      // Redirect to /home
      history.push("/home");
    } catch (err) {
      setMessage({ text: err });
    }
  }

  return (
    <div className="welcome-page">
      <form id="login-form">
        <input
          type="email"
          placeholder="Your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" onClick={login}>
          Sign In
        </button>
      </form>
    </div>
  );
};
