import { PartnerData } from "@/types/partner";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useGetPartners from "../hooks/use-get-partners";
import FormPartner from "../form-partner";

const FormEditPartner = () => {
  const [data, setData] = useState<PartnerData>();
  const { shipId } = useParams<{ shipId: string }>();
  const { partners } = useGetPartners();

  useEffect(() => {
    const selectedPartner = partners?.find((item) => item._id === shipId);
    setData(selectedPartner);
  }, [shipId, partners]);
  return (
    <>
      <FormPartner shipId={shipId} initialValues={data as PartnerData} />
    </>
  );
};

export default FormEditPartner;
