import { useTheme } from "next-themes";
import useGetShipmentsByTime from "../../../../hooks/use-get-shipments-time";
import { Bar, Line } from "react-chartjs-2";

const ShipmentTimeChart = () => {
  const { shipmentTimes } = useGetShipmentsByTime();
  const { theme } = useTheme();
  return (
    <>
      <div
        className={`${
          theme === "dark" ? "bg-[#212B36] " : "shadow-lg"
        } rounded-lg p-3 w-full h-[350px]`}
      >
        <Line
          data={{
            labels: shipmentTimes.map((data) => data._id),
            datasets: [
              {
                label: "SL Đơn hàng",
                data: shipmentTimes.map((data) => data.totalOrders),
                backgroundColor: "#174fea",
                borderColor: "#ec3737",
              },
              {
                label: "SL hàng bán ra",
                data: shipmentTimes.map((data) => data.totalQuantity),
                backgroundColor: "rgba(250, 192, 19, 0.8)",
                borderColor: "rgba(253, 135, 135, 0.8)",
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
                text: "Báo cáo thông tin giao hàng theo tháng",
                color: `${theme === "dark" ? "white" : "black"}`,
              },
            },
          }}
        />
      </div>
      <div
        className={`${
          theme === "dark" ? "bg-[#212B36] " : "shadow-lg"
        } rounded-lg p-3 w-full h-[350px] mt-4 lg:mb-8 mb-14`}
      >
        <Bar
          data={{
            labels: shipmentTimes.map((data) => data._id),
            datasets: [
              {
                label: "Tổng tiền hàng",
                data: shipmentTimes.map((data) => data.totalPrice),
                backgroundColor: "#174fea",
                borderColor: "rgba(253, 135, 135, 0.8)",
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
                text: "Báo cáo tổng tiền hàng theo tháng",
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
