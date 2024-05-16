import useGetProducts from "@/components/products/hooks/use-get-products";
import { ProductData } from "@/types/product";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import FormPriceProduct from "../form-price-product";

const FormEditPriceProducts = () => {
  const [data, setData] = useState<ProductData>();
  const { products } = useGetProducts();
  const { adjustmentpriceId } = useParams<{ adjustmentpriceId: string }>();

  useEffect(() => {
    const selectedProduct = products?.find(
      (item) => item._id === adjustmentpriceId
    );
    setData(selectedProduct);
  }, [adjustmentpriceId, products]);

  return (
    <>
      <FormPriceProduct
        adjustmentpriceId={adjustmentpriceId}
        initialValues={data as ProductData}
      />
    </>
  );
};

export default FormEditPriceProducts;
