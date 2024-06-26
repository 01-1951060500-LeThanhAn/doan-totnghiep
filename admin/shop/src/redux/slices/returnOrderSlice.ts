import {
  createReturnOrder,
  deleteReturnOrder,
  updateReturnOrder,
} from "@/api/returnOrderApi";
import {
  CreateReturnOrderData,
  UpdateReturnOrderData,
} from "@/types/return_order";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

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

export const deleteReturnOrderAsync = createAsyncThunk(
  "return-orders/deleteReturnOrderAsync",
  async (orderId: string) => {
    const response = await deleteReturnOrder(orderId);
    return response.data;
  }
);

export const updateReturnOrderAsync = createAsyncThunk(
  "return-orders/updateReturnOrderAsync",
  async (updateData: {
    orderId: string | undefined;
    data:
      | {
          refund_status?: string;
        }
      | UpdateReturnOrderData;
  }) => {
    try {
      const response = await updateReturnOrder(
        updateData.orderId as string,
        updateData.data
      );
      return response.data;
    } catch (error) {
      console.error("Error updating return orders:", error);
      throw error;
    }
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
      })
      .addCase(deleteReturnOrderAsync.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(
        deleteReturnOrderAsync.fulfilled,
        (state, action: PayloadAction<string>) => {
          const index = state.returnOrders.findIndex(
            (item) => item._id === action.payload
          );
          state.returnOrders.splice(index, 1);
          state.loading = false;
          state.error = false;
        }
      )
      .addCase(deleteReturnOrderAsync.rejected, (state) => {
        state.error = true;
      })
      .addCase(updateReturnOrderAsync.pending, (state) => {
        state.isEdit = true;
        state.error = false;
      })
      .addCase(
        updateReturnOrderAsync.fulfilled,
        (state, action: PayloadAction<UpdateReturnOrderData>) => {
          const index = state.returnOrders.findIndex(
            (item) => item._id === action.payload._id
          );
          state.returnOrders[index] = action.payload;
          state.isEdit = false;
        }
      )
      .addCase(updateReturnOrderAsync.rejected, (state) => {
        state.isEdit = true;
        state.error = true;
      });
  },
});
export default returnOrderSlice.reducer;
