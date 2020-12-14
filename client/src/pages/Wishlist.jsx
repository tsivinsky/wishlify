// Import dependencies
import React, { useState, useEffect } from "react";
import { render } from "react-dom";
import { useHistory } from "react-router-dom";
import { collect } from "react-recollect";
import queryString from "query-string";
import axios from "../axios";
import { showError } from "../helpers/messages";

import NotFound from "./NotFound";
import Product from "../components/Product";

function Wishlist({ store }) {
  const history = useHistory();
  const params = queryString.parse(window.location.search);
  const [wishlist, setWishlist] = useState();

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get(`/wishlists/${params.id}`);

        // Check if user can read this wishlist
        if (response.data.owner !== store.auth.user._id) {
          showError("You can't view this page.");
          history.push("/");
        } else {
          setWishlist(response.data);
        }
      } catch (err) {
        if (err.response) {
          showError(err.response.data);
          render(<NotFound />, document.querySelector("#root"));
        }
      }
    })();
  }, []);

  useEffect(() => {
    if (wishlist === null) {
      showError("There is no such wishlist");
      history.push("/");
    }
  }, [wishlist]);

  if (wishlist) {
    return (
      <div className="wishlist-page">
        <h1>{wishlist.name}</h1>
        <p>{wishlist.description}</p>
        {wishlist.products &&
          wishlist.products.map((product, i) => (
            <Product
              key={i}
              id={product._id}
              title={product.title}
              price={product.price.amount}
              priceCurrency={product.price.currency}
              shipping={product.shipping.amount}
              shippingCurrency={product.shipping.currency}
              image={product.image}
              url={product.url}
              shop={product.shop}
            />
          ))}
      </div>
    );
  }

  return null;
}

export default collect(Wishlist);
