import useGetRevenueByCustomer from "@/components/report/orders/revenue/_sections/hooks/use-get-revenue-customer";
import ReportShipmentCustomerTable from "./report-shipment-customer-table";
import { ReportRevenueByCustomerData } from "@/types/report";

const ReportShipmentByCustomerTable = () => {
  const { revenueCustomer } = useGetRevenueByCustomer();
  return (
    <>
      <ReportShipmentCustomerTable
        data={revenueCustomer as ReportRevenueByCustomerData[]}
      />
    </>
  );
};

export default ReportShipmentByCustomerTable;
