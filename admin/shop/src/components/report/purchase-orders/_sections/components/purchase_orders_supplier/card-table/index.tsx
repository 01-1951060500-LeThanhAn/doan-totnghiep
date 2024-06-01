import { ReportPurchaseOrderBySupplier } from "@/types/report";
import useGetPurchaseOrderBySupplier from "../../../hooks/use-get-purchase-order-supplier";
import ReportPurchaseOrderTable from "./report-purchase-order-table";

const ReportPurchaseOrderBySupplierTable = () => {
  const { purchaseOrderSupplier } = useGetPurchaseOrderBySupplier();
  return (
    <>
      <ReportPurchaseOrderTable
        data={purchaseOrderSupplier as ReportPurchaseOrderBySupplier[]}
      />
    </>
  );
};

export default ReportPurchaseOrderBySupplierTable;
