import { getSuppliers } from "@/api/supplierApi";
import { SupplierDataResponse } from "@/types/supplier";
import { useEffect, useState } from "react";

const useGetSuppliers = () => {
  const [suppliers, setSuppliers] = useState<SupplierDataResponse[]>([]);

  useEffect(() => {
    const fetchLisSuppliers = async () => {
      const response = await getSuppliers();

      setSuppliers(response);
    };

    fetchLisSuppliers();
  }, []);

  return { suppliers };
};

export default useGetSuppliers;
