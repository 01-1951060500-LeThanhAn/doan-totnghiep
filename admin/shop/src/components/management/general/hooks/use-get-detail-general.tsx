import { getDetailGeneral } from "@/api/generalApi";
import { GeneralDetailResponse } from "@/types/general";
import { useEffect, useState } from "react";

type Props = {
  id: string;
};

const useGetDetailGeneral = ({ id }: Props) => {
  const [general, setGeneral] = useState<GeneralDetailResponse>();

  useEffect(() => {
    const fetchDetailGeneral = async () => {
      const response = await getDetailGeneral(id);

      setGeneral(response);
    };

    fetchDetailGeneral();
  }, [id]);

  return { general };
};

export default useGetDetailGeneral;
