import { useTheme } from "next-themes";
import { Bar, Line } from "react-chartjs-2";
import useGetWarehouseByTime from "../../../hooks/use-get-warehouse-time";

const RevenueTimeChart = () => {
  const { theme } = useTheme();
  const { revenueTime } = useGetWarehouseByTime();
  return (
    <>
      <div
        className={`${
          theme === "dark" ? "bg-[#212B36] " : "shadow-lg"
        } rounded-lg p-3 w-full h-[350px]`}
      >
        <Bar
          data={{
            labels: revenueTime.map((data) => data._id),
            datasets: [
              {
                label: "SL Đơn hàng",
                data: revenueTime.map((data) => data.totalOrders),
                backgroundColor: "#FFA0B4",
                borderColor: "#FF6384",
              },
              {
                label: "SL hàng",
                data: revenueTime.map((data) => data.totalQuantity),
                backgroundColor: "#efba5f",
                borderColor: "#f3b116",
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
                text: "Tổng hợp SL hàng và đơn hàng nhập về kho tháng ",
                color: `${theme === "dark" ? "white" : "black"}`,
              },
            },
          }}
        />
      </div>
      <div
        className={`${
          theme === "dark" ? "bg-[#212B36] " : "shadow-lg"
        } rounded-lg p-3 mt-4 mb-16 w-full h-[350px]`}
      >
        <Line
          data={{
            labels: revenueTime.map((data) => data._id),
            datasets: [
              {
                label: "Doanh thu nhập hàng theo tháng",
                data: revenueTime.map((data) => data.totalPrice),
                backgroundColor: "#FFA0B4",
                borderColor: "#FF6384",
                pointStyle: "circle",
                pointRadius: 10,
                pointHoverRadius: 15,
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
                text: "Tổng doanh thu hàng nhập về kho theo tháng ",
                color: `${theme === "dark" ? "white" : "black"}`,
              },
            },
          }}
        />
      </div>
    </>
  );
};

export default RevenueTimeChart;
