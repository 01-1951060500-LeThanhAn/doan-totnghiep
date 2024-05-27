import HomeLayout from "@/layouts/home-layout";
import PaymentTimeChart from "./chart/payment-time";

const ReportPaymentsByTime = () => {
  return (
    <>
      <HomeLayout>
        <PaymentTimeChart />
      </HomeLayout>
    </>
  );
};

export default ReportPaymentsByTime;
