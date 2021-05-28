import Link from "next/link";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { api } from "../../helpers";

interface Inputs {
  email: string;
}

export default function Signin() {
  const { handleSubmit, register } = useForm<Inputs>();

  async function signinByEmail(data: Inputs) {
    api.auth
      .signin(data)
      .then(() =>
        toast.success("We've sent you an email with confirmation link")
      )
      .catch((err) => toast.error(err.message));
  }

  return (
    <div id="page" className="signin-page">
      <h1>Wishlify</h1>

      <form id="signin-email-form" onSubmit={handleSubmit(signinByEmail)}>
        <div className="form-group">
          <label htmlFor="email-input">Email</label>
          <input
            type="email"
            name="email"
            id="email-input"
            ref={register}
            placeholder="you@gmail.com"
          />
        </div>
        <button type="submit" className="btn btn-primary font-lg">
          Sign In
        </button>
      </form>

      <Link href="/">
        <a>Back to Home</a>
      </Link>
    </div>
  );
}
