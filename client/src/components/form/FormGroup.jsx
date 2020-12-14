import React from "react";

export default function FormGroup(props) {
  return (
    <div className="form-group" {...props}>
      {props.children}
    </div>
  );
}
