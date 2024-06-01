import { useTheme } from "next-themes";
import useGetPurchaseOrderByTime from "../../../hooks/use-get-purchase-order-time";
import { Line } from "react-chartjs-2";

const PurchaseOrderTimeChart = () => {
  const { theme } = useTheme();
  const { purchaseOrderTime } = useGetPurchaseOrderByTime();
  return (
    <>
      <div
        className={`${
          theme === "dark" ? "bg-[#212B36] " : "shadow-lg"
        } rounded-lg p-3 mt-4 w-full h-[350px]`}
      >
        <Line
          data={{
            labels: purchaseOrderTime.map((data) => data._id),
            datasets: [
              {
                label: "Doanh thu đặt hàng ",
                data: purchaseOrderTime.map((data) => data.totalPrice),
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
                text: "Tổng doanh thu đặt hàng theo tháng ",
                color: `${theme === "dark" ? "white" : "black"}`,
              },
            },
          }}
        />
      </div>
    </>
  );
};

export default PurchaseOrderTimeChart;
