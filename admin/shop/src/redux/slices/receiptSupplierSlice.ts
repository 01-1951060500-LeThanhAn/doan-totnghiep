import {
  createSupplierReceipt,
  deleteSupplierReceipts,
} from "@/api/receiptSupplierApi";
import {
  CreateSupplierReceiptData,
  ReceiptSupplierData,
} from "@/types/receipt_supplier";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

type ReceiptState = {
  receipts: ReceiptSupplierData[];
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

export const createSupplierReceiptAsync = createAsyncThunk(
  "receipt-supplier/createSupplierReceiptAsync",
  async (receipt: CreateSupplierReceiptData) => {
    const response = await createSupplierReceipt(receipt);
    return response.data;
  }
);

export const deleteSupplierReceiptAsync = createAsyncThunk(
  "receipt/deleteSupplierReceiptAsync",
  async (receiptId: string) => {
    const response = await deleteSupplierReceipts(receiptId);
    return response.data;
  }
);

export const receiptSupplierSlice = createSlice({
  name: "receipt-supplier",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createSupplierReceiptAsync.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(createSupplierReceiptAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.receipts = [...state.receipts, action.payload];
      })
      .addCase(createSupplierReceiptAsync.rejected, (state) => {
        state.loading = false;
        state.error = true;
      })
      .addCase(deleteSupplierReceiptAsync.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(
        deleteSupplierReceiptAsync.fulfilled,
        (state, action: PayloadAction<string>) => {
          const index = state.receipts.findIndex(
            (item) => item._id === action.payload
          );
          state.receipts.splice(index, 1);
          state.loading = false;
          state.error = false;
        }
      )
      .addCase(deleteSupplierReceiptAsync.rejected, (state) => {
        state.error = true;
      });
  },
});

export default receiptSupplierSlice.reducer;
