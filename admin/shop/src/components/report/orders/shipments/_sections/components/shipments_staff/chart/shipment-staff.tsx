import { useTheme } from "next-themes";
import useGetShipmentByStaff from "../../../../hooks/use-get-shipments-staff";
import { Bar } from "react-chartjs-2";

const ShipmentStaffChart = () => {
  const { shipmentStaff } = useGetShipmentByStaff();
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
            labels: shipmentStaff.map((data) => data.username),
            datasets: [
              {
                label: "SL hàng đã giao",
                data: shipmentStaff.map((data) => data.totalDeliveredOrders),
                backgroundColor: "#82CDFF",
                borderColor: "#82CDFF",
              },
              {
                label: "SL hàng chưa giao",
                data: shipmentStaff.map((data) => data.totalPendingOrders),
                backgroundColor: "#FF6D8C",
                borderColor: "#FF3030",
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
                text: "Báo cáo số lượng hàng giao của nhân viên",
                color: `${theme === "dark" ? "white" : "black"}`,
              },
            },
          }}
        />
      </div>
      <div
        className={`${
          theme === "dark" ? "bg-[#212B36] " : "shadow-lg"
        } rounded-lg p-3 my-4 w-full h-[320px]`}
      >
        <Bar
          data={{
            labels: shipmentStaff.map((data) => data.username),
            datasets: [
              {
                label: "Tiền hàng đã giao",
                data: shipmentStaff.map((data) => data.totalPriceDelivered),
                backgroundColor: "#82CDFF",
                borderColor: "#36A2EB",
              },
              {
                label: "Tiền hàng chưa giao",
                data: shipmentStaff.map((data) => data.totalPricePending),
                backgroundColor: "#FF6D8C",
                borderColor: "#FF6D8C",
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
                text: "Báo cáo số tiền hàng chưa giao và đã giao của nhân viên",
                color: `${theme === "dark" ? "white" : "black"}`,
              },
            },
          }}
        />
      </div>
    </>
  );
};

export default ShipmentStaffChart;
