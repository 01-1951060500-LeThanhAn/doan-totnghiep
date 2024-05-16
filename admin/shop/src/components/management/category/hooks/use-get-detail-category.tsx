import { getDetailCategorys } from "@/api/categoryApi";
import { DetailCategoryData } from "@/types/category";
import { useEffect, useState } from "react";

type Props = {
  id: string;
};

const useGetDetailCategory = ({ id }: Props) => {
  const [category, setCategory] = useState<DetailCategoryData>();

  useEffect(() => {
    const fetchDetailCategory = async () => {
      const response = await getDetailCategorys(id);

      setCategory(response[0]);
    };

    fetchDetailCategory();
  }, [id]);

  return { category };
};

export default useGetDetailCategory;
