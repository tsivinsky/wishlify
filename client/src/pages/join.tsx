import { useForm } from "react-hook-form";
import { api } from "../helpers";
import { useAuth, useMessage } from "../store";

interface Inputs {
  name: string;
  username: string;
  email: string;
  password: string;
}

export default function Join({ router }: PageProps) {
  const { register, handleSubmit } = useForm<Inputs>();
  const { setAuth } = useAuth();
  const { setMessage } = useMessage();

  async function join(data: Inputs) {
    try {
      const { token, user } = await api.auth.register(data);

      setAuth(token, user);

      router.push("/home");
    } catch (error) {
      setMessage({ text: error as string });
    }
  }

  return (
    <div className="join-page">
      <h1>Join</h1>

      <form onSubmit={handleSubmit(join)}>
        <div className="name">
          <label htmlFor="name">Your name</label>
          <input type="text" name="name" id="name" ref={register} />
        </div>
        <div className="username">
          <label htmlFor="username">Your username</label>
          <input type="text" name="username" id="username" ref={register} />
        </div>
        <div className="email">
          <label htmlFor="name">Your email</label>
          <input type="email" name="email" id="email" ref={register} />
        </div>
        <div className="password">
          <label htmlFor="name">Create password</label>
          <input type="password" name="password" id="password" ref={register} />
        </div>
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}
