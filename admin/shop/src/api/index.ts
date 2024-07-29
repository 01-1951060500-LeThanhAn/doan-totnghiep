import axios from "axios";
export const BASE_URL = "";
export const TOKEN = JSON.parse(localStorage.getItem("token") as string);

export const baseApi = axios.create({
  baseURL: BASE_URL,
});

export const adminApi = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${TOKEN}`,
  },
});

if (TOKEN) {
  baseApi.defaults.headers.common.Authorization = `Bearer ${TOKEN}`;
}

adminApi.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    return Promise.reject(error);
  }
);
