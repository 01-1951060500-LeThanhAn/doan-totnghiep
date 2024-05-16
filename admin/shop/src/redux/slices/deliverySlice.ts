import {
  createDeliveryNote,
  deleteDeliveryNote,
  updateDeliveryNote,
} from "@/api/deliveryNoteApi";
import {
  CreateDeliveryNoteData,
  UpdateDeliveryNoteData,
} from "@/types/delivery_note";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

type DeliveryNoteState = {
  deliveryNotes: CreateDeliveryNoteData[];
  loading: boolean;
  isEdit: boolean;
  error: boolean;
};

const initialState: DeliveryNoteState = {
  deliveryNotes: [],
  loading: false,
  isEdit: false,
  error: false,
};

export const createDeliveryNoteAsync = createAsyncThunk(
  "deliveryNotes/createDeliveryNoteAsync",
  async (data: CreateDeliveryNoteData) => {
    const response = await createDeliveryNote(data);
    return response.data;
  }
);

export const updateDeliveryNoteAsync = createAsyncThunk(
  "deliveryNotes/updateDeliveryNoteAsync",
  async (updateData: {
    deliveryNoteId: string;
    data:
      | {
          status?: string;
        }
      | UpdateDeliveryNoteData;
  }) => {
    try {
      const response = await updateDeliveryNote(
        updateData.deliveryNoteId as string,
        updateData.data
      );
      return response.data;
    } catch (error) {
      console.error("Error updating delivery notes:", error);
      throw error;
    }
  }
);

export const deleteDeliveryNoteAsync = createAsyncThunk(
  "deliveryNotes/deleteDeliveryNoteAsync",
  async (deliveryNoteId: string) => {
    const response = await deleteDeliveryNote(deliveryNoteId);
    return response.data;
  }
);

export const deliverySlice = createSlice({
  name: "deliveryNotes",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createDeliveryNoteAsync.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(
        createDeliveryNoteAsync.fulfilled,
        (state, action: PayloadAction<CreateDeliveryNoteData>) => {
          if (action.payload) {
            state.loading = false;
            state.deliveryNotes = [...state.deliveryNotes, action.payload];
            state.error = false;
          }
        }
      )
      .addCase(createDeliveryNoteAsync.rejected, (state) => {
        state.loading = false;
        state.error = true;
      })
      .addCase(updateDeliveryNoteAsync.pending, (state) => {
        state.isEdit = true;
        state.error = false;
      })
      .addCase(
        updateDeliveryNoteAsync.fulfilled,
        (state, action: PayloadAction<UpdateDeliveryNoteData>) => {
          const index = state.deliveryNotes.findIndex(
            (item) => item._id === action.payload._id
          );
          state.deliveryNotes[index] = action.payload;
          state.isEdit = false;
        }
      )
      .addCase(updateDeliveryNoteAsync.rejected, (state) => {
        state.isEdit = true;
        state.error = true;
      })
      .addCase(deleteDeliveryNoteAsync.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(
        deleteDeliveryNoteAsync.fulfilled,
        (state, action: PayloadAction<string>) => {
          const index = state.deliveryNotes.findIndex(
            (item) => item._id === action.payload
          );
          state.deliveryNotes.splice(index, 1);
          state.loading = false;
          state.error = false;
        }
      )
      .addCase(deleteDeliveryNoteAsync.rejected, (state) => {
        state.error = true;
      });
  },
});

export default deliverySlice.reducer;
