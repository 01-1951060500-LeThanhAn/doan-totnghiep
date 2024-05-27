import { ReportPaymentByStaff } from "@/types/report";
import useGetPaymentByStaff from "../../../../hooks/use-get-payment-staff";
import ReportPaymentMethodTable from "./report-payment-method-table";

const ReportPaymentByMethodTable = () => {
  const { paymentStaff } = useGetPaymentByStaff();
  return (
    <>
      <ReportPaymentMethodTable data={paymentStaff as ReportPaymentByStaff[]} />
    </>
  );
};

export default ReportPaymentByMethodTable;
