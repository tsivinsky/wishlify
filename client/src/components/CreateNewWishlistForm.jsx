import React, { useState } from "react";

export default function CreateNewWishlistForm({ onCreate }) {
  const [wishlistName, setWishlistName] = useState("");
  const [wishlistDescription, setWishlistDescription] = useState("");

  return (
    <form id="create-new-wishlist-form">
      <input
        type="text"
        className="wishlist-name-input"
        placeholder="Wishlist name"
        onChange={(e) => setWishlistName(e.target.value)}
      />
      <input
        type="text"
        className="wishlist-description-input"
        placeholder="Wishlist description (optional)"
        onChange={(e) => setWishlistDescription(e.target.value)}
      />
      <button
        type="submit"
        onClick={(e) => {
          e.preventDefault();
          onCreate({ name: wishlistName, description: wishlistDescription });
        }}
      >
        Create
      </button>
    </form>
  );
}
