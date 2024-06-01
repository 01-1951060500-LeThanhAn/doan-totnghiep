import { useTheme } from "next-themes";
import useGetWarehouseByTime from "../../../hooks/use-get-warehouse-time";
import { Line } from "react-chartjs-2";

const ShipmentTimeChart = () => {
  const { theme } = useTheme();
  const { revenueTime } = useGetWarehouseByTime();
  return (
    <>
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
                label: "Doanh thu thanh toán nhập hàng ",
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

export default ShipmentTimeChart;
