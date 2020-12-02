// Import dependencies
import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { collect, initStore } from "react-recollect";
import axios from "./axios";
import initialStore from "./initialStore";

// Import pages
import Welcome from "./pages/Welcome";
import Home from "./pages/Home";
import Wishlist from "./pages/Wishlist";

import Header from "./components/Header";

function App({ store }) {
  const { auth } = store;

  useEffect(() => {
    const userID = localStorage.getItem("user");
    if (userID) {
      (async () => {
        const response = await axios.get(`/users/${userID}`);

        initStore({
          ...initialStore,
          auth: {
            state: true,
            user: response.data,
          },
        });
      })();
    } else {
      initStore(initialStore);
    }
  }, []);

  return (
    <Router>
      {auth && (
        <>
          <Header />
          <Switch>
            <Route path="/" exact>
              {auth.state ? <Redirect to="/home" /> : <Welcome />}
            </Route>
            <Route path="/home">
              {auth.state ? <Home /> : <Redirect to="/" />}
            </Route>
            <Route path="/wishlist" component={Wishlist} />
          </Switch>
        </>
      )}
    </Router>
  );
}

export default collect(App);
