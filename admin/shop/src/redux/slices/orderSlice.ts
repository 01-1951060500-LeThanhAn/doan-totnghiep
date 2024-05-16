import { createOrder, deleteOrder, updateOrder } from "@/api/orderApi";
import { CreateOrders, UpdateOrders } from "@/types/orders";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

type OrderState = {
  orders: CreateOrders[];
  loading: boolean;
  isEdit: boolean;
  error: boolean;
};

const initialState: OrderState = {
  orders: [],
  loading: false,
  isEdit: false,
  error: false,
};

export const createOrderAsync = createAsyncThunk(
  "orders/createOrderAsync",
  async (orders: CreateOrders) => {
    const response = await createOrder(orders);
    return response.data;
  }
);

export const updateOrderAsync = createAsyncThunk(
  "orders/updateOrderAsync",
  async (updateData: {
    orderId: string;
    data:
      | {
          payment_status?: string;
          order_status?: string;
        }
      | UpdateOrders;
  }) => {
    try {
      const response = await updateOrder(
        updateData.orderId as string,
        updateData.data
      );
      return response.data;
    } catch (error) {
      console.error("Error updating product:", error);
      throw error;
    }
  }
);

export const deleteOrderAsync = createAsyncThunk(
  "orders/deleteOrderAsync",
  async (orderId: string) => {
    const response = await deleteOrder(orderId);
    return response.data;
  }
);

export const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createOrderAsync.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(createOrderAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = [...state.orders, action.payload];
      })
      .addCase(createOrderAsync.rejected, (state) => {
        state.loading = false;
        state.error = true;
      })
      .addCase(updateOrderAsync.pending, (state) => {
        state.isEdit = true;
        state.error = false;
      })
      .addCase(
        updateOrderAsync.fulfilled,
        (state, action: PayloadAction<UpdateOrders>) => {
          const index = state.orders.findIndex(
            (item) => item._id === action.payload._id
          );
          state.orders[index] = action.payload;
          state.isEdit = false;
        }
      )
      .addCase(updateOrderAsync.rejected, (state) => {
        state.isEdit = true;
        state.error = true;
      })
      .addCase(deleteOrderAsync.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(
        deleteOrderAsync.fulfilled,
        (state, action: PayloadAction<string>) => {
          const index = state.orders.findIndex(
            (item) => item._id === action.payload
          );
          state.orders.splice(index, 1);
          state.loading = false;
          state.error = false;
        }
      )
      .addCase(deleteOrderAsync.rejected, (state) => {
        state.error = true;
      });
  },
});

export default orderSlice.reducer;
