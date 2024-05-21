import {
  createStockAdjustment,
  updateStockAdjustment,
} from "@/api/stockAdjustmentApi";
import {
  CreateStockAdjustment,
  UpdateStockAdjustment,
} from "@/types/stock_adjustment";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

type StockAdjustmentState = {
  stockAdjustments: CreateStockAdjustment[];
  loading: boolean;
  isEdit: boolean;
  error: boolean;
};

const initialState: StockAdjustmentState = {
  stockAdjustments: [],
  loading: false,
  isEdit: false,
  error: false,
};

export const createStockAdjustmentAsync = createAsyncThunk(
  "stockAdjustment/createStockAdjustmentAsync",
  async (data: CreateStockAdjustment) => {
    const response = await createStockAdjustment(data);
    return response.data;
  }
);

export const updateStockAdjustmentAsync = createAsyncThunk(
  "stockAdjustment/updateStockAdjustmentAsync",
  async (updateData: {
    stockAdjustmentId: string;
    data:
      | {
          inventory_status?: string;
        }
      | UpdateStockAdjustment;
  }) => {
    try {
      const response = await updateStockAdjustment(
        updateData.stockAdjustmentId as string,
        updateData.data
      );
      return response.data;
    } catch (error) {
      console.error("Error updating general:", error);
      throw error;
    }
  }
);

export const stockAdjustmentSlice = createSlice({
  name: "stockAdjustment",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createStockAdjustmentAsync.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(createStockAdjustmentAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.stockAdjustments = [...state.stockAdjustments, action.payload];
      })
      .addCase(createStockAdjustmentAsync.rejected, (state) => {
        state.loading = false;
        state.error = true;
      })
      .addCase(updateStockAdjustmentAsync.pending, (state) => {
        state.isEdit = true;
        state.error = false;
      })
      .addCase(
        updateStockAdjustmentAsync.fulfilled,
        (state, action: PayloadAction<UpdateStockAdjustment>) => {
          const index = state.stockAdjustments.findIndex(
            (item) => item._id === action.payload._id
          );
          state.stockAdjustments[index] = action.payload;
          state.isEdit = false;
        }
      )
      .addCase(updateStockAdjustmentAsync.rejected, (state) => {
        state.isEdit = true;
        state.error = true;
      });
  },
});

export default stockAdjustmentSlice.reducer;
