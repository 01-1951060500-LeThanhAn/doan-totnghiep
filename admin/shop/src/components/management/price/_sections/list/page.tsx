import { Custombreadcumb } from "@/features/custom-breadcumb";
import Heading from "./heading";
import useGetProducts from "@/components/products/hooks/use-get-products";
import AdjustmentPriceTableData from "./card-table";
import { ProductTableProps } from "@/types/product";

const ViewAdjustmentPricePage = () => {
  const { products } = useGetProducts();
  const transformedProducts = products.map((product) => ({
    _id: product._id,
    name_product: product.name_product,
    code: product.code,
    type: product.type.name,
    unit: product.unit,
    import_price: product.import_price,
    export_price: product.export_price,
    inventory_number: product.inventory_number,
    status: product.status,
    img: product.img,
  }));
  return (
    <>
      <Heading />
      <Custombreadcumb
        href2="/dashboard/management"
        breadcumbItem="Gía sản phẩm"
        breadcumbPage="Điều chỉnh giá sản phẩm"
      />

      <AdjustmentPriceTableData
        products={transformedProducts as ProductTableProps[]}
      />
    </>
  );
};

export default ViewAdjustmentPricePage;
