import useGetUsers from "@/components/suppliers/hooks/use-get-users";
import { UserData } from "@/types";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { UpdateStaffData } from "@/types/staff";
import FormStaff from "./form-staff";

const FormEditStaff = () => {
  const { staffId } = useParams<{ staffId: string }>();
  const { users } = useGetUsers();
  const [data, setData] = useState<UserData>();

  useEffect(() => {
    const selectedStaff = users?.find((item) => item._id === staffId);
    setData(selectedStaff);
  }, [staffId, users]);

  return (
    <>
      <FormStaff
        id={staffId as string}
        initialValues={data as unknown as UpdateStaffData}
      />
    </>
  );
};

export default FormEditStaff;
