import { useTheme } from "next-themes";
import useGetPurchaseOrderBySupplier from "../../../hooks/use-get-purchase-order-supplier";
import { Bar } from "react-chartjs-2";

const PurchaseOrderSupplierChart = () => {
  const { theme } = useTheme();
  const { purchaseOrderSupplier } = useGetPurchaseOrderBySupplier();
  return (
    <>
      <div
        className={`${
          theme === "dark" ? "bg-[#212B36] " : "shadow-lg"
        } rounded-lg p-3  w-full h-[350px]`}
      >
        <Bar
          data={{
            labels: purchaseOrderSupplier.map((data) => data.code),
            datasets: [
              {
                label: "Số lượng đơn đặt hàng theo nhà cung cấp",
                data: purchaseOrderSupplier.map((data) => data.totalOrders),
                backgroundColor: "rgba(43, 63, 229, 0.8)",
              },
              {
                label: "Số lượng sản phẩm đặt hàng theo nhà cung cấp",
                data: purchaseOrderSupplier.map((data) => data.totalQuantity),
                backgroundColor: "rgba(250, 192, 19, 0.8)",
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
                text: "Tổng doanh thu đặt hàng theo nhà cung cấp ",
                color: `${theme === "dark" ? "white" : "black"}`,
              },
            },
          }}
        />
      </div>

      <div
        className={`${
          theme === "dark" ? "bg-[#212B36] " : "shadow-lg"
        } rounded-lg p-3 mt-4 w-full h-[350px]`}
      >
        <Bar
          data={{
            labels: purchaseOrderSupplier.map((data) => data.code),
            datasets: [
              {
                label: "Doanh thu đặt hàng theo nhà cung cấp",
                data: purchaseOrderSupplier.map((data) => data.totalPrice),
                backgroundColor: "#FFA0B4",
                borderColor: "#FF6384",
                pointStyle: "circle",
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
                text: "Tổng doanh thu đặt hàng theo nhà cung cấp ",
                color: `${theme === "dark" ? "white" : "black"}`,
              },
            },
          }}
        />
      </div>
    </>
  );
};

export default PurchaseOrderSupplierChart;
