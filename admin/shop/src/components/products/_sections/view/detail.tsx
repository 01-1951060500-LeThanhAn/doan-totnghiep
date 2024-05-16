import { Custombreadcumb } from "@/features/custom-breadcumb";
import Header from "../../header";
import useGetDetailProduct from "../../hooks/use-get-detail-product";
import DetailProductView from "../components/detail-product-view";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "@/hooks/hooks";
import { deleteProductAsync } from "@/redux/slices/productSlice";

type Props = {
  id: string;
};

const ProductDetailView = ({ id }: Props) => {
  const { product } = useGetDetailProduct({ id });

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const handleDeleteProduct = async () => {
    try {
      await dispatch(deleteProductAsync(id));
      toast.success("Xóa sản phẩm thành công");

      navigate(`/dashboard/product`);
    } catch (error) {
      console.log(error);
      toast.error("Xóa sản phẩm thất bại");
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
        linkBtn={`/dashboard/product/${id}/edit`}
        title="Chỉnh sửa sản phẩm"
      />

      <DetailProductView product={product!} />
    </>
  );
};

export default ProductDetailView;
