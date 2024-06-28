import { createProduct, deleteProduct, updateProduct } from "@/api/productApi";
import {
  CreateProductDataType,
  UpdatePriceProduct,
  UpdateProductDataType,
} from "@/types/product";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

type ProductState = {
  products: CreateProductDataType[];
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
  async (product: CreateProductDataType) => {
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
  async (updateData: {
    productId: string | undefined;
    data: UpdateProductDataType | UpdatePriceProduct;
  }) => {
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
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(createProductAsync.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(
        createProductAsync.fulfilled,
        (state, action: PayloadAction<CreateProductDataType>) => {
          if (action.payload) {
            state.loading = false;
            state.products = [...state.products, action.payload];
            state.error = false;
          }
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
        (state, action: PayloadAction<CreateProductDataType>) => {
          const index = state.products.findIndex(
            (item) => item._id === action.payload._id
          );
          state.products[index] = action.payload;
          state.isEdit = false;
        }
      )
      .addCase(updateProductAsync.rejected, (state) => {
        state.isEdit = true;
        state.error = true;
      });
  },
});

export default productSlice.reducer;
