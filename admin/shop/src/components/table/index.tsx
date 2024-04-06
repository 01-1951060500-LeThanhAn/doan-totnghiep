import TableUsers from "./users/table-user";
import useGetListUser from "@/hooks/useGetListUser";
import useGetProducts from "@/hooks/useGetProducts";
import { UserTableData } from "@/types";
import TableProducts from "./products/table-products";
import { useState } from "react";
import { useAppDispatch } from "@/hooks/hooks";
import { deleteProductAsync } from "@/redux/slices/productSlice";

const TableData = () => {
  const { users } = useGetListUser();
  const { products } = useGetProducts();
  const [productList, setProductList] = useState(products);
  const dispatch = useAppDispatch();

  const handleDeleteProduct = async (productId: string) => {
    await dispatch(deleteProductAsync(productId));
    setProductList(productList.filter((product) => product._id !== productId)); // Update data state
  };

  return (
    <>
      <TableUsers type="users" data={users as UserTableData[]} />
      <TableProducts
        type="products"
        onDeleteProduct={handleDeleteProduct}
        data={products}
        setProducts={setProductList}
      />
    </>
  );
};

export default TableData;
