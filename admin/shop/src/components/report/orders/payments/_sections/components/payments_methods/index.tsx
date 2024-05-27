import HomeLayout from "@/layouts/home-layout";
import PaymentMethodChart from "./chart/payment-method";
import ReportPaymentByMethodTable from "./card-table";

const ReportPaymentsByMethod = () => {
  return (
    <>
      <HomeLayout>
        <PaymentMethodChart />
        <ReportPaymentByMethodTable />
      </HomeLayout>
    </>
  );
};

export default ReportPaymentsByMethod;
