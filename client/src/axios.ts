import Axios, { AxiosInstance, AxiosRequestConfig } from "axios";

export const axios = Axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

export function createAxiosInstance(
  config: AxiosRequestConfig,
  token?: string
): AxiosInstance {
  const axios = Axios.create({
    ...config,
    baseURL: process.env.REACT_APP_API_URL,
  });

  if (token) {
    axios.defaults.headers["Authorization"] = `Bearer ${token}`;
  }

  return axios;
}
