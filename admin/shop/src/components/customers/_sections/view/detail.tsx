import { Custombreadcumb } from "@/features/custom-breadcumb";
import DetailCustomerPage from "../../_components/detail-customer";
import Header from "../../header";
import useGetDetailCustomer from "../../hooks/use-get-detail-customer";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "@/hooks/hooks";
import { deleteCustomerAsync } from "@/redux/slices/customerSlice";
import { toast } from "sonner";

type Props = {
  id: string;
};

const CustomerDetailView = ({ id }: Props) => {
  const { customer } = useGetDetailCustomer({ id });
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const handleDeleteCustomer = async () => {
    try {
      await dispatch(deleteCustomerAsync(id));
      toast.success("Xóa khách hàng thành công");

      navigate(`/dashboard/customer`);
    } catch (error) {
      console.log(error);
      toast.error("Xóa khách hàng thất bại");
    }
  };
  return (
    <>
      <Header
        title="Thông tin khách hàng"
        text1="Xóa khách hàng"
        text2="Chỉnh sửa khách hàng"
        onClick={handleDeleteCustomer}
      />
      <Custombreadcumb
        href2={`/dashboard/customer/`}
        breadcumbItem="Khách hàng"
        breadcumbPage="Thông tin chi tiết khách hàng"
        linkBtn={`/dashboard/customer/${id}/edit`}
        title="Chỉnh sửa khách hàng"
      />
      <DetailCustomerPage customer={customer!} />
    </>
  );
};

export default CustomerDetailView;
