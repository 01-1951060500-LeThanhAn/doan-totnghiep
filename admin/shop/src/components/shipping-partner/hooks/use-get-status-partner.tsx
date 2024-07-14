import { getStatusPartner } from "@/api/partnerApi";
import { PartnerData } from "@/types/partner";
import { useEffect, useState } from "react";

const useGetStatusPartners = () => {
  const [partners, setPartners] = useState<PartnerData[]>([]);

  useEffect(() => {
    const fetchListPartner = async () => {
      const response = await getStatusPartner();

      setPartners(response.data);
    };

    fetchListPartner();
  }, [partners]);

  return { partners };
};

export default useGetStatusPartners;
