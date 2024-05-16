import useGetProducts from "@/components/products/hooks/use-get-products";
import { ProductData } from "@/types/product";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import FormProduct from "../fom-product";

const FormEditProduct = () => {
  const [data, setData] = useState<ProductData>();
  const { products } = useGetProducts();
  const { productId } = useParams<{ productId: string }>();

  useEffect(() => {
    const selectedProduct = products?.find((item) => item._id === productId);
    setData(selectedProduct);
  }, [productId, products]);

  return (
    <>
      <FormProduct productId={productId} initialValues={data as ProductData} />
    </>
  );
};

export default FormEditProduct;
