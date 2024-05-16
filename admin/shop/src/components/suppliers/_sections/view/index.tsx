import { Custombreadcumb } from "@/features/custom-breadcumb";
import Header from "../../header";
import useGetDetailSuppliers from "../../hooks/use-get-detail-suppliers";
import DetailSupplierView from "./detail-supplier-view";
import { SupplierDetailData } from "@/types/supplier";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "@/hooks/hooks";
import { deleteSuppliersAsync } from "@/redux/slices/supplierSlice";
import { toast } from "sonner";

type Props = {
  id: string;
};

const SupplierDetailView = ({ id }: Props) => {
  const { supplier } = useGetDetailSuppliers({ id });
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const handleDeleteSuppliers = async () => {
    try {
      await dispatch(deleteSuppliersAsync(id));
      toast.success("Xóa nhà cung cấp thành công");

      navigate(`/dashboard/customer`);
    } catch (error) {
      console.log(error);
      toast.error("Xóa nhà cung cấp thất bại");
    }
  };

  return (
    <>
      <Header
        title="Thông tin nhà cung cấp"
        text1="Xóa nhà cung cấp"
        text2="Quản lý nhà cung cấp"
        onClick={handleDeleteSuppliers}
      />
      <Custombreadcumb
        href2={`/dashboard/supplier/`}
        breadcumbItem="Nhà cung cấp"
        breadcumbPage="Thông tin chi tiết nhà cung cấp"
        linkBtn={`/dashboard/supplier/${id}/edit`}
        title="Chỉnh sửa nhà cung cấp"
      />
      <DetailSupplierView
        supplier={supplier as unknown as SupplierDetailData}
      />
    </>
  );
};

export default SupplierDetailView;
