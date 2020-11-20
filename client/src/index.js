// Import dependencies
import React from "react";
import ReactDOM from "react-dom";
import * as serviceWorker from "./serviceWorker";

// Import App component
import App from "./App";

// Import styles
import "./style/style.scss";

// Render App component to the page
ReactDOM.render(<App />, document.getElementById("root"));

serviceWorker.unregister();
