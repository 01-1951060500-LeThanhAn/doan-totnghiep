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

const updatePartner = async (
  shipId: string,
  partner:
    | {
        status?: string;
      }
    | UpdatePartnerData
) => {
  const response = await adminApi.patch(`/partner/${shipId}`, partner);

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

const getStatusPartner = async () => {
  const response = await adminApi.get<PartnerData[]>(
    `/partner/search/status-partner?status=active`
  );

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
  getStatusPartner,
};
