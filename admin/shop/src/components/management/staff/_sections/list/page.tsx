import { Custombreadcumb } from "@/features/custom-breadcumb";
import Heading from "./heading";
import useGetUsers from "@/components/suppliers/hooks/use-get-users";
import StaffTableData from "./card-table";
import { UserDataTableProps } from "@/types";

const StaffMain = () => {
  const { users } = useGetUsers();
  const data = users.map((item) => ({
    _id: item?._id,
    username: item?.username,
    email: item?.email,
    phone: item?.phone,
    address: item?.address,
    role: item?.role?.name,
  }));

  return (
    <>
      <Heading />
      <Custombreadcumb
        href2="/dashboard/management"
        breadcumbItem="Kho"
        breadcumbPage="Danh sách nhân viên quản lý"
        linkBtn="/dashboard/management/staff/create"
        title="Tạo nhân viên quản lý"
      />
      <StaffTableData data={data as UserDataTableProps[]} />
    </>
  );
};

export default StaffMain;
