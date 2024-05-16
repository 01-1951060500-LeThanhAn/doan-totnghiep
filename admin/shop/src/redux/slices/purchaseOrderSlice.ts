import {
  createPurchaseOrder,
  deletePurchaseOrder,
  updatePurchaseOrder,
} from "@/api/purchaseOrderApi";
import {
  CreatePurchaseOrderData,
  UpdatePurchaseOrderData,
} from "@/types/purchaseOrder";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
type PurchaseOrderState = {
  purchaseOrders: CreatePurchaseOrderData[];
  loading: boolean;
  isEdit: boolean;
  error: boolean;
};

const initialState: PurchaseOrderState = {
  purchaseOrders: [],
  loading: false,
  isEdit: false,
  error: false,
};

export const createPurchaseOrderAsync = createAsyncThunk(
  "purchaseOrders/createPurchaseOrderAsync",
  async (orders: CreatePurchaseOrderData) => {
    const response = await createPurchaseOrder(orders);
    return response.data;
  }
);

export const updatePurchaseOrderAsync = createAsyncThunk(
  "purchaseOrders/updatePurchaseOrderAsync",
  async (purchaseOrderId: string) => {
    try {
      const response = await updatePurchaseOrder(purchaseOrderId as string);
      return response.data;
    } catch (error) {
      console.error("Error updating GRN:", error);
      throw error;
    }
  }
);

export const deletePurchaseOrderAsync = createAsyncThunk(
  "purchaseOrders/deletePurchaseOrderAsync",
  async (purchaseOrderId: string) => {
    const response = await deletePurchaseOrder(purchaseOrderId);
    return response.data;
  }
);

export const purchaseOrderSlice = createSlice({
  name: "purchaseOrders",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createPurchaseOrderAsync.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(
        createPurchaseOrderAsync.fulfilled,
        (state, action: PayloadAction<CreatePurchaseOrderData>) => {
          if (action.payload) {
            state.loading = false;
            state.purchaseOrders = [...state.purchaseOrders, action.payload];
            state.error = false;
          }
        }
      )
      .addCase(createPurchaseOrderAsync.rejected, (state) => {
        state.loading = false;
        state.error = true;
      })
      .addCase(updatePurchaseOrderAsync.pending, (state) => {
        state.isEdit = true;
        state.error = false;
      })
      .addCase(
        updatePurchaseOrderAsync.fulfilled,
        (state, action: PayloadAction<UpdatePurchaseOrderData>) => {
          const index = state.purchaseOrders.findIndex(
            (item) => item._id === action.payload._id
          );
          state.purchaseOrders[index] = action.payload;
          state.isEdit = false;
        }
      )
      .addCase(updatePurchaseOrderAsync.rejected, (state) => {
        state.isEdit = false;
        state.error = true;
      })
      .addCase(deletePurchaseOrderAsync.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(
        deletePurchaseOrderAsync.fulfilled,
        (state, action: PayloadAction<string>) => {
          const index = state.purchaseOrders.findIndex(
            (item) => item._id === action.payload
          );
          state.purchaseOrders.splice(index, 1);
          state.loading = false;
          state.error = false;
        }
      )
      .addCase(deletePurchaseOrderAsync.rejected, (state) => {
        state.error = true;
      });
  },
});

export default purchaseOrderSlice.reducer;
