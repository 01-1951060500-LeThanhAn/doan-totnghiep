import { useTheme } from "next-themes";
import useGetPurchaseOrderByProduct from "../../../hooks/use-get-purchase-order-product";
import { Bar } from "react-chartjs-2";

const PurchaseOrderProductChart = () => {
  const { purchaseOrderProduct } = useGetPurchaseOrderByProduct();
  const { theme } = useTheme();
  return (
    <>
      <div
        className={`${
          theme === "dark" ? "bg-[#212B36] " : "shadow-lg"
        } rounded-lg p-3 mt-4 w-full h-[350px]`}
      >
        <Bar
          data={{
            labels: purchaseOrderProduct.map((data) => data.productCode),
            datasets: [
              {
                label: "Doanh thu đặt hàng theo sản phẩm",
                data: purchaseOrderProduct.map(
                  (data) => data.totalQuantity * data.price
                ),
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
                text: "Báo cáo đặt hàng theo sản phẩm",
                color: `${theme === "dark" ? "white" : "black"}`,
              },
            },
          }}
        />
      </div>
    </>
  );
};

export default PurchaseOrderProductChart;
