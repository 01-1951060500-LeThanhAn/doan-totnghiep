import { DetailPartnerData } from "@/types/partner";
import DetailPartnerInformation from "./components/information/detail-partner-information";
import HomeLayout from "@/layouts/home-layout";
import DetailPartnerTableData from "./components/table/detail-partner-table";

type Props = {
  data: DetailPartnerData;
};

const DetailShippingPartnerView = ({ data }: Props) => {
  return (
    <>
      <HomeLayout>
        <DetailPartnerInformation data={data?.results} />
        <DetailPartnerTableData data={data?.partner} />
      </HomeLayout>
    </>
  );
};

export default DetailShippingPartnerView;
