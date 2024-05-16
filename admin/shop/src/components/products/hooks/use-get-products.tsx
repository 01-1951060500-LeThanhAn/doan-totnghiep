import { getListProducts } from "@/api/productApi";
import { ProductData } from "@/types/product";
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

  return { products };
};

export default useGetProducts;
