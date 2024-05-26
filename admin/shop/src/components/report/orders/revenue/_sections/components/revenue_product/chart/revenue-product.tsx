import { useTheme } from "next-themes";
import useGetRevenueByProduct from "../../../hooks/use-get-revenue-product";
import { Doughnut } from "react-chartjs-2";

const RevenueProductChart = () => {
  const { revenueProduct } = useGetRevenueByProduct();
  const { theme } = useTheme();
  return (
    <>
      <div
        className={`${
          theme === "dark" ? "bg-[#212B36] " : "shadow-lg"
        } rounded-lg p-3`}
      >
        <div className="w-full h-[320px]">
          <Doughnut
            data={{
              labels: revenueProduct.map((data) => data.name_product),
              datasets: [
                {
                  label: "Tổng tiền hàng ",
                  data: revenueProduct.map((data) => data.totalPrice),
                  backgroundColor: [
                    "rgba(43, 63, 229, 0.8)",
                    "rgba(250, 192, 19, 0.8)",
                    "rgba(245, 107, 57, 0.8)",
                  ],
                  borderColor: [
                    "rgba(43, 63, 229, 0.8)",
                    "rgba(250, 192, 19, 0.8)",
                    "rgba(245, 107, 57, 0.8)",
                  ],
                },
                {
                  label: "Tổng SL đơn hàng",
                  data: revenueProduct.map((data) => data.totalOrders),
                  backgroundColor: [
                    "rgba(43, 63, 229, 0.8)",
                    "rgba(250, 192, 19, 0.8)",
                    "rgba(245, 107, 57, 0.8)",
                  ],
                  borderColor: [
                    "rgba(43, 63, 229, 0.8)",
                    "rgba(250, 192, 19, 0.8)",
                    "rgba(245, 107, 57, 0.8)",
                  ],
                },
              ],
            }}
            options={{
              plugins: {
                title: {
                  text: "Doanh thu bán hàng theo sản phẩm",
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

export default RevenueProductChart;
