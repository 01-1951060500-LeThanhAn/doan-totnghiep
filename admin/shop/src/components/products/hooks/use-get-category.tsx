import { getCategorys } from "@/api/categoryApi";
import { CategoryData } from "@/types/category";
import { useEffect, useState } from "react";

const useGetCategory = () => {
  const [categorys, setCategorys] = useState<CategoryData[]>([]);

  useEffect(() => {
    const fetchListCategory = async () => {
      const response = await getCategorys();
      setCategorys(response);
    };

    fetchListCategory();
  }, []);

  return { categorys };
};

export default useGetCategory;
