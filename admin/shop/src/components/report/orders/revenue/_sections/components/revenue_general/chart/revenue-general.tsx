import useGetOrders from "@/components/order/hooks/use-get-orders";
import { useTheme } from "next-themes";
import { Bar } from "react-chartjs-2";

const RevenueGeneralChart = () => {
  const { orders } = useGetOrders();
  const { theme } = useTheme();
  const totalOrders = orders.reduce(
    (totalOrders, order) => totalOrders + order.totalCustomerPay,
    0
  );
  const data = [
    {
      label: "Kho chính",
      totalOrders: totalOrders,
    },
  ];
  return (
    <>
      <div
        className={`${
          theme === "dark" ? "bg-[#212B36] " : "shadow-lg"
        } rounded-lg p-3 w-full h-[320px]`}
      >
        <Bar
          data={{
            labels: data.map((item) => item.label),
            datasets: [
              {
                label: "Doanh thu",
                data: data.map((item) => item.totalOrders),
                backgroundColor: ["rgba(253, 135, 135, 0.8)"],
                borderRadius: 5,
              },
            ],
          }}
          options={{
            plugins: {
              title: {
                text: "Doanh thu bán hàng theo chi nhánh",
                color: `${theme === "dark" ? "white" : "black"}`,
              },
            },
          }}
        />
      </div>
    </>
  );
};

export default RevenueGeneralChart;
