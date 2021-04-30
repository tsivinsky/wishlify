import { createAxiosInstance } from "../axios";
import { IWishlist, Response } from "../../types";

export async function getAuthorizedUserWishlists(
  token: string
): Promise<Array<IWishlist>> {
  const axios = createAxiosInstance({}, token);

  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios.get<
        Response<{ wishlists: Array<IWishlist> }>
      >("/user/wishlists");

      resolve(response.data.data.wishlists);
    } catch (err) {
      if (err.response) {
        reject(err.response.data);
      }

      reject(err.message);
    }
  });
}

export interface CreateNewWishlistProps {
  name: string;
  description: string;
  owner: string;
}

export async function createNewWishlist(
  token: string,
  data: CreateNewWishlistProps
): Promise<IWishlist> {
  const axios = createAxiosInstance({}, token);

  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios.post<Response<{ wishlist: IWishlist }>>(
        "/user/wishlists",
        data
      );

      resolve(response.data.data.wishlist);
    } catch (err) {
      if (err.response) {
        reject(err.response.data);
      }

      reject(err.message);
    }
  });
}

export async function getWishlistByDisplayName(
  token: string,
  displayName: string
): Promise<IWishlist> {
  const axios = createAxiosInstance({}, token);

  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios.get<Response<{ wishlist: IWishlist }>>(
        `/wishlists/${displayName}`
      );

      resolve(response.data.data.wishlist);
    } catch (err) {
      if (err.response) {
        reject(err.response.data);
      }

      reject(err.message);
    }
  });
}

// TODO: Create helper function for updating wishlist

export async function deleteWishlist(
  token: string,
  displayName: string
): Promise<IWishlist> {
  const axios = createAxiosInstance({}, token);

  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios.delete<Response<{ wishlist: IWishlist }>>(
        `/wishlists/${displayName}`
      );

      resolve(response.data.data.wishlist);
    } catch (err) {
      if (err.response) {
        reject(err.response.data);
      }

      reject(err.message);
    }
  });
}
