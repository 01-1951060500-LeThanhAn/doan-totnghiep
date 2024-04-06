import useGetProducts from "@/hooks/useGetProducts";
import { ProductData, UpdateProductDataType } from "@/types";
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
      <FormProduct
        productId={productId}
        initialValues={data as UpdateProductDataType}
      />
    </>
  );
};

export default FormEditProduct;
