import { getCategorys } from "@/api/categoryApi";
import { CategoryData } from "@/types/category";
import { useEffect, useState } from "react";

const useGetAllCategory = () => {
  const [categorys, setCategorys] = useState<CategoryData[]>([]);

  useEffect(() => {
    const fetchCategory = async () => {
      const response = await getCategorys();

      setCategorys(response);
    };

    fetchCategory();
  }, []);

  return { categorys };
};

export default useGetAllCategory;
