import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { api } from "./helpers";
import { Welcome, Home, Account } from "./pages";
import { useAuth, useMessage, useLoading } from "./store";
import { Loader, Header } from "./components";

export default function App() {
  const { auth, setAuth } = useAuth();
  const { setMessage } = useMessage();
  const { stopLoading } = useLoading();

  const token = localStorage.getItem("token");
  const isUserAuthenticated = Boolean(
    auth.token !== null && auth.user !== null
  );

  useEffect(() => {
    if (token) {
      api.user
        .getAuthorizedUser(token)
        .then((data) => {
          setAuth(token, data);
          stopLoading();
        })
        .catch((err) => {
          setMessage({ text: err });
          stopLoading();
        });
    }
  }, []);

  return (
    <Loader>
      <Router>
        <Header />
        <Switch>
          <Route path="/" exact>
            {isUserAuthenticated ? <Redirect to="/home" /> : <Welcome />}
          </Route>
          <Route path="/home">
            {isUserAuthenticated ? <Home /> : <Redirect to="/" />}
          </Route>
          <Route path="/account">
            {isUserAuthenticated ? <Account /> : <Redirect to="/" />}
          </Route>
        </Switch>
      </Router>
    </Loader>
  );
}
