import { useTheme } from "next-themes";
import useGetRevenueByCustomerGroup from "../../../hooks/use-get-revenue-customer-group";
import { Bar } from "react-chartjs-2";

const RevenueCustomerGroupChart = () => {
  const { revenueCustomerGroup } = useGetRevenueByCustomerGroup();
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
            labels: revenueCustomerGroup.map((item) => item._id),
            datasets: [
              {
                label: "Tổng tiền hàng",
                data: revenueCustomerGroup.map((item) => item.totalPrice),
                backgroundColor: ["rgba(253, 135, 135, 0.8)"],
                borderRadius: 5,
              },
              {
                label: "Số lượng hàng đã bán ra",
                data: revenueCustomerGroup.map((item) => item.totalQuantity),
                backgroundColor: ["rgba(250, 192, 19, 0.8)"],
                borderRadius: 5,
              },
              {
                label: "Số lượng đơn hàng ",
                data: revenueCustomerGroup.map((item) => item.totalOrders),
                backgroundColor: ["rgba(43, 63, 229, 0.8)"],
                borderRadius: 5,
              },
            ],
          }}
          options={{
            plugins: {
              title: {
                text: "Doanh thu bán hàng theo nhóm khách hàng",
                color: `${theme === "dark" ? "white" : "black"}`,
              },
            },
          }}
        />
      </div>
    </>
  );
};

export default RevenueCustomerGroupChart;
