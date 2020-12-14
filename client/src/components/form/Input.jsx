import React from "react";

export default function Input(props) {
  // Function for moving label up
  function moveLabel(e) {
    const label = e.target.labels[0];

    // Toggle .focused class on label if input is empty
    if (e.target.value === "") {
      label.classList.toggle("focused");
    }
  }

  return <input {...props} onFocus={moveLabel} onBlur={moveLabel} />;
}
