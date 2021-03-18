import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useAuth, useLoading, useMessage, useWishlists } from "../store";
import { isUserAuthorized, api } from "../helpers";
import { Wishlist } from "../components";

interface Inputs {
  name: string;
  description: string;
}

export default function Home({ router }: PageProps) {
  const { auth } = useAuth();
  const { loading } = useLoading();
  const { wishlists, setWishlists } = useWishlists();
  const { setMessage } = useMessage();

  const { register, handleSubmit, reset } = useForm<Inputs>();

  useEffect(() => {
    if (!isUserAuthorized(auth) && !loading) {
      router.push("/");
    }
  }, [auth]);

  useEffect(() => {
    if (auth.token) {
      api.wishlists
        .getAuthorizedUserWishlists(auth.token)
        .then((wishlists) => setWishlists(wishlists as Array<IWishlist>))
        .catch((err) => setMessage({ text: err }))
        .then(() => reset());
    }
  }, [auth.token]);

  async function createWishlist(data: Inputs) {
    api.wishlists
      .createNewWishlist(auth.token as string, {
        ...data,
        owner: auth.user!._id,
      })
      .then((wishlist) => setWishlists([...wishlists, wishlist as IWishlist]))
      .catch((err) => setMessage({ text: err }));
  }

  async function deleteWishlist(displayName: string) {
    api.wishlists
      .deleteWishlist(auth.token as string, displayName)
      .then((wishlist) =>
        setWishlists(wishlists.filter((w) => w._id !== wishlist._id))
      )
      .catch((err) => setMessage({ text: err }));
  }

  if (auth.user) {
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
          {wishlists.length > 0 ? (
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

  return null;
}