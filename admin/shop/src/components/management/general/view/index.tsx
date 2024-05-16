import { Custombreadcumb } from "@/features/custom-breadcumb";
import Header from "../header";
import useGetDetailGeneral from "../hooks/use-get-detail-general";
import DetailGeneralTableData from "./components/table";
import { ProductTableGeneral, Results } from "@/types/general";

type Props = {
  id: string;
};

const GeneralDetailView = ({ id }: Props) => {
  const { general } = useGetDetailGeneral({ id });

  return (
    <>
      <Header title="Thông tin kho" text1="Tồn kho" text2="Quản lý tồn kho" />
      <Custombreadcumb
        href2={`/dashboard/management/general/`}
        breadcumbItem="Danh sách kho hàng"
        breadcumbPage={`${general?.results.name}`}
        linkBtn={`/dashboard/management/general/${id}/edit`}
        title="Chỉnh sửa thông tin kho"
      />

      <DetailGeneralTableData
        data={
          general?.general[0]?.products as ProductTableGeneral[] | undefined
        }
        general={general?.results as Results}
      />
    </>
  );
};

export default GeneralDetailView;
