// Import dependencies
import React from "react";
import { useHistory } from "react-router-dom";

export default function Wishlist({ id, name, description, onDelete }) {
  const history = useHistory();

  return (
    <div className="wishlist">
      <h2>{name}</h2>
      <p>{description}</p>
      <button onClick={() => onDelete(id)}>Delete</button>
      <button onClick={() => history.push(`/wishlist?id=${id}`)}>View</button>
    </div>
  );
}
