import HomeLayout from "@/layouts/home-layout";
import PaymentStaffChart from "./chart/payment-staff";
import ReportPaymentByStaffTable from "./card-table";

const ReportPaymentsByStaff = () => {
  return (
    <>
      <HomeLayout>
        <PaymentStaffChart />
        <ReportPaymentByStaffTable />
      </HomeLayout>
    </>
  );
};

export default ReportPaymentsByStaff;
