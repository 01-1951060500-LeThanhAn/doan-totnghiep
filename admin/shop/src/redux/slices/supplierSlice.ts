import {
  createSupplier,
  deleteSuppliers,
  updateSuppliers,
} from "@/api/supplierApi";
import {
  CreateSupplierData,
  SupplierData,
  UpdateSupplierData,
} from "@/types/supplier";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
type SupplierState = {
  suppliers: CreateSupplierData[];
  loading: boolean;
  isEdit: boolean;
  error: boolean;
};

const initialState: SupplierState = {
  suppliers: [],
  loading: false,
  isEdit: false,
  error: false,
};

export const createSupplierAsync = createAsyncThunk(
  "suppliers/createSupplierAsync",
  async (supplier: CreateSupplierData) => {
    const response = await createSupplier(supplier);
    return response.data;
  }
);

export const updateSupplierAsync = createAsyncThunk(
  "suppliers/updateSupplierAsync",
  async (updateData: {
    supplierId: string | undefined;
    data: UpdateSupplierData;
  }) => {
    try {
      const response = await updateSuppliers(
        updateData.supplierId as string,
        updateData.data
      );
      return response.data;
    } catch (error) {
      console.error("Error updating supplier:", error);
      throw error;
    }
  }
);

export const deleteSuppliersAsync = createAsyncThunk(
  "suppliers/deleteSuppliersAsync",
  async (supplierId: string) => {
    const response = await deleteSuppliers(supplierId);
    return response;
  }
);

export const supplierSlice = createSlice({
  name: "suppliers",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createSupplierAsync.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(
        createSupplierAsync.fulfilled,
        (state, action: PayloadAction<CreateSupplierData>) => {
          if (action.payload) {
            state.loading = false;
            state.suppliers = [...state.suppliers, action.payload];
            state.error = false;
          }
        }
      )
      .addCase(createSupplierAsync.rejected, (state) => {
        state.loading = false;
        state.error = true;
      })
      .addCase(updateSupplierAsync.pending, (state) => {
        state.isEdit = true;
        state.error = false;
      })
      .addCase(
        updateSupplierAsync.fulfilled,
        (state, action: PayloadAction<SupplierData>) => {
          const index = state.suppliers.findIndex(
            (item) => item._id === action.payload._id
          );
          state.suppliers[index] = action.payload;
          state.isEdit = false;
        }
      )
      .addCase(updateSupplierAsync.rejected, (state) => {
        state.isEdit = true;
        state.error = true;
      })
      .addCase(deleteSuppliersAsync.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(
        deleteSuppliersAsync.fulfilled,
        (state, action: PayloadAction<string>) => {
          const index = state.suppliers.findIndex(
            (item) => item._id === action.payload
          );
          state.suppliers.splice(index, 1);
          state.loading = false;
          state.error = false;
        }
      )
      .addCase(deleteSuppliersAsync.rejected, (state) => {
        state.error = true;
      });
  },
});

export default supplierSlice.reducer;
