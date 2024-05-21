import { Custombreadcumb } from "@/features/custom-breadcumb";
import Heading from "./heading";
import GoodReceivedNoteTableData from "./card-table";
import useGetGoodReceivedNotes from "../../hooks/use-get-good-received-notes";
import useGetStatusGoodReceivedNoteOrders from "../../hooks/use-get-status-good-received-notes";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const GoodReceivedPage = () => {
  const { goodReceivedNotes } = useGetGoodReceivedNotes();
  const { warehouseOrders } = useGetStatusGoodReceivedNoteOrders();

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

  const status = warehouseOrders.map((goodReceivedNote) => ({
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
        title="Tạo phiếu nhập hàng"
      />

      <Tabs defaultValue="all">
        <TabsList className="mx-6 mt-4">
          <TabsTrigger value="all">
            <p>Tất cả đơn nhập hàng</p>
          </TabsTrigger>
          <TabsTrigger value="pending">
            <p>Đang giao dịch</p>
          </TabsTrigger>
        </TabsList>
        <TabsContent value="all">
          <GoodReceivedNoteTableData data={data} />{" "}
        </TabsContent>
        <TabsContent value="pending">
          <GoodReceivedNoteTableData data={status} />
        </TabsContent>
      </Tabs>
    </>
  );
};

export default GoodReceivedPage;
