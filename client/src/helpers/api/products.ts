import { createAxiosInstance } from "../axios";
import { IWishlist, Response } from "../../types";

export async function addProductToWishlist(
  token: string,
  displayName: string,
  data: { url: string }
): Promise<IWishlist> {
  const axios = createAxiosInstance({}, token);

  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios.post<Response<{ wishlist: IWishlist }>>(
        `/wishlists/${displayName}/products`,
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

export async function removeProductFromWishlist(
  token: string,
  wishlistName: string,
  productID: string
): Promise<IWishlist> {
  const axios = createAxiosInstance({}, token);

  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios.delete<Response<{ wishlist: IWishlist }>>(
        `/wishlists/${wishlistName}/products/${productID}`
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
