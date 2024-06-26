import useGetDetailUser from "@/hooks/use-get-detail-user";
import DetailInforStaff from "../components/detail-staff";
import { UserData } from "@/types";

type Props = {
  id: string;
};

const StaffDetailView = ({ id }: Props) => {
  const { user } = useGetDetailUser({ id });

  return (
    <>
      <DetailInforStaff data={user?.results as UserData} id={id as string} />
    </>
  );
};

export default StaffDetailView;
