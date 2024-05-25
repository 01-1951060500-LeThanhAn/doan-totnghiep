import { ReportRevenueByProductData } from "@/types/report";
import useGetRevenueByProduct from "../../../hooks/use-get-revenue-product";
import ReportRevenueProductTable from "./report-revenue-table";

const ReportRevenueByProductTable = () => {
  const { revenueProduct } = useGetRevenueByProduct();
  return (
    <>
      <ReportRevenueProductTable
        data={revenueProduct as ReportRevenueByProductData[]}
      />
    </>
  );
};

export default ReportRevenueByProductTable;
