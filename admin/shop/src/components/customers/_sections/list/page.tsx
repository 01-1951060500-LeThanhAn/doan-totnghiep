import useGetCustomers from "@/components/customers/hooks/use-get-customers";
import CustomerTableData from "./card-table";
import Heading from "./heading";
import { Custombreadcumb } from "@/features/custom-breadcumb";

const CustomerPage = () => {
  const { customers } = useGetCustomers();
  const data = customers.map((item) => ({
    ...item.customer,
    totalOrders: item.totalOrders,
    totalSpending: item.totalSpending,
  }));
  return (
    <>
      <Heading />
      <Custombreadcumb
        href2="/dashboard/customer"
        breadcumbItem="Khách hàng"
        breadcumbPage="Danh sách khách hàng"
        linkBtn="/dashboard/customer/create"
        title="Thêm khách hàng"
      />
      <CustomerTableData data={data} />
    </>
  );
};

export default CustomerPage;
