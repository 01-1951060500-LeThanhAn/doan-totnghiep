import { getDetailSuppliers } from "@/api/supplierApi";
import { SupplierData } from "@/types/supplier";
import { useEffect, useState } from "react";

type Props = {
  id: string;
};

const useGetDetailSuppliers = ({ id }: Props) => {
  const [supplier, setSupplier] = useState<SupplierData>();

  useEffect(() => {
    const fetchDetailSupplier = async () => {
      const response = await getDetailSuppliers(id);

      setSupplier(response);
    };

    fetchDetailSupplier();
  }, [id]);
  return { supplier };
};

export default useGetDetailSuppliers;
