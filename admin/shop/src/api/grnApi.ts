import {
  CreateGoodReceivedNoteData,
  DetailGoodReceivedNote,
  GoodReceivedNoteData,
} from "@/types/good_received_note";
import { adminApi } from ".";

const createGoodReceivedNote = async (data: CreateGoodReceivedNoteData) => {
  try {
    const response = await adminApi.post<CreateGoodReceivedNoteData>(
      `/warehouse`,
      data
    );

    return response;
  } catch (error) {
    console.log(error);
    throw new Error("Error fetching data");
  }
};

const getGoodReceivedNote = async () => {
  try {
    const response = await adminApi.get<GoodReceivedNoteData[]>(`/warehouse`);

    return response;
  } catch (error) {
    console.log(error);
    throw new Error("Error fetching data");
  }
};

const getDetailGoodReceivedNote = async (grnId: string) => {
  try {
    const response = await adminApi.get<DetailGoodReceivedNote>(
      `/warehouse/${grnId}`
    );
    return response;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

const updateGoodReceivedNote = async (grnId: string) => {
  try {
    const response = await adminApi.patch(`/warehouse/${grnId}`);

    return response;
  } catch (error) {
    console.log("Error update data:", error!);
    throw error;
  }
};

const deleteGoodReceivedNote = async (grnId: string) => {
  try {
    const response = await adminApi.delete(`/warehouse/${grnId}`);

    return response;
  } catch (error) {
    console.log("Error delete data:", error!);
    throw error;
  }
};

export {
  createGoodReceivedNote,
  getGoodReceivedNote,
  getDetailGoodReceivedNote,
  updateGoodReceivedNote,
  deleteGoodReceivedNote,
};
