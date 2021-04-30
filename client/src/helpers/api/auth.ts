import { axios } from "../axiosInstance";

interface SigninResponse {
  message: string;
}

export async function signin(data: { email: string }): Promise<SigninResponse> {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios.post("/auth/signin", data);

      resolve(response.data);
    } catch (err) {
      if (err.response) {
        reject(err.response.data);
      }

      reject(err.message);
    }
  });
}
