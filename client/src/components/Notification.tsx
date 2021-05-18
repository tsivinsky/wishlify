import React from "react";
import { useMessage } from "../store";

export const Notification: React.FC = () => {
  const { message } = useMessage();

  if (message) {
    return (
      <div className={`notification ${message.type}`}>
        <p>{message.text}</p>
      </div>
    );
  }

  return null;
};
