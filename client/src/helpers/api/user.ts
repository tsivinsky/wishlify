import { createAxiosInstance } from "../axios";
import { IUser, Response } from "../../types";

export async function getAuthorizedUser(token: string): Promise<IUser> {
  const axios = createAxiosInstance({}, token);

  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios.get<Response<{ user: IUser }>>("/user");

      resolve(response.data.data.user);
    } catch (err) {
      reject(err);
    }
  });
}
