import { getGenerals } from "@/api/generalApi";
import { GeneralData } from "@/types/general";
import { useEffect, useState } from "react";

const useGetGenerals = () => {
  const [generals, setGenerals] = useState<GeneralData[]>([]);

  useEffect(() => {
    const fetchListGenerals = async () => {
      const response = await getGenerals();

      setGenerals(response);
    };

    fetchListGenerals();
  }, []);

  return { generals };
};

export default useGetGenerals;
