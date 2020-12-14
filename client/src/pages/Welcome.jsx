// Import dependencies
import React from "react";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { collect } from "react-recollect";
import axios from "../axios";
import { showError, clearMessage } from "../helpers/messages";

// Import components
import Form from "../components/form/Form";
import FormGroup from "../components/form/FormGroup";
import Label from "../components/form/Label";
import Input from "../components/form/Input";

function Welcome({ store }) {
  const history = useHistory();
  const [showLoginForm, setShowLoginForm] = useState(true);

  // Function for handling login form
  async function login(e) {
    e.preventDefault();

    const email = document.querySelector("#email-input").value;
    const password = document.querySelector("#password-input").value;

    try {
      const response = await axios.post("/login", { email, password });

      saveUser(response.data);

      clearMessage();
      history.push("/home");
    } catch (err) {
      if (err.response) {
        showError(err.response.data);
      }
    }
  }

  // Function for handling register form
  async function register(e) {
    e.preventDefault();

    const name = document.querySelector("#name-input").value;
    const email = document.querySelector("#email-input").value;
    const password = document.querySelector("#password-input").value;

    try {
      const response = await axios.post("/register", { name, email, password });

      saveUser(response.data);

      clearMessage();
      history.push("/home");
    } catch (err) {
      if (err.response) {
        showError(err.response.data);
      }
    }
  }

  // Function for saving user's data
  function saveUser(data) {
    // Save user id in localStorage
    localStorage.setItem("user", data._id);

    store.auth = {
      state: true,
      user: data,
    };
  }

  return (
    <div className="welcome-page">
      {showLoginForm ? (
        <div className="inner-block">
          <Form id="login-form">
            <FormGroup>
              <Label element="email-input" text="Your email" />
              <Input type="email" id="email-input" />
            </FormGroup>
            <FormGroup>
              <Label element="password-input" text="Your password" />
              <Input type="password" id="password-input" />
            </FormGroup>
            <button type="submit" className="btn btn-primary" onClick={login}>
              Log In
            </button>
          </Form>
          <button
            className="btn btn-secondary"
            onClick={() => setShowLoginForm(false)}
          >
            Doesn`t have an account?
          </button>
        </div>
      ) : (
        <div className="inner-block">
          <Form id="register-form">
            <FormGroup>
              <Label element="name-input" text="Your name" />
              <Input type="text" id="name-input" />
            </FormGroup>
            <FormGroup>
              <Label element="email-input" text="Your email" />
              <Input type="email" id="email-input" />
            </FormGroup>
            <div className="form-group">
              <Label element="password-input" text="Create a password" />
              <Input type="password" id="password-input" />
            </div>
            <button
              type="submit"
              className="btn btn-primary"
              onClick={register}
            >
              Sign Up
            </button>
          </Form>
          <button
            className="btn btn-secondary"
            onClick={() => setShowLoginForm(true)}
          >
            Already have an account?
          </button>
        </div>
      )}
    </div>
  );
}

export default collect(Welcome);
