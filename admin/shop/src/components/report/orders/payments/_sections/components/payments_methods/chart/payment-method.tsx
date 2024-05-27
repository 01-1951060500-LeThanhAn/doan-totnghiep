import { useTheme } from "next-themes";
import useGetPaymentByStaff from "../../../../hooks/use-get-payment-staff";
import { Bar } from "react-chartjs-2";
const PaymentMethodChart = () => {
  const { paymentStaff } = useGetPaymentByStaff();
  const { theme } = useTheme();
  return (
    <>
      <div
        className={`${
          theme === "dark" ? "bg-[#212B36] " : "shadow-lg"
        } rounded-lg p-3 w-full h-[350px]`}
      >
        <Bar
          data={{
            labels: paymentStaff.map((data) => data.username),
            datasets: [
              {
                label: "Tiền mặt",
                data: paymentStaff.map(
                  (data) => data.totalPriceDeliveredOffline
                ),
                backgroundColor: "#FFA0B4",
                borderColor: "#FF6384",
              },
              {
                label: "Chuyển khoản",
                data: paymentStaff.map(
                  (data) => data.totalPriceDeliveredOnline
                ),
                backgroundColor: "#73b0f6",
                borderColor: "#2886e4",
              },
            ],
          }}
          options={{
            elements: {
              line: {
                tension: 0.5,
              },
            },
            plugins: {
              title: {
                text: "Báo cáo tiền hàng theo phương thức thanh toán",
                color: `${theme === "dark" ? "white" : "black"}`,
              },
            },
          }}
        />
      </div>
    </>
  );
};

export default PaymentMethodChart;
