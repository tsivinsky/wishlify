// Import dependencies
import React, { useEffect } from "react";
import { collect } from "react-recollect";
import axios from "../axios";
import getWishlistsByUser from "../helpers/getWishlistsByUser";

// Import components
import Wishlist from "../components/Wishlist";
import CreateNewWishlistForm from "../components/CreateNewWishlistForm";

function Home({ store }) {
  const { auth } = store;

  useEffect(() => {
    (async () => {
      const wishlists = await getWishlistsByUser(auth.user._id);

      store.wishlists = wishlists;
    })();
  }, []);

  // Function for creating new wishlists
  async function createWishlist({ name = "", description = null }) {
    try {
      const response = await axios.post(`/wishlists`, {
        name,
        description,
        owner: auth.user._id,
      });

      store.wishlists.push(response.data);
    } catch (err) {
      if (err.response) {
        // TODO: setMessage(err.response.data);
      }
    }
  }

  // Function for deleting wishlists
  async function deleteWishlist(id = "") {
    if (!window.confirm("Are you sure?")) return;

    try {
      const response = await axios.delete(`/wishlists/${id}`);

      store.wishlists = store.wishlists.filter(
        (wishlist) => wishlist._id !== response.data._id
      );
    } catch (err) {
      if (err.response) {
        // TODO: setMessage(err.response.data)
      }
    }
  }

  return (
    <div className="home-page">
      <h1>Home page</h1>
      <CreateNewWishlistForm onCreate={createWishlist} />
      {store.wishlists &&
        store.wishlists.map((wishlist, i) => (
          <Wishlist
            key={i}
            id={wishlist._id}
            name={wishlist.name}
            description={wishlist.description}
            onDelete={deleteWishlist}
          />
        ))}
    </div>
  );
}

export default collect(Home);
