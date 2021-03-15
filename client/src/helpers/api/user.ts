import { createAxiosInstance } from "../axiosInstance";

export async function getAuthorizedUser(token: string): Promise<IUser> {
  const axios = createAxiosInstance({}, token);

  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios.get("/user");

      resolve(response.data);
    } catch (err) {
      if (err.response) {
        reject(err.response.data);
      }

      reject(err.message);
    }
  });
}
