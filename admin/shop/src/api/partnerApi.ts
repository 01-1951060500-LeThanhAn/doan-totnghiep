import {
  CreatePartnerData,
  DetailPartnerData,
  PartnerData,
  UpdatePartnerData,
} from "@/types/partner";
import { adminApi } from ".";

const createPartner = async (partner: CreatePartnerData) => {
  const response = await adminApi.post<CreatePartnerData>(`/partner`, partner);

  return response;
};

const updatePartner = async (shipId: string, partner: UpdatePartnerData) => {
  const response = await adminApi.patch<UpdatePartnerData>(
    `/partner/${shipId}`,
    partner
  );

  return response;
};

const deletePartner = async (shipId: string) => {
  const response = await adminApi.delete(`/partner/${shipId}`);

  return response;
};

const getListPartner = async () => {
  const response = await adminApi.get<PartnerData[]>(`/partner`);

  return response;
};

const getDetailPartner = async (shipId: string) => {
  const response = await adminApi.get<DetailPartnerData>(`/partner/${shipId}`);

  return response;
};

export {
  createPartner,
  getListPartner,
  deletePartner,
  getDetailPartner,
  updatePartner,
};
