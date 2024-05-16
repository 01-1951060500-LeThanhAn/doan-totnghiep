import { Custombreadcumb } from "@/features/custom-breadcumb";
import Heading from "./heading";
import useGetProducts from "../../hooks/use-get-products";
import ProductTableData from "./card-table";
import { ProductTableProps } from "@/types/product";

const ProductPage = () => {
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
        href2="/dashboard/product"
        breadcumbItem="Sản phẩm"
        breadcumbPage="Danh sách sản phẩm"
        linkBtn="/dashboard/add-product"
        title="Thêm Sản phẩm"
      />

      <ProductTableData
        products={transformedProducts as unknown as ProductTableProps[]}
      />
    </>
  );
};

export default ProductPage;
