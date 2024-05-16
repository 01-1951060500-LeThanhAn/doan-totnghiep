import { getListPartner } from "@/api/partnerApi";
import { PartnerData } from "@/types/partner";
import { useEffect, useState } from "react";

const useGetPartners = () => {
  const [partners, setPartners] = useState<PartnerData[]>([]);

  useEffect(() => {
    const fetchListPartner = async () => {
      const response = await getListPartner();

      setPartners(response.data);
    };

    fetchListPartner();
  }, []);

  return { partners };
};

export default useGetPartners;
