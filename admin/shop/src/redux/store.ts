import { configureStore, combineReducers } from "@reduxjs/toolkit";
import productSlice from "./slices/productSlice";
import authSlice from "./slices/authSlice";
import { userSlice } from "./slices/userSlice";

const rootRSlice = combineReducers({
  auth: authSlice,
  products: productSlice,
  users: userSlice,
});

export const store = configureStore({
  reducer: rootRSlice,
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
