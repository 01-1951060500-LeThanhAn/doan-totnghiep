import { useTheme } from "next-themes";
import useGetWarehouseBySuppliers from "../../../hooks/use-get-warehouse-supplier";
import { Bar } from "react-chartjs-2";

const RevenueSupplierChart = () => {
  const { revenueSuppliers } = useGetWarehouseBySuppliers();
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
            labels: revenueSuppliers.map((item) => item.name),
            datasets: [
              {
                label: "SL đơn hàng nhập",
                data: revenueSuppliers.map((item) => item.totalOrders),
                backgroundColor: ["rgba(253, 135, 135, 0.8)"],
                borderRadius: 5,
              },
              {
                label: "Số lượng hàng nhập",
                data: revenueSuppliers.map((item) => item.totalQuantity),
                backgroundColor: ["rgba(250, 192, 19, 0.8)"],
                borderRadius: 5,
              },
            ],
          }}
          options={{
            plugins: {
              title: {
                text: "SL hàng nhập theo nhà cung cấp",
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
            labels: revenueSuppliers.map((item) => item.name),
            datasets: [
              {
                label: "Tổng tiền hàng nhập của nhà cung cấp",
                data: revenueSuppliers.map((item) => item.totalPrice),
                backgroundColor: ["rgba(253, 135, 135, 0.8)"],
                borderRadius: 5,
              },
            ],
          }}
          options={{
            plugins: {
              title: {
                text: "Tổng tiền hàng nhập theo nhà cung cấp",
                color: `${theme === "dark" ? "white" : "black"}`,
              },
            },
          }}
        />
      </div>
    </>
  );
};

export default RevenueSupplierChart;
