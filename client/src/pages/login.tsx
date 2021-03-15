import { useForm } from "react-hook-form";
import { api } from "../helpers";
import { useAuth, useMessage } from "../store";

interface Inputs {
  email: string;
  password: string;
}

export default function Login({ router }: PageProps) {
  const { register, handleSubmit } = useForm<Inputs>();
  const { setAuth } = useAuth();
  const { setMessage } = useMessage();

  async function login(data: Inputs) {
    try {
      const { token, user } = await api.auth.login(data);

      setAuth(token, user);

      router.push("/home");
    } catch (error) {
      setMessage({ text: error as string });
    }
  }

  return (
    <div className="login-page">
      <h1>Login</h1>

      <form onSubmit={handleSubmit(login)}>
        <div className="email">
          <label htmlFor="email">Your email</label>
          <input type="email" name="email" id="email" ref={register} required />
        </div>
        <div className="password">
          <label htmlFor="password">Your password</label>
          <input
            type="password"
            name="password"
            id="password"
            ref={register}
            minLength={6}
            required
          />
        </div>
        <button type="submit">Sign In</button>
      </form>
    </div>
  );
}
