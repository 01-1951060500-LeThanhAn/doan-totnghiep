import { baseApi } from "@/api";

const setAuthToken = (token: string | null) => {
  if (token) {
    baseApi.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete baseApi.defaults.headers.common["Authorization"];
  }
};

export default setAuthToken;
