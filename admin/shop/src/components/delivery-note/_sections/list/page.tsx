import { Custombreadcumb } from "@/features/custom-breadcumb";
import Heading from "./heading";
import useGetDeliveryNote from "../../hooks/use-get-delivery-note";
import DeliveryNoteTableData from "./card-table";
import { DeliveryNoteDataTableProps } from "@/types/delivery_note";

const DeliveryNotePage = () => {
  const { deliveryNotes } = useGetDeliveryNote();
  const data = deliveryNotes.map((item) => ({
    _id: item._id,
    code: item?.code,
    status: item?.status,
    fromGeneralId: item?.fromGeneralId?.name,
    toGeneralId: item?.toGeneralId?.name,
    deliveryDate: item?.deliveryDate,
    transferDate: item?.transferDate,
    totalPrice: item?.totalPrice,
  }));

  return (
    <>
      <Heading />
      <Custombreadcumb
        href2="/dashboard/delivery-note"
        breadcumbItem="Phiếu chuyển hàng"
        breadcumbPage="Danh sách phiếu chuyển hàng"
        linkBtn="/dashboard/delivery-note/create"
        title="Tạo Phiếu chuyển hàng"
      />
      <DeliveryNoteTableData
        data={data as unknown as DeliveryNoteDataTableProps[]}
      />
    </>
  );
};

export default DeliveryNotePage;
