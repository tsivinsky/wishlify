import { axios } from "../axios";

export async function signin(data: { email: string }): Promise<void> {
  return new Promise(async (resolve, reject) => {
    try {
      await axios.post<Response>("/auth/signin", data);

      resolve();
    } catch (err) {
      if (err.response) {
        reject(err.response.data);
      }

      reject(err.message);
    }
  });
}
