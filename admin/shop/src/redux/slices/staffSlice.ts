import { createStaff, deleteStaff, updateStaff } from "@/api/staffApi";
import { CreateStaffData, UpdateStaffData } from "@/types/staff";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

type GeneralState = {
  staffs: CreateStaffData[];
  loading: boolean;
  isEdit: boolean;
  isDelete: boolean;
  error: boolean;
};

const initialState: GeneralState = {
  staffs: [],
  loading: false,
  isEdit: false,
  error: false,
  isDelete: false,
};

export const createStaffAsync = createAsyncThunk(
  "staffs/createStaffAsync",
  async (staff: CreateStaffData) => {
    const response = await createStaff(staff);
    return response.data;
  }
);

export const deleteStaffAsync = createAsyncThunk(
  "staffs/deleteStaffAsync",
  async (staffId: string) => {
    const response = await deleteStaff(staffId);
    return response.data;
  }
);

export const updateStaffAsync = createAsyncThunk(
  "staffs/updateStaffAsync",
  async (updateData: { id: string | undefined; data: UpdateStaffData }) => {
    try {
      const response = await updateStaff(
        updateData.id as string,
        updateData.data
      );
      return response.data;
    } catch (error) {
      console.error("Error updating supplier:", error);
      throw error;
    }
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
      })
      .addCase(updateStaffAsync.pending, (state) => {
        state.isEdit = true;
        state.error = false;
      })
      .addCase(
        updateStaffAsync.fulfilled,
        (state, action: PayloadAction<UpdateStaffData>) => {
          const index = state.staffs.findIndex(
            (item) => item._id === action.payload._id
          );
          state.staffs[index] = action.payload;
          state.isEdit = false;
        }
      )
      .addCase(updateStaffAsync.rejected, (state) => {
        state.isEdit = true;
        state.error = true;
      })
      .addCase(deleteStaffAsync.pending, (state) => {
        state.loading = true;
        state.error = false;
        state.isDelete = true;
      })
      .addCase(
        deleteStaffAsync.fulfilled,
        (state, action: PayloadAction<string>) => {
          const index = state.staffs.findIndex(
            (item) => item._id === action.payload
          );
          state.staffs.splice(index, 1);
          state.loading = false;
          state.error = false;
          state.isDelete = false;
        }
      )
      .addCase(deleteStaffAsync.rejected, (state) => {
        state.error = true;
        state.isDelete = true;
      });
  },
});

export default staffSlice.reducer;
