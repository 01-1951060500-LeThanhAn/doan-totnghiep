import { createReturnOrder } from "@/api/returnOrderApi";
import { CreateReturnOrderData } from "@/types/return_order";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

type ReturnOrderState = {
  returnOrders: CreateReturnOrderData[];
  loading: boolean;
  isEdit: boolean;
  error: boolean;
};

const initialState: ReturnOrderState = {
  returnOrders: [],
  loading: false,
  isEdit: false,
  error: false,
};

export const createReturnOrderAsync = createAsyncThunk(
  "return-orders/createReturnOrderAsync",
  async (orders: CreateReturnOrderData) => {
    const response = await createReturnOrder(orders);
    return response.data;
  }
);

export const returnOrderSlice = createSlice({
  name: "return-orders",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createReturnOrderAsync.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(createReturnOrderAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.returnOrders = [...state.returnOrders, action.payload];
      })
      .addCase(createReturnOrderAsync.rejected, (state) => {
        state.loading = false;
        state.error = true;
      });
  },
});
export default returnOrderSlice.reducer;
