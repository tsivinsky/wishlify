import axios from "../axios";

export default async function getWishlistsByUser(userID = "") {
  const response = await axios.get(`/users/${userID}/wishlists`);

  return response.data;
}
