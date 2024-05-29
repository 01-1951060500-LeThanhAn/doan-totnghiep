import { useTheme } from "next-themes";
import useGetWarehouseByGeneral from "../../../hooks/use-get-warehouse-general";
import { Bar } from "react-chartjs-2";

const RevenueGeneralChart = () => {
  const { theme } = useTheme();
  const { revenueGeneral } = useGetWarehouseByGeneral();

  return (
    <>
      <div
        className={`${
          theme === "dark" ? "bg-[#212B36] " : "shadow-lg"
        } rounded-lg p-3 w-full h-[320px]`}
      >
        <Bar
          data={{
            labels: revenueGeneral.map((item) => item.code),
            datasets: [
              {
                label: "SL đơn hàng nhập",
                data: revenueGeneral.map((item) => item.totalOrders),
                backgroundColor: ["rgba(253, 135, 135, 0.8)"],
                borderRadius: 5,
              },
              {
                label: "SL hàng nhập",
                data: revenueGeneral.map((item) => item.totalQuantity),
                backgroundColor: ["rgba(247, 202, 66, 0.8)"],
                borderRadius: 5,
              },
            ],
          }}
          options={{
            plugins: {
              title: {
                text: "SL hàng nhập theo chi nhánh",
                color: `${theme === "dark" ? "white" : "black"}`,
              },
            },
          }}
        />
      </div>
      <div
        className={`${
          theme === "dark" ? "bg-[#212B36] " : "shadow-lg"
        } rounded-lg p-3 mt-4 w-full h-[320px]`}
      >
        <Bar
          data={{
            labels: revenueGeneral.map((item) => item.code),
            datasets: [
              {
                label: "Tổng tiền hàng nhập theo chi nhánh",
                data: revenueGeneral.map((item) => item.totalPrice),
                backgroundColor: ["rgba(253, 135, 135, 0.8)"],
                borderRadius: 5,
              },
            ],
          }}
          options={{
            plugins: {
              title: {
                text: "Tổng  tiền hàng nhập theo chi nhánh",
                color: `${theme === "dark" ? "white" : "black"}`,
              },
            },
          }}
        />
      </div>
    </>
  );
};

export default RevenueGeneralChart;
