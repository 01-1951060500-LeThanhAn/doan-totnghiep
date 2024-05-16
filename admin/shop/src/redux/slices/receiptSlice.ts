import { createReceipt, deleteReceipts } from "@/api/receiptApi";
import { CreateReceiptData, ReceiptData } from "@/types/receipt";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

type ReceiptState = {
  receipts: ReceiptData[];
  loading: boolean;
  isEdit: boolean;
  error: boolean;
};

const initialState: ReceiptState = {
  receipts: [],
  loading: false,
  isEdit: false,
  error: false,
};

export const createReceiptAsync = createAsyncThunk(
  "receipt/createReceiptAsync",
  async (receipt: CreateReceiptData) => {
    const response = await createReceipt(receipt);
    return response.data;
  }
);

export const deleteReceiptAsync = createAsyncThunk(
  "receipt/deleteReceiptAsync",
  async (receiptId: string) => {
    const response = await deleteReceipts(receiptId);
    return response.data;
  }
);

export const receiptSlice = createSlice({
  name: "receipt",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createReceiptAsync.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(createReceiptAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.receipts = [...state.receipts, action.payload];
      })
      .addCase(createReceiptAsync.rejected, (state) => {
        state.loading = false;
        state.error = true;
      })
      .addCase(deleteReceiptAsync.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(
        deleteReceiptAsync.fulfilled,
        (state, action: PayloadAction<string>) => {
          const index = state.receipts.findIndex(
            (item) => item._id === action.payload
          );
          state.receipts.splice(index, 1);
          state.loading = false;
          state.error = false;
        }
      )
      .addCase(deleteReceiptAsync.rejected, (state) => {
        state.error = true;
      });
  },
});

export default receiptSlice.reducer;
