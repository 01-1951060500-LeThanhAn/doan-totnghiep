import { Custombreadcumb } from "@/features/custom-breadcumb";
import Header from "../header";
import useGetDetailGeneral from "../hooks/use-get-detail-general";
import DetailGeneralTableData from "./components/table";
import { ProductTableGeneral, Results } from "@/types/general";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "@/hooks/hooks";
import { toast } from "sonner";
import { deleteGeneralAsync } from "@/redux/slices/generalSlice";

type Props = {
  id: string;
};

const GeneralDetailView = ({ id }: Props) => {
  const { general } = useGetDetailGeneral({ id });
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const handleDeleteGeneral = async () => {
    try {
      await dispatch(deleteGeneralAsync(id));
      toast.success("Xóa kho hàng thành công");

      navigate(`/dashboard/management/general`);
    } catch (error) {
      console.log(error);
      toast.error("Xóa kho hàng thất bại");
    }
  };

  return (
    <>
      <Header
        onClick={handleDeleteGeneral}
        title="Thông tin kho"
        text1="Xóa kho"
        text2="Quản lý tồn kho"
      />
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
