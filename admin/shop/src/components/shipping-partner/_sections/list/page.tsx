import { Custombreadcumb } from "@/features/custom-breadcumb";
import Heading from "./heading";
import useGetPartners from "../../hooks/use-get-partners";
import PartnerTableData from "./card-table";

const PartnerPage = () => {
  const { partners } = useGetPartners();
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

      <PartnerTableData data={partners} />
    </>
  );
};

export default PartnerPage;
