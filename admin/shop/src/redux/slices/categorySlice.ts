import {
  createCategorys,
  deleteCategory,
  updateCategorys,
} from "@/api/categoryApi";
import { CreateCategoryData, UpdateCategoryData } from "@/types/category";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

type CategoryState = {
  categorys: CreateCategoryData[];
  loading: boolean;
  isEdit: boolean;
  error: boolean;
};

const initialState: CategoryState = {
  categorys: [],
  loading: false,
  isEdit: false,
  error: false,
};

export const createCategoryAsync = createAsyncThunk(
  "categorys/createCategoryAsync",
  async (category: CreateCategoryData) => {
    const response = await createCategorys(category);
    return response;
  }
);

export const updateCategoryAsync = createAsyncThunk(
  "categorys/updateCategoryAsync",
  async (updateData: {
    categoryId: string | undefined;
    data: UpdateCategoryData;
  }) => {
    try {
      const response = await updateCategorys(
        updateData.categoryId as string,
        updateData.data
      );
      return response.data;
    } catch (error) {
      console.error("Error updating category products:", error);
      throw error;
    }
  }
);

export const deleteCategoryAsync = createAsyncThunk(
  "categorys/deleteCategoryAsync",
  async (categoryId: string) => {
    const response = await deleteCategory(categoryId);
    return response;
  }
);

export const categorySlice = createSlice({
  name: "categorys",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createCategoryAsync.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(
        createCategoryAsync.fulfilled,
        (state, action: PayloadAction<CreateCategoryData>) => {
          if (action.payload) {
            state.loading = false;
            state.categorys = [...state.categorys, action.payload];
            state.error = false;
          }
        }
      )
      .addCase(createCategoryAsync.rejected, (state) => {
        state.loading = false;
        state.error = true;
      })
      .addCase(updateCategoryAsync.pending, (state) => {
        state.isEdit = true;
        state.error = false;
      })
      .addCase(
        updateCategoryAsync.fulfilled,
        (state, action: PayloadAction<UpdateCategoryData>) => {
          const index = state.categorys.findIndex(
            (item) => item._id === action.payload._id
          );
          state.categorys[index] = action.payload;
          state.isEdit = false;
        }
      )
      .addCase(updateCategoryAsync.rejected, (state) => {
        state.isEdit = true;
        state.error = true;
      })
      .addCase(deleteCategoryAsync.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(
        deleteCategoryAsync.fulfilled,
        (state, action: PayloadAction<string>) => {
          const index = state.categorys.findIndex(
            (item) => item._id === action.payload
          );
          state.categorys.splice(index, 1);
          state.loading = false;
          state.error = false;
        }
      )
      .addCase(deleteCategoryAsync.rejected, (state) => {
        state.error = true;
      });
  },
});

export default categorySlice.reducer;
