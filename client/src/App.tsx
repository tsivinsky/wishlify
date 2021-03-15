import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { Welcome, Home, Account, Login } from "./pages";
import { Loader, Header, Notification, AuthProxy } from "./components";
import { useAuth, useLoading } from "./store";

export default function App() {
  const { auth } = useAuth();
  const { loading } = useLoading();

  const isUserAuthorized = Boolean(auth.user !== null && auth.token !== null);
  console.log(loading);

  return (
    <Router>
      <AuthProxy>
        <Loader>
          <Notification>
            <Header />
            <Switch>
              <Route path="/" exact>
                {isUserAuthorized ? <Redirect to="/home" /> : <Welcome />}
              </Route>
              <Route path="/home">
                {isUserAuthorized ? <Home /> : <Redirect to="/" />}
              </Route>
              <Route path="/account">
                {isUserAuthorized ? <Account /> : <Redirect to="/" />}
              </Route>
              <Route path="/login">
                {isUserAuthorized ? <Redirect to="/home" /> : <Login />}
              </Route>
            </Switch>
          </Notification>
        </Loader>
      </AuthProxy>
    </Router>
  );
}
