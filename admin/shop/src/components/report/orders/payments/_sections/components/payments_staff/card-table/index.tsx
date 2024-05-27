import { ReportPaymentByStaff } from "@/types/report";
import useGetPaymentByStaff from "../../../../hooks/use-get-payment-staff";
import ReportPaymentStaffTable from "./report-payment-staff-table";

const ReportPaymentByStaffTable = () => {
  const { paymentStaff } = useGetPaymentByStaff();
  return (
    <>
      <ReportPaymentStaffTable data={paymentStaff as ReportPaymentByStaff[]} />
    </>
  );
};

export default ReportPaymentByStaffTable;
