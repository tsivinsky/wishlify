import { createAxiosInstance } from "../axiosInstance";

export async function getAuthorizedUserWishlists(
  token: string
): Promise<Array<IWishlist>> {
  const axios = createAxiosInstance({}, token);

  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios.get("/wishlists");

      resolve(response.data);
    } catch (err) {
      if (err.response) {
        reject(err.response.data);
      }

      reject(err as string);
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
      const response = await axios.post("/wishlists", data);

      resolve(response.data);
    } catch (err) {
      if (err.response) {
        reject(err.response.data);
      }

      reject(err as string);
    }
  });
}

export async function deleteWishlist(
  token: string,
  displayName: string
): Promise<IWishlist> {
  const axios = createAxiosInstance({}, token);

  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios.delete(`/wishlists/${displayName}`);

      resolve(response.data);
    } catch (err) {
      if (err.response) {
        reject(err.response.data);
      }

      reject(err as string);
    }
  });
}
