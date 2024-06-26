import { useTheme } from "next-themes";
import useGetShipmentsByStatus from "../../../../hooks/use-get-shipments-status";
import { Doughnut } from "react-chartjs-2";

const ShipmentStatusChart = () => {
  const { shipmentStatus } = useGetShipmentsByStatus();
  const { theme } = useTheme();

  return (
    <>
      <div
        className={`${
          theme === "dark" ? "bg-[#212B36] " : "shadow-lg"
        } rounded-lg p-3 w-full h-[350px]`}
      >
        <Doughnut
          data={{
            labels: shipmentStatus.map((data) =>
              data.status === "pending"
                ? "Đang giao hàng"
                : data.status === "delivered"
                ? "Đã giao hàng"
                : "Đã hủy"
            ),
            datasets: [
              {
                label: "SL Hàng",
                data: shipmentStatus.map((data) => data.count),
                backgroundColor: [
                  "rgba(250, 192, 19, 0.8)",
                  "rgba(245, 107, 57, 0.8)",
                  "rgba(125, 243, 133, 0.8)",
                ],
                borderColor: [
                  "rgba(250, 192, 19, 0.8)",
                  "rgba(245, 107, 57, 0.8)",
                  "rgba(114, 248, 77, 0.729)",
                ],
              },
            ],
          }}
          options={{
            plugins: {
              title: {
                text: "Báo cáo tình trạng giao hàng",
                color: `${theme === "dark" ? "white" : "black"}`,
              },
            },
          }}
        />
      </div>
    </>
  );
};

export default ShipmentStatusChart;
