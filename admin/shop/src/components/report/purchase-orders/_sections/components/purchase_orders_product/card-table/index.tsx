import { ReportPurchaseOrderByProduct } from "@/types/report";
import useGetPurchaseOrderByProduct from "../../../hooks/use-get-purchase-order-product";
import ReportPurchaseOrderTable from "./report-purchase-order-table";

const ReportPurchaseOrderByProductTable = () => {
  const { purchaseOrderProduct } = useGetPurchaseOrderByProduct();
  const data = purchaseOrderProduct.map((item) => ({
    ...item,
    totalPrice: item?.price * item.totalQuantity,
  }));
  return (
    <ReportPurchaseOrderTable data={data as ReportPurchaseOrderByProduct[]} />
  );
};

export default ReportPurchaseOrderByProductTable;
