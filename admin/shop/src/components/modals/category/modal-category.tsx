import { CategoryData } from "@/types/category";
import { DialogHeader } from "../../ui/dialog";
import { DialogTitle } from "../../ui/dialog";
import FormAddCategory from "./form-add-category";

type Props = {
  data: CategoryData[];
};
const CategoryModal = ({ data }: Props) => {
  return (
    <>
      <DialogHeader>
        <DialogTitle>
          <p>Thêm loại sản phẩm</p>
        </DialogTitle>
        <FormAddCategory data={data} />
      </DialogHeader>
    </>
  );
};

export default CategoryModal;
