import { Custombreadcumb } from "@/features/custom-breadcumb";
import Heading from "./heading";
import useGetReceipts from "../../hooks/use-get-receipts";
import { ReceiptCustomerTableProps } from "@/types/receipt";
import ReceiptCustomerTableData from "./card-table";

const ReceiptPage = () => {
  const { receipts } = useGetReceipts();
  const data = receipts.map((receipt) => ({
    _id: receipt?._id,
    code: receipt?.code,
    payment_status: receipt?.payment_status,
    submitter: receipt?.submitter,
    order_code: receipt?.products[0]?.orderId?.code,
    order_id: receipt?.products[0]?.orderId?._id,
    customer: receipt?.customerId?.username,
    staff: receipt?.staffId?.username,
    total: receipt?.total,
    desc: receipt?.desc,
    receipt_type: receipt?.receipt_type,
  }));
  return (
    <>
      <Heading />
      <Custombreadcumb
        href2="/dashboard/receipt_vouchers/customers"
        breadcumbItem="Phiếu thu công nợ khách hàng"
        breadcumbPage="Danh sách phiếu thu"
        linkBtn="/dashboard/receipt_vouchers/customers/create"
        title="Tạo phiếu thu"
      />

      <ReceiptCustomerTableData data={data as ReceiptCustomerTableProps[]} />
    </>
  );
};

export default ReceiptPage;
