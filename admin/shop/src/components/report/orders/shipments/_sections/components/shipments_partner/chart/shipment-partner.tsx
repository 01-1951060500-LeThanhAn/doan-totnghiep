import { useTheme } from "next-themes";
import useGetShipmentByPartner from "../../../../hooks/use-get-shipments-partner";
import { Bar } from "react-chartjs-2";

const ShipmentPartnerChart = () => {
  const { shipmentPartner } = useGetShipmentByPartner();
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
            labels: shipmentPartner.map((data) => data.username),
            datasets: [
              {
                label: "SL hàng đã vận chuyển",
                data: shipmentPartner.map((data) => data.totalQuantity),
                backgroundColor: "#82CDFF",
                borderColor: "#82CDFF",
              },
              {
                label: "SL đơn hàng",
                data: shipmentPartner.map((data) => data.totalOrders),
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
                text: "Báo cáo số lượng hàng vận chuyển của đối tác",
                color: `${theme === "dark" ? "white" : "black"}`,
              },
            },
          }}
        />
      </div>
      <div
        className={`${
          theme === "dark" ? "bg-[#212B36] " : "shadow-lg"
        } rounded-lg p-3 w-full my-4 h-[320px]`}
      >
        <Bar
          data={{
            labels: shipmentPartner.map((data) => data.username),
            datasets: [
              {
                label: "SL tiền hàng đã vận chuyển",
                data: shipmentPartner.map((data) => data.totalPrice),
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
                text: "Báo cáo số tiền hàng vận chuyển của đối tác",
                color: `${theme === "dark" ? "white" : "black"}`,
              },
            },
          }}
        />
      </div>
    </>
  );
};

export default ShipmentPartnerChart;
