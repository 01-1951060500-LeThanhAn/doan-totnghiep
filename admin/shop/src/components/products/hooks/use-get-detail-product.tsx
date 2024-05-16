import { getDetailProduct } from "@/api/productApi";
import { ProductData } from "@/types/product";
import { useEffect, useState } from "react";

type Props = {
  id: string;
};

const useGetDetailProduct = ({ id }: Props) => {
  const [product, setProduct] = useState<ProductData>();

  useEffect(() => {
    const fetchDetailProduct = async () => {
      const response = await getDetailProduct(id);
      setProduct(response);
    };

    fetchDetailProduct();
  }, [id, product]);

  return { product };
};

export default useGetDetailProduct;
