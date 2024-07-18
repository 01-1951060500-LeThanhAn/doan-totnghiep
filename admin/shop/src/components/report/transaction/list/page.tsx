import { Custombreadcumb } from "@/features/custom-breadcumb";
import Heading from "./heading";
import useGetTransactions from "../hooks/use-get-all-transaction";
import TransactionTableData from "./card-table";
import { TransactionTableProps } from "@/types/transaction";
import * as XLSX from "xlsx";
import HomeLayout from "@/layouts/home-layout";
import { saveAs } from "file-saver";

const ViewReportTransactionPage = () => {
  const { transactions } = useGetTransactions();
  const data = transactions.map((transaction) => ({
    transaction_type: transaction?.transaction_type,
    transaction_date: transaction?.transaction_date,
    general:
      transaction?.orderId?.generalId?.name ||
      transaction?.warehouseId?.generalId?.name,
    totalPrice: transaction?.totalPrice,
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

  const handleExportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(data);

    worksheet["A1"] = { v: "Bảng lịch sử giao dịch", t: "s" };

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Transactions");
    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    const blob = new Blob([excelBuffer], {
      type: "application/octet-stream",
    });

    saveAs(blob, `LS_giao_dich.xlsx`);
    try {
      XLSX.writeFile(workbook, "LS_giao_dich.xlsx");
    } catch (err) {
      console.error("XLSX.writeFile failed:", err);
    }
  };

  return (
    <>
      <Heading />
      <Custombreadcumb
        href2="/dashboard/report"
        breadcumbItem="Giao dịch"
        breadcumbPage="Lịch sử giao dịch"
        file="Xuất file báo cáo"
        onClick={handleExportToExcel}
      />
      <HomeLayout className="mt-4">
        <TransactionTableData data={data as TransactionTableProps[]} />
      </HomeLayout>
    </>
  );
};

export default ViewReportTransactionPage;
