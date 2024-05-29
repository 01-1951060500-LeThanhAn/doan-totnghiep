import { useTheme } from "next-themes";
import useGetWarehouseByStaff from "../../../hooks/use-get-warehouse-staff";
import { Bar } from "react-chartjs-2";

const RevenueStaffChart = () => {
  const { theme } = useTheme();
  const { revenueStaff } = useGetWarehouseByStaff();
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
                label: "SL đơn hàng nhập",
                data: revenueStaff.map((item) => item.totalOrders),
                backgroundColor: ["rgba(253, 135, 135, 0.8)"],
                borderRadius: 5,
              },
              {
                label: "Số lượng hàng nhập",
                data: revenueStaff.map((item) => item.totalQuantity),
                backgroundColor: ["rgba(250, 192, 19, 0.8)"],
                borderRadius: 5,
              },
            ],
          }}
          options={{
            plugins: {
              title: {
                text: "SL hàng nhập theo nhân viên",
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
            labels: revenueStaff.map((item) => item.username),
            datasets: [
              {
                label: "Doanh thu nhập hàng",
                data: revenueStaff.map((item) => item.totalPrice),
                backgroundColor: ["rgba(250, 192, 19, 0.8)"],
                borderRadius: 5,
              },
            ],
          }}
          options={{
            plugins: {
              title: {
                text: "Doanh thu nhập hàng  theo nhân viên",
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
