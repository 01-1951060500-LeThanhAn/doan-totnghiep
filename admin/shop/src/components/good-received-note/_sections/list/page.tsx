import { Custombreadcumb } from "@/features/custom-breadcumb";
import Heading from "./heading";
import GoodReceivedNoteTableData from "./card-table";
import useGetGoodReceivedNotes from "../../hooks/use-get-good-received-notes";

const GoodReceivedPage = () => {
  const { goodReceivedNotes } = useGetGoodReceivedNotes();
  const data = goodReceivedNotes.map((goodReceivedNote) => ({
    _id: goodReceivedNote._id,
    code: goodReceivedNote?.code,
    payment_status: goodReceivedNote?.payment_status,
    order_status: goodReceivedNote?.order_status,
    createdAt: goodReceivedNote?.createdAt,
    delivery_date: goodReceivedNote?.delivery_date,
    updatedAt: goodReceivedNote?.updatedAt,
    generalId: goodReceivedNote?.generalId?.name,
    supplierId: goodReceivedNote.supplierId?.supplier_name,
  }));
  return (
    <>
      <Heading />
      <Custombreadcumb
        href2="/dashboard/good-received-note"
        breadcumbItem="Phiếu nhập hàng"
        breadcumbPage="Danh sách phiếu nhập hàng"
        linkBtn="/dashboard/good-received-note/create"
        title="Thêm Phiếu nhập hàng"
      />

      <GoodReceivedNoteTableData data={data} />
    </>
  );
};

export default GoodReceivedPage;
