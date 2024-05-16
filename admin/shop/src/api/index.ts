import axios from "axios";
export const BASE_URL = "https://doan-totnghiep-ten.vercel.app";
export const TOKEN = JSON.parse(localStorage.getItem("token") as string);

export const baseApi = axios.create({
  baseURL: BASE_URL,
});

export const advancedApi = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
    token: `Bearer ${TOKEN}`,
  },
});

export const adminApi = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${TOKEN}`,
  },
});
