import { Custombreadcumb } from "@/features/custom-breadcumb";
import Heading from "./heading";
import useGetProducts from "../../hooks/use-get-products";
import ProductTableData from "./card-table";
import { ProductTableProps } from "@/types/product";

import { useAppSelector } from "@/hooks/hooks";

const ProductPage = () => {
  const { products } = useGetProducts();

  const { currentUser } = useAppSelector((state) => state.auth);

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
    general: product?.generalId?.name,
  }));

  // const [generalIdList, setGeneralIdList] = useState<string[]>([]);

  // useEffect(() => {
  //   const uniqueGeneralIdList = [
  //     ...new Set(products.map((item) => item?.generalId?._id)),
  //   ];
  //   setGeneralIdList(uniqueGeneralIdList);
  // }, [products]);

  // const { general: main } = useGetDetailGeneral({ id: generalIdList[0] });
  // const { general: sub } = useGetDetailGeneral({ id: generalIdList[1] });

  // const mainProducts =
  //   main &&
  //   main?.general[0]?.products.map((product) => ({
  //     ...product,
  //     general: main?.results?.name,
  //   }));

  // const subProducts =
  //   sub &&
  //   sub?.general[0]?.products.map((product) => ({
  //     ...product,
  //     general: sub?.results?.name,
  //   }));

  return (
    <>
      <Heading />
      <Custombreadcumb
        href2="/dashboard/product"
        breadcumbItem="Sản phẩm"
        breadcumbPage="Danh sách sản phẩm"
        linkBtn={currentUser?.isAdmin && "/dashboard/add-product"}
        title={currentUser?.isAdmin && "Thêm sản phẩm"}
      />

      <ProductTableData
        products={transformedProducts as unknown as ProductTableProps[]}
      />
    </>
  );
};

export default ProductPage;
