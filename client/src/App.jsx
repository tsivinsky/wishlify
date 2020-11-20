// Import dependencies
import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import useAuth from "./hooks/useAuth";

// Import pages
import Welcome from "./pages/Welcome";
import Home from "./pages/Home";

export default function App() {
  const [auth] = useAuth();

  return (
    <Router>
      <Switch>
        <Route path="/" exact>
          {auth.state ? <Home /> : <Welcome />}
        </Route>
      </Switch>
    </Router>
  );
}
