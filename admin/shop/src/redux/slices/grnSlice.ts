import {
  createGoodReceivedNote,
  deleteGoodReceivedNote,
  updateGoodReceivedNote,
} from "@/api/grnApi";
import {
  CreateGoodReceivedNoteData,
  UpdateGoodReceivedNoteData,
} from "@/types/good_received_note";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
type GRNState = {
  goodreceivedNotes: CreateGoodReceivedNoteData[];
  loading: boolean;
  isEdit: boolean;
  error: boolean;
};
const initialState: GRNState = {
  goodreceivedNotes: [],
  loading: false,
  isEdit: false,
  error: false,
};
export const createGRNAsync = createAsyncThunk(
  "good-received-note/createGRNAsync",
  async (grn: CreateGoodReceivedNoteData) => {
    const response = await createGoodReceivedNote(grn);
    return response.data;
  }
);

export const deleteGRNAsync = createAsyncThunk(
  "good-received-note/deleteGRNAsync",
  async (grnId: string) => {
    const response = await deleteGoodReceivedNote(grnId);
    return response.data;
  }
);

export const updateGRNAsync = createAsyncThunk(
  "good-received-note/updateGRNAsync",
  async (grnId: string) => {
    try {
      const response = await updateGoodReceivedNote(grnId as string);
      return response.data;
    } catch (error) {
      console.error("Error updating GRN:", error);
      throw error;
    }
  }
);

export const grnSlice = createSlice({
  name: "good-received-note",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createGRNAsync.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(
        createGRNAsync.fulfilled,
        (state, action: PayloadAction<CreateGoodReceivedNoteData>) => {
          if (action.payload) {
            state.loading = false;
            state.goodreceivedNotes = [
              ...state.goodreceivedNotes,
              action.payload,
            ];
            state.error = false;
          }
        }
      )
      .addCase(createGRNAsync.rejected, (state) => {
        state.loading = false;
        state.error = true;
      })
      .addCase(updateGRNAsync.pending, (state) => {
        state.isEdit = true;
        state.error = false;
      })
      .addCase(
        updateGRNAsync.fulfilled,
        (state, action: PayloadAction<UpdateGoodReceivedNoteData>) => {
          const index = state.goodreceivedNotes.findIndex(
            (item) => item._id === action.payload._id
          );
          state.goodreceivedNotes[index] = action.payload;
          state.isEdit = false;
        }
      )
      .addCase(updateGRNAsync.rejected, (state) => {
        state.isEdit = true;
        state.error = true;
      })
      .addCase(deleteGRNAsync.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(
        deleteGRNAsync.fulfilled,
        (state, action: PayloadAction<string>) => {
          const index = state.goodreceivedNotes.findIndex(
            (item) => item._id === action.payload
          );
          state.goodreceivedNotes.splice(index, 1);
          state.loading = false;
          state.error = false;
        }
      )
      .addCase(deleteGRNAsync.rejected, (state) => {
        state.error = true;
      });
  },
});

export default grnSlice.reducer;
