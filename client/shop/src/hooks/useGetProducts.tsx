import { getListProducts } from "@/api/product";
import { ProductData } from "@/types";
import { useEffect, useState } from "react";

const useGetProducts = () => {
  const [products, setProducts] = useState<ProductData[]>([]);

  useEffect(() => {
    const fetchListProducts = async () => {
      const response = await getListProducts();
      setProducts(response);
    };

    fetchListProducts();
  }, []);

  return { products, setProducts };
};

export default useGetProducts;
