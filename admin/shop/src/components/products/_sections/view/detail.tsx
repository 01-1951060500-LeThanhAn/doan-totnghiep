import { Custombreadcumb } from "@/features/custom-breadcumb";
import Header from "../../header";
import useGetDetailProduct from "../../hooks/use-get-detail-product";
import DetailProductView from "../components/detail-product-view";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { deleteProductAsync } from "@/redux/slices/productSlice";

type Props = {
  id: string;
};

const ProductDetailView = ({ id }: Props) => {
  const { product } = useGetDetailProduct({ id });

  const { currentUser } = useAppSelector((state) => state.auth);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const handleDeleteProduct = async () => {
    if (currentUser?.isAdmin) {
      try {
        await dispatch(deleteProductAsync(id));
        toast.success("Xóa sản phẩm thành công");

        navigate(`/dashboard/product`);
      } catch (error) {
        console.log(error);
        toast.error("Xóa sản phẩm thất bại");
      }
    } else {
      toast.error("Bạn không có quyền xóa sản phẩm");
    }
  };

  return (
    <>
      <Header
        title="Thông tin sản  phẩm"
        text1={"Xóa sản  phẩm"}
        text2="Quản lý sản  phẩm"
        onClick={handleDeleteProduct}
      />

      <Custombreadcumb
        href2={`/dashboard/product/`}
        breadcumbItem="Sản phẩm"
        breadcumbPage="Thông tin chi tiết sản phẩm"
        linkBtn={currentUser?.isAdmin && `/dashboard/product/${id}/edit`}
        title={currentUser?.isAdmin && "Chỉnh sửa sản phẩm"}
      />

      <DetailProductView product={product!} />
    </>
  );
};

export default ProductDetailView;
