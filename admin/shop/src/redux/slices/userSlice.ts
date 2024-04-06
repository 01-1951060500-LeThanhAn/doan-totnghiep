import { updateUser } from "@/api/userApi";
import { UserData } from "@/types";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

type UserState = {
  users: UserData[];
  loading: boolean;
  isEdit: boolean;
  error: boolean;
};

export const updateUserAsync = createAsyncThunk(
  "users/updateUserAsync",
  async (updateData: { userId: string | undefined; data: UserData }) => {
    try {
      const response = await updateUser(
        updateData.userId as string,
        updateData.data
      );
      return response.data;
    } catch (error) {
      console.error("Error updating user:", error);
      throw error;
    }
  }
);

const initialState: UserState = {
  users: [],
  loading: false,
  isEdit: false,
  error: false,
};

export const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(updateUserAsync.pending, (state) => {
        state.isEdit = true;
        state.error = false;
      })
      .addCase(
        updateUserAsync.fulfilled,
        (state, action: PayloadAction<UserData>) => {
          const index = state.users.findIndex(
            (item) => item._id === action.payload._id
          );
          state.users[index] = action.payload;
          state.isEdit = false;
        }
      )
      .addCase(updateUserAsync.rejected, (state) => {
        state.error = true;
      });
  },
});

export default userSlice.reducer;
