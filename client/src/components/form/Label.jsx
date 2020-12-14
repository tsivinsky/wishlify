import React from "react";

export default function Label({ element = "", text = "" }) {
  return <label htmlFor={element}>{text}</label>;
}
