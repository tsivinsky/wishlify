import React from "react";
import { useMessage } from "../store";

export const Notification: React.FC = () => {
  const { message } = useMessage();

  if (message.text !== "") {
    return (
      <div className="notification">
        <h2>{message.text}</h2>
      </div>
    );
  }

  return null;
};
