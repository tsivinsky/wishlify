import Axios, { AxiosInstance, AxiosRequestConfig } from "axios";

export const axios = Axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

export function createAxiosInstance(
  config: AxiosRequestConfig,
  token?: string
): AxiosInstance {
  if (token) {
    config = {
      ...config,
      baseURL: process.env.NEXT_PUBLIC_API_URL,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
  }

  const axios = Axios.create(config);

  return axios;
}
