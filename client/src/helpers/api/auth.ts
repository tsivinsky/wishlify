import { axios } from "../axiosInstance";

interface LoginProps {
  email: string;
  password: string;
}

interface Response {
  token: string;
  user: IUser;
}

export async function login(data: LoginProps): Promise<Response> {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios.post("/auth/login", data);

      resolve(response.data);
    } catch (err) {
      if (err.response) {
        reject(err.response.data);
      }

      reject(err.message);
    }
  });
}

interface RegisterProps {
  name: string;
  email: string;
  username: string;
  password: string;
}

export async function register(data: RegisterProps): Promise<Response> {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios.post("/auth/register", data);

      resolve(response.data);
    } catch (err) {
      if (err.response) {
        reject(err.response.data);
      }

      reject(err.message);
    }
  });
}
