import { useTheme } from "next-themes";
import useGetWarehouseByMethod from "../../../hooks/use-get-warehouse-method";
import { Bar } from "react-chartjs-2";

const ShipmentMethodChart = () => {
  const { theme } = useTheme();
  const { revenueMethod } = useGetWarehouseByMethod();
  return (
    <>
      <div
        className={`${
          theme === "dark" ? "bg-[#212B36] " : "shadow-lg"
        } rounded-lg p-3 w-full h-[350px]`}
      >
        <Bar
          data={{
            labels: revenueMethod.map((data) => data.username),
            datasets: [
              {
                label: "Tiền mặt",
                data: revenueMethod.map(
                  (data) => data.totalPriceDeliveredOffline
                ),
                backgroundColor: "#FFA0B4",
                borderColor: "#FF6384",
              },
              {
                label: "Chuyển khoản",
                data: revenueMethod.map(
                  (data) => data.totalPriceDeliveredOnline
                ),
                backgroundColor: "#73b0f6",
                borderColor: "#2886e4",
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
                text: "Báo cáo tiền thanh toán nhập hàng theo phương thức thanh toán",
                color: `${theme === "dark" ? "white" : "black"}`,
              },
            },
          }}
        />
      </div>
    </>
  );
};

export default ShipmentMethodChart;
