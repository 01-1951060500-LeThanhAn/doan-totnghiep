import {
  CreateDeliveryNoteData,
  DeliveryNoteData,
  DetailDeliveryNoteData,
  UpdateDeliveryNoteData,
} from "@/types/delivery_note";
import { adminApi } from ".";

const createDeliveryNote = async (data: CreateDeliveryNoteData) => {
  const response = await adminApi.post<CreateDeliveryNoteData>(`/ship`, data);

  return response;
};

const getDeliveryNote = async () => {
  const response = await adminApi.get<DeliveryNoteData[]>(`/ship`);
  return response;
};

const getDetailDeliveryNote = async (deliveryNoteId: string) => {
  const response = await adminApi.get<DetailDeliveryNoteData>(
    `/ship/${deliveryNoteId}`
  );
  return response;
};

const updateDeliveryNote = async (
  deliveryNoteId: string,
  data:
    | {
        status?: string;
      }
    | UpdateDeliveryNoteData
) => {
  const response = await adminApi.patch(`/ship/${deliveryNoteId}`, data);

  return response;
};

const deleteDeliveryNote = async (deliveryNoteId: string) => {
  const response = await adminApi.delete<string>(`/ship/${deliveryNoteId}`);
  return response;
};

export {
  createDeliveryNote,
  getDeliveryNote,
  getDetailDeliveryNote,
  updateDeliveryNote,
  deleteDeliveryNote,
};
