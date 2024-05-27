import RevenueCustomerChart from "../report/orders/revenue/_sections/components/revenue_customer/chart/revenur-customer";
import RevenueMonthChart from "../report/orders/revenue/_sections/components/revenue_time/chart/revenue-month";
import ShipmentStatusChart from "../report/orders/shipments/_sections/components/shipments_status/chart/shipment-status";
import { defaults } from "chart.js/auto";
import TransactionTableData from "../report/transaction/list/card-table";
import useGetTransactions from "../report/transaction/hooks/use-get-all-transaction";
import { TransactionTableProps } from "@/types/transaction";
defaults.maintainAspectRatio = false;
defaults.responsive = true;

const HomeChart = () => {
  const { transactions } = useGetTransactions();
  const data = transactions.map((transaction) => ({
    transaction_type: transaction?.transaction_type,
    transaction_date: transaction?.transaction_date,
    general: transaction?.orderId?.generalId?.name,
    totalPrice:
      transaction?.warehouseId?.totalPrice || transaction?.orderId?.totalPrice,
    _id: transaction?.orderId?._id || transaction?.warehouseId?._id,
    totalQuantity:
      transaction?.warehouseId?.totalQuantity ||
      transaction?.orderId?.totalQuantity,
    code: transaction?.orderId?.code || transaction?.warehouseId?.code,
    payment_status:
      transaction?.orderId?.payment_status ||
      transaction?.warehouseId?.payment_status,
    order_status:
      transaction?.orderId?.order_status ||
      transaction?.warehouseId?.order_status,
    delivery_date: transaction?.warehouseId?.delivery_date,
    received_date: transaction?.orderId?.received_date,
  }));
  return (
    <>
      <div className="grid lg:grid-cols-3 gap-3">
        <div className="col-span-2">
          <RevenueMonthChart />
        </div>
        <div className="col-span-1">
          <ShipmentStatusChart />
        </div>
      </div>

      <div className="mt-3 mb-16 lg:mb-8">
        <RevenueCustomerChart />
      </div>
      <div className="mb-16 -mt-12 md:-mt-5 lg:mb-8">
        <TransactionTableData data={data as TransactionTableProps[]} />
      </div>
    </>
  );
};

export default HomeChart;
