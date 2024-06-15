import { useTheme } from "next-themes";
import { Bar } from "react-chartjs-2";
import useGetRevenueByGeneral from "../../../hooks/use-get-revenue-general";

const RevenueGeneralChart = () => {
  const { theme } = useTheme();
  const { revenueGeneral } = useGetRevenueByGeneral();

  return (
    <>
      <div
        className={`${
          theme === "dark" ? "bg-[#212B36] " : "shadow-lg"
        } rounded-lg p-3 w-full h-[320px]`}
      >
        <Bar
          data={{
            labels: revenueGeneral.map((item) => item.name),
            datasets: [
              {
                label: "Số lượng đơn hàng",
                data: revenueGeneral.map((item) => item.totalOrders),
                backgroundColor: ["rgba(43, 63, 229, 0.8)"],
                borderRadius: 5,
              },
              {
                label: "Số lượng hàng đã thanh toán cho khách",
                data: revenueGeneral.map((item) => item.totalQuantity),
                backgroundColor: ["rgba(250, 192, 19, 0.8)"],
                borderRadius: 5,
              },
            ],
          }}
          options={{
            plugins: {
              title: {
                text: "Doanh thu bán hàng theo chi nhánh",
                color: `${theme === "dark" ? "white" : "black"}`,
              },
            },
          }}
        />
      </div>

      <div
        className={`${
          theme === "dark" ? "bg-[#212B36] " : "shadow-lg"
        } rounded-lg mt-4 p-3 w-full h-[320px]`}
      >
        <Bar
          data={{
            labels: revenueGeneral.map((item) => item.name),
            datasets: [
              {
                label: "Doanh thu",
                data: revenueGeneral.map((item) => item.totalPrice),
                backgroundColor: ["rgba(253, 135, 135, 0.8)"],
                borderRadius: 5,
              },
            ],
          }}
          options={{
            plugins: {
              title: {
                text: "Doanh thu bán hàng theo chi nhánh",
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
