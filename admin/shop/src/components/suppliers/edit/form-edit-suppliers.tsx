import { SupplierData, UpdateSupplierData } from "@/types/supplier";
import { useEffect, useState } from "react";
import useGetSuppliers from "../hooks/use-get-suppliers";
import { useParams } from "react-router-dom";
import FormSupplier from "../form-supplier";

const FormEditSupplier = () => {
  const [data, setData] = useState<SupplierData>();
  const { suppliers } = useGetSuppliers();
  const { supplierId } = useParams<{ supplierId: string }>();

  useEffect(() => {
    const selectedSuppliers = suppliers?.find(
      (item) => item.supplier?._id === supplierId
    );
    setData(selectedSuppliers?.supplier);
  }, [supplierId, suppliers]);

  return (
    <>
      <FormSupplier
        supplierId={supplierId}
        initialValues={data as UpdateSupplierData}
      />
    </>
  );
};

export default FormEditSupplier;
