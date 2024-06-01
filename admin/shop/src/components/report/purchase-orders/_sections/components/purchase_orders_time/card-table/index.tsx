import { ReportPurchaseOrderByTime } from "@/types/report";
import useGetPurchaseOrderByTime from "../../../hooks/use-get-purchase-order-time";
import ReportPurchaseOrderTable from "./report-purchase-order-table";

const ReportPurchaseOrderByTimeTable = () => {
  const { purchaseOrderTime } = useGetPurchaseOrderByTime();
  return (
    <>
      <ReportPurchaseOrderTable
        data={purchaseOrderTime as ReportPurchaseOrderByTime[]}
      />
    </>
  );
};

export default ReportPurchaseOrderByTimeTable;
