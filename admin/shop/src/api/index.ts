import axios from "axios";
export const BASE_URL = "https://doan-totnghiep-ten.vercel.app";
export const TOKEN = JSON.parse(localStorage.getItem("token") as string);

export const baseApi = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
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
