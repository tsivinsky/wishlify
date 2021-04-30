import { useForm } from "react-hook-form";
import { api } from "../../helpers";
import { useMessage } from "../../store";

interface Inputs {
  email: string;
}

export default function Signin() {
  const { handleSubmit, register } = useForm<Inputs>();
  const { setMessage } = useMessage();

  async function signinByEmail(data: Inputs) {
    api.auth
      .signin(data)
      .then((resp) =>
        setMessage({ text: "We've sent you an email with confirmation link" })
      )
      .catch((err) => setMessage({ text: err }));
  }

  return (
    <div id="page" className="signin-page">
      <h2>Sign In to Wishlify</h2>

      <form id="signin-email-form" onSubmit={handleSubmit(signinByEmail)}>
        <div>
          <label htmlFor="email-input">Email</label>
          <input type="email" name="email" id="email-input" ref={register} />
        </div>
        <button type="submit">Sign In</button>
      </form>
    </div>
  );
}
