import { useTheme } from "next-themes";
import useGetWarehouseByProducts from "../../../hooks/use-get-warehouse-product";
import { Bar } from "react-chartjs-2";

const RevenueProductChart = () => {
  const { theme } = useTheme();
  const { revenueProducts } = useGetWarehouseByProducts();
  return (
    <>
      <div
        className={`${
          theme === "dark" ? "bg-[#212B36] " : "shadow-lg"
        } rounded-lg p-3 w-full h-[320px]`}
      >
        <Bar
          data={{
            labels: revenueProducts.map((item) => item.code),
            datasets: [
              {
                label: "SL đơn hàng nhập chứa sản phẩm",
                data: revenueProducts.map((item) => item.totalOrders),
                backgroundColor: ["rgba(253, 135, 135, 0.8)"],
                borderRadius: 5,
              },
            ],
          }}
          options={{
            plugins: {
              title: {
                text: "SL hàng nhập theo sản phẩm",
                color: `${theme === "dark" ? "white" : "black"}`,
              },
            },
          }}
        />
      </div>
    </>
  );
};

export default RevenueProductChart;
