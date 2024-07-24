import { Custombreadcumb } from "@/features/custom-breadcumb";
import Heading from "./heading";
import useGetUsers from "@/components/suppliers/hooks/use-get-users";
import StaffTableData from "./card-table";
import { UserDataTableProps } from "@/types";
import { useAppDispatch } from "@/hooks/hooks";
import { toast } from "sonner";
import { deleteStaffAsync } from "@/redux/slices/staffSlice";
import { useEffect, useState } from "react";

const StaffMain = () => {
  const { users } = useGetUsers();
  const dispatch = useAppDispatch();
  const [listUsers, setListUsers] = useState(users);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setListUsers(users);
  }, [users, setListUsers]);

  const data = listUsers.map((item) => ({
    _id: item?._id,
    username: item?.username,
    email: item?.email,
    phone: item?.phone,
    address: item?.address,
    role: item?.role,
    picture: item?.picture,
  }));

  const handleDeleteStaff = async (id: string) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa nhân viên này không ?")) {
      setLoading(true);
      try {
        await dispatch(deleteStaffAsync(id));
        setListUsers(listUsers.filter((item) => item._id !== id));
        setLoading(false);
        toast.success("Xóa nhân viên thành công");
      } catch (error) {
        console.error(error);
        setLoading(false);
        toast.error("Có lỗi xảy ra, vui lòng thử lại sau");
      }
      setLoading(false);
    }
  };

  return (
    <>
      <Heading />
      <Custombreadcumb
        href2="/dashboard/management"
        breadcumbItem="Kho"
        breadcumbPage="Danh sách nhân viên"
        linkBtn="/dashboard/management/staff/create"
        title="Tạo nhân viên"
      />
      <StaffTableData
        onDeleteStaff={handleDeleteStaff}
        data={data as UserDataTableProps[]}
        loading={loading}
      />
    </>
  );
};

export default StaffMain;
