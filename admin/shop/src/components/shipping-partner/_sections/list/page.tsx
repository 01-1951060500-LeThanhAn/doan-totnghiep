import { Custombreadcumb } from "@/features/custom-breadcumb";
import Heading from "./heading";
import useGetPartners from "../../hooks/use-get-partners";
import PartnerTableData from "./card-table";
import { useAppDispatch } from "@/hooks/hooks";
import { toast } from "sonner";
import { updatePartnerAsync } from "@/redux/slices/partnerSlice";
import useRefreshTable from "@/hooks/use-refresh-table";

const PartnerPage = () => {
  const { partners } = useGetPartners();
  const dispatch = useAppDispatch();
  const { refreshTable } = useRefreshTable(partners);

  const handleDisconnectPartner = async (id: string) => {
    try {
      await dispatch(
        updatePartnerAsync({ shipId: id, data: { status: "passive" } })
      );
      await refreshTable();
      return toast.success("Đã ngừng kết nối");
    } catch (error) {
      console.error(error);
      toast.error("Có lỗi xảy ra, vui lòng thử lại sau");
    }
  };

  const handleConnectPartner = async (id: string) => {
    try {
      await dispatch(
        updatePartnerAsync({ shipId: id, data: { status: "active" } })
      );
      await refreshTable();
      return toast.success("Đã kết nối");
    } catch (error) {
      console.error(error);
      toast.error("Có lỗi xảy ra, vui lòng thử lại sau");
    }
  };

  return (
    <>
      <Heading />
      <Custombreadcumb
        href2="/dashboard/shipping-partner"
        breadcumbItem="Đối tác vận chuyển"
        breadcumbPage="Danh sách đối tác vận chuyển"
        linkBtn="/dashboard/shipping-partner/create"
        title="Thêm đối tác vận chuyển"
      />

      <PartnerTableData
        data={partners}
        onDisconnect={handleDisconnectPartner}
        onConnect={handleConnectPartner}
      />
    </>
  );
};

export default PartnerPage;
