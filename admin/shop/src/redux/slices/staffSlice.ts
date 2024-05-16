import { createStaff } from "@/api/staffApi";
import { CreateStaffData } from "@/types/staff";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

type GeneralState = {
  staffs: CreateStaffData[];
  loading: boolean;
  isEdit: boolean;
  error: boolean;
};

const initialState: GeneralState = {
  staffs: [],
  loading: false,
  isEdit: false,
  error: false,
};

export const createStaffAsync = createAsyncThunk(
  "staffs/createStaffAsync",
  async (staff: CreateStaffData) => {
    const response = await createStaff(staff);
    return response.data;
  }
);

export const staffSlice = createSlice({
  name: "staffs",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createStaffAsync.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(
        createStaffAsync.fulfilled,
        (state, action: PayloadAction<CreateStaffData>) => {
          if (action.payload) {
            state.loading = false;
            state.staffs = [...state.staffs, action.payload];
            state.error = false;
          }
        }
      )
      .addCase(createStaffAsync.rejected, (state) => {
        state.loading = false;
        state.error = true;
      });
  },
});

export default staffSlice.reducer;
