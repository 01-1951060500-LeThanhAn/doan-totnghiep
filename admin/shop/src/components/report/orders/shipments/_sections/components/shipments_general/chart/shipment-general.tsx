import { useTheme } from "next-themes";
import useGetShipmentByGeneral from "../../../../hooks/use-get-shipments-general";
import { Bar } from "react-chartjs-2";

const ShipmentGeneralChart = () => {
  const { shipmentGeneral } = useGetShipmentByGeneral();
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
            labels: shipmentGeneral.map((data) => data.name),
            datasets: [
              {
                label: "SL hàng sản phẩm có trong đơn ở mỗi chi nhánh",
                data: shipmentGeneral.map((data) => data.totalQuantity),
                backgroundColor: "#82CDFF",
                borderColor: "#82CDFF",
              },
              {
                label: "SL đơn hàng tạo ở chi nhánh",
                data: shipmentGeneral.map((data) => data.totalOrders),
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
                text: "Báo cáo số lượng hàng  được tạo ở mỗi chi nhánh",
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
            labels: shipmentGeneral.map((data) => data.name),
            datasets: [
              {
                label: "Tổng doanh thu tiền hàng  ở mỗi chi nhánh",
                data: shipmentGeneral.map((data) => data.totalPrice),
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
                text: "Báo cáo tổng tiền hàng được tạo ở mỗi chi nhánh",
                color: `${theme === "dark" ? "white" : "black"}`,
              },
            },
          }}
        />
      </div>
    </>
  );
};

export default ShipmentGeneralChart;
