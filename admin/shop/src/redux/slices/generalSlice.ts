import { createGenerals, updateGenerals } from "@/api/generalApi";
import { CreateGeneralData, UpdateGeneralData } from "@/types/general";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

type GeneralState = {
  generals: CreateGeneralData[];
  loading: boolean;
  isEdit: boolean;
  error: boolean;
};

const initialState: GeneralState = {
  generals: [],
  loading: false,
  isEdit: false,
  error: false,
};

export const createGeneralAsync = createAsyncThunk(
  "generals/createGeneralAsync",
  async (general: CreateGeneralData) => {
    const response = await createGenerals(general);
    return response.data;
  }
);

export const updateGeneralAsync = createAsyncThunk(
  "generals/updateGeneralAsync",
  async (updateData: {
    generalId: string | undefined;
    data: UpdateGeneralData;
  }) => {
    try {
      const response = await updateGenerals(
        updateData.generalId as string,
        updateData.data
      );
      return response.data;
    } catch (error) {
      console.error("Error updating general:", error);
      throw error;
    }
  }
);

export const generalSlice = createSlice({
  name: "generals",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createGeneralAsync.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(
        createGeneralAsync.fulfilled,
        (state, action: PayloadAction<CreateGeneralData>) => {
          if (action.payload) {
            state.loading = false;
            state.generals = [...state.generals, action.payload];
            state.error = false;
          }
        }
      )
      .addCase(createGeneralAsync.rejected, (state) => {
        state.loading = false;
        state.error = true;
      })
      .addCase(updateGeneralAsync.pending, (state) => {
        state.isEdit = true;
        state.error = false;
      })
      .addCase(
        updateGeneralAsync.fulfilled,
        (state, action: PayloadAction<UpdateGeneralData>) => {
          const index = state.generals.findIndex(
            (item) => item._id === action.payload._id
          );
          state.generals[index] = action.payload;
          state.isEdit = false;
        }
      )
      .addCase(updateGeneralAsync.rejected, (state) => {
        state.isEdit = true;
        state.error = true;
      });
  },
});

export default generalSlice.reducer;
