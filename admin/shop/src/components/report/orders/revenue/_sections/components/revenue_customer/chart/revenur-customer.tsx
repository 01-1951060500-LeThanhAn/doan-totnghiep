import { useTheme } from "next-themes";
import useGetRevenueByCustomer from "../../../hooks/use-get-revenue-customer";
import { Bar } from "react-chartjs-2";

const RevenueCustomerChart = () => {
  const { revenueCustomer } = useGetRevenueByCustomer();
  const { theme } = useTheme();
  return (
    <>
      <div
        className={`${
          theme === "dark" ? "bg-[#212B36] " : "shadow-lg"
        } rounded-lg p-3 w-full h-[320px]`}
      >
        <Bar
          data={{
            labels: revenueCustomer?.map((item) => item.name),
            datasets: [
              {
                label: "SL Đơn hàng",
                data: revenueCustomer.map((item) => item.totalOrders),
                backgroundColor: ["rgba(253, 135, 135, 0.8)"],
                borderRadius: 5,
              },
              {
                label: "Tổng tiền",
                data: revenueCustomer.map((item) => item.totalPrice),
                backgroundColor: ["#5CBEFF"],
                borderRadius: 5,
              },
            ],
          }}
          options={{
            plugins: {
              title: {
                text: "Doanh thu bán hàng theo khách hàng",
                color: `${theme === "dark" ? "white" : "black"}`,
              },
            },
          }}
        />
      </div>
    </>
  );
};

export default RevenueCustomerChart;
