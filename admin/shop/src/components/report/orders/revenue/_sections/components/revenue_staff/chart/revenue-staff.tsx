import { useTheme } from "next-themes";
import useGetRevenueByStaff from "../../../hooks/use-get-revenue-staff";
import { Bar } from "react-chartjs-2";
const RevenueStaffChart = () => {
  const { revenueStaff } = useGetRevenueByStaff();
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
            labels: revenueStaff.map((item) => item.username),
            datasets: [
              {
                label: "Doanh thu",
                data: revenueStaff.map((item) => item.total_price),
                backgroundColor: ["rgba(253, 135, 135, 0.8)"],
                borderRadius: 5,
              },
              {
                label: "Số lượng hàng đã thanh toán cho khách",
                data: revenueStaff.map((item) => item.total_quantity),
                backgroundColor: ["rgba(250, 192, 19, 0.8)"],
                borderRadius: 5,
              },
            ],
          }}
          options={{
            plugins: {
              title: {
                text: "Doanh thu bán hàng theo nhân viên",
                color: `${theme === "dark" ? "white" : "black"}`,
              },
            },
          }}
        />
      </div>
    </>
  );
};

export default RevenueStaffChart;
