import { Custombreadcumb } from "@/features/custom-breadcumb";
import Heading from "./heading";
import useGetGenerals from "@/hooks/use-get-generals";
import GeneralReportTableData from "./card-table";
import { GeneralTableProps } from "@/types/general";

const ViewReportGeneralPage = () => {
  const { generals } = useGetGenerals();
  const data = generals.map((item) => ({
    _id: item?._id,
    name: item?.name,
    type: item?.type,
    address: item?.address,
    code: item?.code,
    manager: item?.manager?.username,
    phone: item?.manager?.phone,
  }));
  return (
    <>
      <Heading />
      <Custombreadcumb
        href2="/dashboard/report"
        breadcumbItem="Báo cáo"
        breadcumbPage="Báo cáo tồn kho"
      />

      <GeneralReportTableData data={data as unknown as GeneralTableProps[]} />
    </>
  );
};

export default ViewReportGeneralPage;
