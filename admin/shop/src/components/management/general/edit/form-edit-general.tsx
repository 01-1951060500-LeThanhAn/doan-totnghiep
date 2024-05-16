import useGetGenerals from "@/hooks/use-get-generals";
import { GeneralData } from "@/types/general";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import FormGeneral from "../form-general";
import { UpdateGeneralData } from "@/types/general";

const FormEditGeneral = () => {
  const { generals } = useGetGenerals();
  const { generalId } = useParams<{ generalId: string }>();
  const [data, setData] = useState<GeneralData>();

  useEffect(() => {
    const selectedGeneral = generals?.find((item) => item._id === generalId);
    setData(selectedGeneral);
  }, [generalId, generals]);
  return (
    <>
      <FormGeneral
        generalId={generalId as string}
        initialValues={data as UpdateGeneralData}
      />
    </>
  );
};

export default FormEditGeneral;
