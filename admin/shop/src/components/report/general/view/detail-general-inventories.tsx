import { Custombreadcumb } from "@/features/custom-breadcumb";
import Header from "../../header";
import useGetDetailGeneral from "@/components/management/general/hooks/use-get-detail-general";
import DetailReportGeneralTableData from "./components/card-table";
import { ProductTableGeneral, Results } from "@/types/general";

type Props = {
  id: string;
};
const GeneralDetailReportInventoriesView = ({ id }: Props) => {
  const { general } = useGetDetailGeneral({ id });
  return (
    <>
      <Header
        title="Thông tin kho chi tiết"
        text1="Tồn kho chi tiết"
        text2="Quản lý tồn kho chi tiết"
      />
      <Custombreadcumb
        href2={`/dashboard/report/general/detail`}
        breadcumbItem="Thông tin chi tiết kho hàng"
        breadcumbPage={`${general?.results.name ?? ""}`}
        linkBtn={`/dashboard/management/general/${id}/edit`}
        title="Chỉnh sửa thông tin kho"
      />
      <DetailReportGeneralTableData
        data={
          general?.general[0]?.products as ProductTableGeneral[] | undefined
        }
        general={general?.results as Results}
      />
    </>
  );
};

export default GeneralDetailReportInventoriesView;
