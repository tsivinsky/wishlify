import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { api } from "../../helpers";
import { useSession } from "../../store";
import { Header, Product } from "../../components";
import { IWishlist, PageProps } from "../../types";

interface Inputs {
  url: string;
}

export default function Wishlist({ router }: PageProps) {
  const { username, displayName } = router.query;
  const { token } = useSession();
  const [wishlist, setWishlist] = useState<IWishlist>();
  const { register, handleSubmit } = useForm<Inputs>();

  useEffect(() => {
    if (username && displayName && token) {
      api.wishlists
        .getWishlistByDisplayName(token as string, displayName as string)
        .then((wishlist) => {
          if (wishlist.owner.username !== username) {
            router.push("/");
          }

          setWishlist(wishlist);
        })
        .catch((err) => toast.error(err.message));
    }
  }, [username, displayName, token]);

  function addProduct(data: Inputs) {
    api.products
      .addProductToWishlist(token as string, displayName as string, data)
      .then((wishlist) => setWishlist(wishlist))
      .catch((err) => toast.error(err.message));
  }

  function removeProduct(_id: string) {
    api.products
      .removeProductFromWishlist(token as string, displayName as string, _id)
      .then((wishlist) => setWishlist(wishlist))
      .catch((err) => toast.error(err.message));
  }

  if (wishlist) {
    return (
      <div id="page" className="wishlist-page">
        <Header router={router} />

        <section id="info">
          <div id="wishlist-info">
            <h2>{wishlist.name}</h2>
            <p>{wishlist.description || "No description"}</p>
          </div>

          <div id="add-product-form">
            <h3>Add new product</h3>

            <form onSubmit={handleSubmit(addProduct)}>
              <div className="form-group">
                <label htmlFor="url">Product url</label>
                <input type="url" name="url" id="url" ref={register} />
              </div>

              <button type="submit" className="btn btn-primary">
                Add
              </button>
            </form>
          </div>
        </section>

        <section id="products">
          <h3>Products</h3>

          <div>
            {wishlist.products.length > 0 ? (
              wishlist.products.map((product, i) => (
                <Product key={i} {...product} onRemove={removeProduct} />
              ))
            ) : (
              <p>No products. Add one.</p>
            )}
          </div>
        </section>
      </div>
    );
  }

  // TODO: Show loading screen
  return null;
}
