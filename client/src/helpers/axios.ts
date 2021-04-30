import Axios, { AxiosInstance, AxiosRequestConfig } from "axios";

export const axios = Axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

export function createAxiosInstance(
  config: AxiosRequestConfig,
  token?: string
): AxiosInstance {
  // Add Authorization header if token provided
  if (token) {
    Object.assign(config, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  // Add baseURL property to config
  Object.assign(config, { baseURL: process.env.NEXT_PUBLIC_API_URL });

  const axios = Axios.create(config);

  return axios;
}
