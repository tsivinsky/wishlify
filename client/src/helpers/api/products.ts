import { createAxiosInstance } from "../axiosInstance";
import { IWishlist } from "../../types";

export async function addProductToWishlist(
  token: string,
  displayName: string,
  data: { url: string }
): Promise<IWishlist> {
  const axios = createAxiosInstance({}, token);

  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios.post(
        `/wishlists/${displayName}/products`,
        data
      );

      resolve(response.data);
    } catch (err) {
      if (err.response) {
        reject(err.response.data);
      }

      reject(err);
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
      const response = await axios.delete(
        `/wishlists/${wishlistName}/products/${productID}`
      );

      resolve(response.data);
    } catch (err) {
      if (err.response) {
        reject(err.response.data);
      }

      reject(err as string);
    }
  });
}
