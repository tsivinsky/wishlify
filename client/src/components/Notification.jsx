// Import dependencies
import React from "react";
import { collect } from "react-recollect";
import { clearMessage } from "../helpers/messages";

function Notification({ store }) {
  // Remove notification after 7 seconds
  setTimeout(clearMessage, 7000);

  if (store.message) {
    return (
      <div className="notification">
        <h3>{store.message.text}</h3>
      </div>
    );
  }

  return null;
}

export default collect(Notification);
