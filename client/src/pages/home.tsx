import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useMessage, useSession, useWishlists } from "../store";
import { api } from "../helpers";
import { Wishlist } from "../components";
import { IWishlist, PageProps } from "../types";

interface Inputs {
  name: string;
  description: string;
}

export default function Home({}: PageProps) {
  const { token, user } = useSession();
  const { wishlists, setWishlists } = useWishlists();
  const { setMessage } = useMessage();

  const { register, handleSubmit } = useForm<Inputs>();

  useEffect(() => {
    api.wishlists
      .getAuthorizedUserWishlists(token as string)
      .then((wishlists) => setWishlists(wishlists as Array<IWishlist>))
      .catch((err) => setMessage({ text: err }));
  }, []);

  async function createWishlist(data: Inputs) {
    api.wishlists
      .createNewWishlist(token as string, {
        ...data,
        owner: user!._id,
      })
      .then((wishlist) => setWishlists([...wishlists, wishlist as IWishlist]))
      .catch((err) => setMessage({ text: err }));
  }

  async function deleteWishlist(displayName: string) {
    api.wishlists
      .deleteWishlist(token as string, displayName)
      .then((wishlist) =>
        setWishlists(wishlists.filter((w) => w._id !== wishlist._id))
      )
      .catch((err) => setMessage({ text: err }));
  }

  return (
    <div className="home-page">
      <h1>Home page</h1>

      <form id="create-wishlist-form" onSubmit={handleSubmit(createWishlist)}>
        <h3>Create new wishlist</h3>
        <div className="name">
          <label htmlFor="name">Name</label>
          <input type="text" name="name" id="name" required ref={register} />
        </div>
        <div className="description">
          <label htmlFor="description">Description</label>
          <input
            type="text"
            name="description"
            id="description"
            ref={register}
          />
        </div>
        <button type="submit">Create</button>
      </form>

      <div className="wishlists">
        {user && wishlists.length > 0 ? (
          wishlists.map((wishlist, i) => (
            <Wishlist key={i} {...wishlist} onDelete={deleteWishlist} />
          ))
        ) : (
          <span>You have no wishlists.</span>
        )}
      </div>
    </div>
  );
}
