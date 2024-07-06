import { Custombreadcumb } from "@/features/custom-breadcumb";
import useGetSuppliers from "../../hooks/use-get-suppliers";
import SuppliersTableData from "./card-table";
import Heading from "./heading";

const SupplierPage = () => {
  const { suppliers } = useGetSuppliers();

  const data = suppliers.map((item) => ({
    ...item.supplier,
    totalPrice: item?.totalSpending,
    totalOrders: item?.totalOrders,
  }));
  return (
    <>
      <Heading />
      <Custombreadcumb
        href2="/dashboard/supplier"
        breadcumbItem="Nhà cung cấp"
        breadcumbPage="Danh sách nhà cung cấp"
        linkBtn="/dashboard/supplier/create"
        title="Thêm nhà cung cấp"
      />
      <SuppliersTableData data={data} />
    </>
  );
};

export default SupplierPage;
