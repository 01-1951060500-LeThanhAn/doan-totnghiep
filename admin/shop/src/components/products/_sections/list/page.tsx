import { Custombreadcumb } from "@/features/custom-breadcumb";
import Heading from "./heading";
import useGetProducts from "../../hooks/use-get-products";
import ProductTableData from "./card-table";
import { ProductTableProps } from "@/types/product";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useEffect, useState } from "react";
import useGetDetailGeneral from "@/components/management/general/hooks/use-get-detail-general";
import CardTableGeneralData from "./card-table/card-table-general";

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
    general: product?.generalId?.name,
    generalId: product?.generalId?._id,
  }));

  const [generalIdList, setGeneralIdList] = useState<string[]>([]);

  useEffect(() => {
    const uniqueGeneralIdList = [
      ...new Set(products.map((item) => item?.generalId?._id)),
    ];
    setGeneralIdList(uniqueGeneralIdList);
  }, [products]);

  const { general: main } = useGetDetailGeneral({ id: generalIdList[0] });
  const { general: sub } = useGetDetailGeneral({ id: generalIdList[1] });

  const mainProducts = main?.general[0]?.products.map((product) => ({
    ...product,
    general: main?.results?.name,
  }));

  const subProducts = sub?.general[0]?.products.map((product) => ({
    ...product,
    general: sub?.results?.name,
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

      <Tabs defaultValue="all">
        <TabsList className="mx-6 mt-4">
          <TabsTrigger value="all">
            <p>Sản phẩm các kho</p>
          </TabsTrigger>
          <TabsTrigger value="main">
            <p>Kho hàng chính</p>
          </TabsTrigger>
          <TabsTrigger value="sub">
            <p>Kho hàng phụ</p>
          </TabsTrigger>
        </TabsList>
        <TabsContent value="all">
          <ProductTableData
            products={transformedProducts as unknown as ProductTableProps[]}
          />
        </TabsContent>
        <TabsContent value="main">
          <CardTableGeneralData
            products={mainProducts as unknown as ProductTableProps[]}
          />
        </TabsContent>
        <TabsContent value="sub">
          <CardTableGeneralData
            products={subProducts as unknown as ProductTableProps[]}
          />
        </TabsContent>
      </Tabs>
    </>
  );
};

export default ProductPage;
