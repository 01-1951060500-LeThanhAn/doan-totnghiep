import { useTheme } from "next-themes";
import useGetPaymentByTime from "../../../../hooks/use-get-payment-time";
import { Bar, Line } from "react-chartjs-2";

export type DataItem = {
  _id: string;
  month: number;
  date: string;
  totalPrice: number;
  totalOrders: number;
};

const PaymentTimeChart = () => {
  const { paymentTimes } = useGetPaymentByTime();
  const { theme } = useTheme();

  const groupedData: { [date: string]: DataItem } = {};

  paymentTimes.forEach((item) => {
    const key = item.date;
    if (!groupedData[key]) {
      groupedData[key] = {
        _id: "",
        month: 0,
        date: item.date,
        totalPrice: item.totalPrice,
        totalOrders: item.totalOrders,
      };
    } else {
      groupedData[key].totalPrice += item.totalPrice;
      groupedData[key].totalOrders += item.totalOrders;
    }
  });

  const data = Object.values(groupedData) as DataItem[];

  return (
    <>
      <div
        className={`${
          theme === "dark" ? "bg-[#212B36] " : "shadow-lg"
        } rounded-lg p-3 w-full h-[350px]`}
      >
        <Line
          data={{
            labels: paymentTimes.map((data) => data._id),
            datasets: [
              {
                label: "SL đơn hàng thanh toán",
                data: paymentTimes.map((data) => data.totalOrders),
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
                text: "Báo cáo SL đơn hàng thanh toán theo ngày",
                color: `${theme === "dark" ? "white" : "black"}`,
              },
            },
          }}
        />
      </div>
      <div
        className={`${
          theme === "dark" ? "bg-[#212B36] " : "shadow-lg"
        } rounded-lg p-3 mt-4 mb-4 w-full h-[350px]`}
      >
        <Line
          data={{
            labels: data.map((data) => data.date),
            datasets: [
              {
                label: "SL đơn hàng thanh toán",
                data: data.map((item) => item.totalOrders),
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
                text: "Báo cáo SL đơn hàng thanh toán theo tháng",
                color: `${theme === "dark" ? "white" : "black"}`,
              },
            },
          }}
        />
      </div>

      <div
        className={`${
          theme === "dark" ? "bg-[#212B36] " : "shadow-lg"
        } rounded-lg p-3  mb-8 w-full h-[350px]`}
      >
        <Bar
          data={{
            labels: data.map((data) => data.date),
            datasets: [
              {
                label: "SL tiền hàng thanh toán",
                data: data.map((item) => item.totalPrice),
                backgroundColor: "#FFA0B4",
                borderColor: "#FF6384",
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
                text: "Báo cáo doanh thu tiền hàng thanh toán theo tháng",
                color: `${theme === "dark" ? "white" : "black"}`,
              },
            },
          }}
        />
      </div>
    </>
  );
};

export default PaymentTimeChart;
