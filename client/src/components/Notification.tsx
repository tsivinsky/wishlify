import React, { PropsWithChildren } from "react";
import { useMessage } from "../store";

export const Notification: React.FC = (props: PropsWithChildren<{}>) => {
  const { message, removeMessage } = useMessage();

  return (
    <>
      {message.text !== "" && (
        <div className="notification">
          <h2>{message.text}</h2>
        </div>
      )}
      {props.children}
    </>
  );
};
