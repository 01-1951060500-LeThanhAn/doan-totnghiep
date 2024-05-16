import { Custombreadcumb } from "@/features/custom-breadcumb";
import Heading from "./heading";
import useGetSuppliers from "@/components/suppliers/hooks/use-get-suppliers";
import DebtSupplierTableData from "./card-table";
import { SupplierData } from "@/types/supplier";

const DebtSuppliersPage = () => {
  const { suppliers } = useGetSuppliers();
  const data = suppliers?.map((item) => item.supplier);
  return (
    <>
      <Heading />
      <Custombreadcumb
        href2="/dashboard/report/finance"
        breadcumbItem="Báo cáo công nợ nhà cung cấp"
        breadcumbPage="Danh sách báo cáo công nợ nhà cung cấp"
        text={`Gỉai thích thuật ngữ`}
      />
      <DebtSupplierTableData data={data as SupplierData[]} />
    </>
  );
};

export default DebtSuppliersPage;
