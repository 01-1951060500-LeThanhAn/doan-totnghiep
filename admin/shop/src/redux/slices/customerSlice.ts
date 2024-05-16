import {
  createCustomer,
  deleteCustomer,
  updateCustomer,
} from "@/api/customerApi";
import {
  CreateCustomerData,
  CustomerData,
  UpdateCustomerData,
} from "@/types/customer";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

type CustomerState = {
  customers: CreateCustomerData[];
  loading: boolean;
  isEdit: boolean;
  error: boolean;
};

const initialState: CustomerState = {
  customers: [],
  loading: false,
  isEdit: false,
  error: false,
};

export const createCustomerAsync = createAsyncThunk(
  "customer/createCustomerAsync",
  async (customer: CreateCustomerData) => {
    const response = await createCustomer(customer);
    return response?.data;
  }
);

export const deleteCustomerAsync = createAsyncThunk(
  "customer/deleteCustomerAsync",
  async (customerId: string) => {
    const response = await deleteCustomer(customerId);
    return response.data;
  }
);

export const updateCustomerAsync = createAsyncThunk(
  "customer/updateCustomerAsync",
  async (updateData: {
    customerId: string | undefined;
    data: UpdateCustomerData;
  }) => {
    try {
      const response = await updateCustomer(
        updateData.customerId as string,
        updateData.data
      );
      return response.data;
    } catch (error) {
      console.error("Error updating customer:", error);
      throw error;
    }
  }
);

export const customerSlice = createSlice({
  name: "customer",
  initialState,
  reducers: {
    getStatus: (state) => {
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createCustomerAsync.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(
        createCustomerAsync.fulfilled,
        (state, action: PayloadAction<CreateCustomerData | undefined>) => {
          if (action.payload) {
            state.loading = false;
            state.customers = [...state.customers, action.payload];
            state.error = false;
          }
        }
      )
      .addCase(createCustomerAsync.rejected, (state) => {
        state.loading = false;
        state.error = true;
      })

      .addCase(deleteCustomerAsync.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(
        deleteCustomerAsync.fulfilled,
        (state, action: PayloadAction<string>) => {
          const index = state.customers.findIndex(
            (item) => item._id === action.payload
          );
          state.customers.splice(index, 1);
          state.loading = false;
          state.error = false;
        }
      )
      .addCase(deleteCustomerAsync.rejected, (state) => {
        state.error = true;
      })
      .addCase(updateCustomerAsync.pending, (state) => {
        state.isEdit = true;
        state.error = false;
      })
      .addCase(
        updateCustomerAsync.fulfilled,
        (state, action: PayloadAction<CustomerData>) => {
          const index = state.customers.findIndex(
            (item) => item._id === action.payload._id
          );
          state.customers[index] = action.payload;
          state.isEdit = false;
        }
      )
      .addCase(updateCustomerAsync.rejected, (state) => {
        state.isEdit = true;
        state.error = true;
      });
  },
});
export default customerSlice.reducer;
