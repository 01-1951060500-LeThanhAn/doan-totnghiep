import { deleteAllTransaction } from "@/api/transactionApi";
import { TransactionData } from "@/types/transaction";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

type TransactionState = {
  transactions: TransactionData[];
  loading: boolean;
  isEdit: boolean;
  error: boolean;
};

const initialState: TransactionState = {
  transactions: [],
  loading: false,
  isEdit: false,
  error: false,
};

export const deleteTransactionAsync = createAsyncThunk(
  "transaction/deleteTransactionAsync",
  async () => {
    const response = await deleteAllTransaction();
    return response.data;
  }
);

export const transactionSlice = createSlice({
  name: "transaction",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(deleteTransactionAsync.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(
        deleteTransactionAsync.fulfilled,
        (state, action: PayloadAction<string>) => {
          const index = state.transactions.findIndex(
            (item) => item._id === action.payload
          );
          state.transactions.splice(index, 1);
          state.loading = false;
          state.error = false;
        }
      )
      .addCase(deleteTransactionAsync.rejected, (state) => {
        state.error = true;
      });
  },
});

export default transactionSlice.reducer;
