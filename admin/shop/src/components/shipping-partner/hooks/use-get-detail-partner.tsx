import { getDetailPartner } from "@/api/partnerApi";
import { DetailPartnerData } from "@/types/partner";
import { useEffect, useState } from "react";

type Props = {
  id: string;
};
const useGetDetailPartner = ({ id }: Props) => {
  const [partner, setPartner] = useState<DetailPartnerData>();

  useEffect(() => {
    const fetchDetailPartner = async () => {
      const response = await getDetailPartner(id);
      setPartner(response.data);
    };
    fetchDetailPartner();
  }, [id]);
  return { partner };
};

export default useGetDetailPartner;
