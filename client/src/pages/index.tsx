import { useEffect, useState } from "react";
import { useLoading, useMessage, useSession } from "../store";
import { api } from "../helpers";
import {
  JoinForm,
  JoinFormInputs,
  LoginForm,
  LoginFormInputs,
} from "../components";
import { PageProps } from "../types";

export default function Index({ router }: PageProps) {
  const { user, setSession } = useSession();
  const { loading, stopLoading } = useLoading();
  const { setMessage } = useMessage();

  const [hasAccount, setHasAccount] = useState<boolean>(false);

  // Redirect to /home if user is authenticated
  useEffect(() => {
    if (user) {
      router.push("/home");
    }
  }, [user]);

  useEffect(() => {
    if (loading) {
      stopLoading();
    }
  }, [user]);

  function join(data: JoinFormInputs) {
    api.auth
      .register(data)
      .then(({ token, user }) => {
        setSession(token, user);

        router.push("/home");
      })
      .catch((err) => setMessage({ text: err }));
  }

  function login(data: LoginFormInputs) {
    api.auth
      .login(data)
      .then(({ token, user }) => {
        setSession(token, user);

        router.push("/home");
      })
      .catch((err) => setMessage({ text: err }));
  }

  function toggleHasAccountState() {
    setHasAccount((prev) => !prev);
  }

  return (
    <div id="page" className="welcome-page">
      <div className="left-side">
        <h1>Wishlify</h1>
      </div>

      <div className="right-side">
        {hasAccount ? (
          <JoinForm onSubmit={join} />
        ) : (
          <LoginForm onSubmit={login} />
        )}
        <button onClick={toggleHasAccountState}>
          {hasAccount ? "Do not have account?" : "Already have account?"}
        </button>
      </div>
    </div>
  );
}
