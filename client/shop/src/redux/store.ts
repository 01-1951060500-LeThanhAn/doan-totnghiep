import { configureStore, combineReducers } from "@reduxjs/toolkit";
import authSlice from "./slices/authSlice";

const rootRSlice = combineReducers({
  auth: authSlice,
});

export const store = configureStore({
  reducer: rootRSlice,
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
