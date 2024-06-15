import { useEffect, useState } from "react";
import useGetAllCategory from "../hooks/use-get-all-category";
import { CategoryType, UpdateCategoryData } from "@/types/category";
import { useParams } from "react-router-dom";
import FormCategory from "../form-category";

const FormEditCategoryPage = () => {
  const { categorys } = useGetAllCategory();

  const [data, setData] = useState<CategoryType | undefined>();
  const { categoryId } = useParams<{ categoryId: string }>();

  useEffect(() => {
    const selectedCategory = categorys?.find(
      (item) => item?.type?._id === categoryId
    );

    setData(selectedCategory?.type);
  }, [categoryId, categorys]);

  return (
    <>
      <FormCategory
        categoryId={categoryId as string}
        initialValues={data as unknown as UpdateCategoryData}
      />
    </>
  );
};

export default FormEditCategoryPage;
