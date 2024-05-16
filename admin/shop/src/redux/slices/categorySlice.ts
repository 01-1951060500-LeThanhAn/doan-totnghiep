import { createCategorys } from "@/api/categoryApi";
import { CreateCategoryData } from "@/types/category";
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

export const categorySlice = createSlice({
  name: "category",
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
      });
  },
});

export default categorySlice.reducer;
