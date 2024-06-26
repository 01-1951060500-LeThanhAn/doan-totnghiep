import { createPartner, deletePartner, updatePartner } from "@/api/partnerApi";
import { CreatePartnerData, UpdatePartnerData } from "@/types/partner";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

type PartnerState = {
  partners: CreatePartnerData[];
  loading: boolean;
  isEdit: boolean;
  error: boolean;
};

const initialState: PartnerState = {
  partners: [],
  loading: false,
  isEdit: false,
  error: false,
};

export const createPartnerAsync = createAsyncThunk(
  "partner/createPartnerAsync",
  async (partner: CreatePartnerData) => {
    const response = await createPartner(partner);
    return response.data;
  }
);

export const updatePartnerAsync = createAsyncThunk(
  "partner/updatePartnerAsync",
  async (updateData: {
    shipId: string | undefined;
    data:
      | {
          status?: string;
        }
      | UpdatePartnerData;
  }) => {
    try {
      const response = await updatePartner(
        updateData.shipId as string,
        updateData.data
      );
      return response.data;
    } catch (error) {
      console.error("Error updating product:", error);
      throw error;
    }
  }
);

export const deletePartnerAsync = createAsyncThunk(
  "partner/deletePartnerAsync",
  async (shipId: string) => {
    const response = await deletePartner(shipId);
    return response.data;
  }
);

export const partnerSlice = createSlice({
  name: "partner",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createPartnerAsync.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(
        createPartnerAsync.fulfilled,
        (state, action: PayloadAction<CreatePartnerData>) => {
          if (action.payload) {
            state.loading = false;
            state.partners = [...state.partners, action.payload];
            state.error = false;
          }
        }
      )
      .addCase(createPartnerAsync.rejected, (state) => {
        state.loading = false;
        state.error = true;
      })
      .addCase(updatePartnerAsync.pending, (state) => {
        state.isEdit = true;
        state.error = false;
      })
      .addCase(
        updatePartnerAsync.fulfilled,
        (state, action: PayloadAction<UpdatePartnerData>) => {
          const index = state.partners.findIndex(
            (item) => item._id === action.payload._id
          );
          state.partners[index] = action.payload;
          state.isEdit = false;
        }
      )
      .addCase(updatePartnerAsync.rejected, (state) => {
        state.isEdit = true;
        state.error = true;
      })
      .addCase(deletePartnerAsync.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(
        deletePartnerAsync.fulfilled,
        (state, action: PayloadAction<string>) => {
          const index = state.partners.findIndex(
            (item) => item._id === action.payload
          );
          state.partners.splice(index, 1);
          state.loading = false;
          state.error = false;
        }
      )
      .addCase(deletePartnerAsync.rejected, (state) => {
        state.error = true;
      });
  },
});
export default partnerSlice.reducer;
