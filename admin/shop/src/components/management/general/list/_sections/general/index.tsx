import { Custombreadcumb } from "@/features/custom-breadcumb";
import Heading from "./heading";
import GeneralManagementTableData from "./components/table";
import useGetGenerals from "@/hooks/use-get-generals";
import { GeneralTableProps } from "@/types/general";

const GeneralManagementPage = () => {
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
        href2="/dashboard/management"
        breadcumbItem="Quản lý kho"
        breadcumbPage="Danh sách tồn kho sản phẩm"
        linkBtn="/dashboard/management/general/create"
        title="Tạo kho"
      />
      <GeneralManagementTableData
        data={data as unknown as GeneralTableProps[]}
      />
    </>
  );
};

export default GeneralManagementPage;
