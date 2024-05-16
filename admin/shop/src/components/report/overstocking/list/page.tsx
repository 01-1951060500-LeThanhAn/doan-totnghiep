import { Custombreadcumb } from "@/features/custom-breadcumb";
import Heading from "./heading";
import useGetProducts from "@/components/products/hooks/use-get-products";
import OverStockingTableData from "./card-table";
import { ProductData } from "@/types/product";

const ViewOverStockingPage = () => {
  const { products } = useGetProducts();

  return (
    <>
      <Heading />
      <Custombreadcumb
        href2="/dashboard/report"
        breadcumbItem="Tồn kho"
        breadcumbPage="Báo cáo tồn vượt định mức"
      />
      <OverStockingTableData data={products as ProductData[]} />
    </>
  );
};

export default ViewOverStockingPage;
