import { useEffect, useState } from "react";
import { useAuth, useLoading, useMessage } from "../store";
import { isUserAuthorized, api } from "../helpers";
import {
  JoinForm,
  JoinFormInputs,
  LoginForm,
  LoginFormInputs,
} from "../components";
import { PageProps } from "../types";

export default function Index({ router }: PageProps) {
  const { auth, setAuth } = useAuth();
  const { loading, stopLoading } = useLoading();
  const { setMessage } = useMessage();

  const [hasAccount, setHasAccount] = useState<boolean>(false);

  // Redirect to /home if user is authorized
  useEffect(() => {
    if (isUserAuthorized(auth)) {
      router.push("/home");
    }
  }, [auth]);

  useEffect(() => {
    if (loading) {
      stopLoading();
    }
  }, [auth]);

  function join(data: JoinFormInputs) {
    api.auth
      .register(data)
      .then(({ token, user }) => {
        setAuth(token, user);

        router.push("/home");
      })
      .catch((err) => setMessage({ text: err }));
  }

  function login(data: LoginFormInputs) {
    api.auth
      .login(data)
      .then(({ token, user }) => {
        setAuth(token, user);

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
