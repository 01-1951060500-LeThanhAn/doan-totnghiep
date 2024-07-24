import { Custombreadcumb } from "@/features/custom-breadcumb";
import Heading from "./heading";
import useGetSuppliersReceipts from "../../hooks/use-get-receipt-suppliers";
import ReceiptSupplierTableData from "./card-table";
import { ReceiptSupplierTableProps } from "@/types/receipt_supplier";

const ReceiptSupplierPage = () => {
  const { receipts } = useGetSuppliersReceipts();
  const data = receipts.map((receipt) => ({
    _id: receipt?._id,
    code: receipt?.code,
    payment_status: receipt?.payment_status,
    submitter: receipt?.submitter,

    customer: receipt?.supplierId?.supplier_name,
    staff: receipt?.staffId?.username,
    total: receipt?.total,
    desc: receipt?.desc,
    receipt_type: receipt?.receipt_type,
  }));

  return (
    <>
      <Heading />
      <Custombreadcumb
        href2="/dashboard/receipt_vouchers/suppliers"
        breadcumbItem="Phiếu thu công nợ nhà cung cấp"
        breadcumbPage="Danh sách phiếu thu"
        linkBtn="/dashboard/receipt_vouchers/suppliers/create"
        title="Tạo phiếu thu"
      />
      <ReceiptSupplierTableData data={data as ReceiptSupplierTableProps[]} />
    </>
  );
};

export default ReceiptSupplierPage;
