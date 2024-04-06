import { createProduct, deleteProduct, updateProduct } from "@/api/productApi";
import { ProductData } from "@/types";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

type ProductState = {
  products: ProductData[];
  loading: boolean;
  isEdit: boolean;
  error: boolean;
};

const initialState: ProductState = {
  products: [],
  loading: false,
  isEdit: false,
  error: false,
};

export const createProductAsync = createAsyncThunk(
  "products/createProductAsync",
  async (product: ProductData) => {
    const response = await createProduct(product);
    return response.data;
  }
);

export const deleteProductAsync = createAsyncThunk(
  "products/deleteProductAsync",
  async (productId: string) => {
    const response = await deleteProduct(productId);
    return response.data;
  }
);

export const updateProductAsync = createAsyncThunk(
  "products/updateProductAsync",
  async (updateData: { productId: string | undefined; data: ProductData }) => {
    try {
      const response = await updateProduct(
        updateData.productId as string,
        updateData.data
      );
      return response.data;
    } catch (error) {
      console.error("Error updating product:", error);
      throw error;
    }
  }
);

export const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    getStatus: (state) => {
      state.loading = false;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(createProductAsync.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(
        createProductAsync.fulfilled,
        (state, action: PayloadAction<ProductData>) => {
          state.loading = false;
          state.products.push(action.payload);
          state.error = false;
        }
      )
      .addCase(createProductAsync.rejected, (state) => {
        state.error = true;
      })
      .addCase(deleteProductAsync.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(
        deleteProductAsync.fulfilled,
        (state, action: PayloadAction<string>) => {
          const index = state.products.findIndex(
            (item) => item._id === action.payload
          );
          state.products.splice(index, 1);
          state.loading = false;
          state.error = false;
        }
      )
      .addCase(deleteProductAsync.rejected, (state) => {
        state.error = true;
      })
      .addCase(updateProductAsync.pending, (state) => {
        state.isEdit = true;
        state.error = false;
      })
      .addCase(
        updateProductAsync.fulfilled,
        (state, action: PayloadAction<ProductData>) => {
          const index = state.products.findIndex(
            (item) => item._id === action.payload._id
          );
          state.products[index] = action.payload;
          state.isEdit = false;
        }
      )
      .addCase(updateProductAsync.rejected, (state) => {
        state.error = true;
      });
  },
});

export default productSlice.reducer;
