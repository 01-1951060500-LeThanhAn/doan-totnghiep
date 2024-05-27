import { useTheme } from "next-themes";
import { Line } from "react-chartjs-2";
import { defaults } from "chart.js/auto";
import { useEffect, useState } from "react";
import { ReportOrderMonth } from "@/types/report";
import { getOrderRevenueByMonth } from "@/api/reportApi";
import { useMonths } from "@/hooks/use-month";

defaults.maintainAspectRatio = false;
defaults.responsive = true;

defaults.plugins.title.display = true;
defaults.plugins.title.align = "start";
defaults.plugins.title.color = "black";

const RevenueMonthChart = () => {
  const { theme } = useTheme();
  const { months } = useMonths();
  const [revenueMonth, setRevenueMonth] = useState<ReportOrderMonth[]>([]);
  useEffect(() => {
    try {
      const getRevenueMonth = async () => {
        const response = await getOrderRevenueByMonth();
        response.incomeData.map((item) =>
          setRevenueMonth((prev) => {
            return [
              ...prev,
              {
                month: [item._id],
                total_income: item.total_income,
              },
            ] as ReportOrderMonth[];
          })
        );
      };

      getRevenueMonth();
    } catch (error) {
      console.log(error);
    }
  }, [months]);
  return (
    <>
      <div
        className={`${
          theme === "dark" ? "bg-[#212B36] " : "shadow-lg"
        } rounded-lg p-3`}
      >
        <div
          className={` ${
            theme === "dark" ? "bg-[#212B36]" : "bg-white"
          } w-full h-[320px]`}
        >
          <Line
            data={{
              labels: revenueMonth.map((data) => data.month),
              datasets: [
                {
                  label: "Doanh thu",
                  data: revenueMonth.map((data) => data.total_income),
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
                  text: "Tổng doanh thu tháng bán hàng của công ty",
                  color: `${theme === "dark" ? "white" : "black"}`,
                },
              },
            }}
          />
        </div>
      </div>
    </>
  );
};

export default RevenueMonthChart;
