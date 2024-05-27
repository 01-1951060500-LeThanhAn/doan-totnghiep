import useGetRevenueByCustomer from "@/components/report/orders/revenue/_sections/hooks/use-get-revenue-customer";
import { useTheme } from "next-themes";
import { Bar } from "react-chartjs-2";

const ShipmentCustomerChart = () => {
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
            labels: revenueCustomer.map((data) => data.name),
            datasets: [
              {
                label: "SL hàng giao của khách hàng",
                data: revenueCustomer.map((data) => data.total_quantity),
                backgroundColor: "#82CDFF",
                borderColor: "#82CDFF",
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
                text: "Báo cáo số lượng hàng được giao của khách hàng",
                color: `${theme === "dark" ? "white" : "black"}`,
              },
            },
          }}
        />
      </div>
    </>
  );
};

export default ShipmentCustomerChart;
