import React from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router";
import { api } from "../helpers";
import { useAuth, useMessage } from "../store";

interface Inputs {
  email: string;
  password: string;
}

export const Login: React.FC<PageProps> = () => {
  const history = useHistory();
  const { register, handleSubmit } = useForm<Inputs>();

  const { setMessage } = useMessage();
  const { setAuth } = useAuth();

  async function login(formData: Inputs) {
    const { email, password } = formData;

    try {
      const { user, token } = await api.auth.login({ email, password });

      // Save user's data and token
      setAuth(token, user);

      // Redirect to /home
      history.push("/home");
    } catch (err) {
      setMessage({ text: err });
    }
  }

  return (
    <div className="login-page">
      <h1>Sign In</h1>

      <form id="login-form" onSubmit={handleSubmit(login)}>
        <input
          name="email"
          type="email"
          placeholder="Your email"
          ref={register}
        />
        <input
          name="password"
          type="password"
          placeholder="Your password"
          ref={register}
        />
        <button type="submit">Sign In</button>
      </form>
    </div>
  );
};
