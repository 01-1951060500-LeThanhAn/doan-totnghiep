import { Custombreadcumb } from "@/features/custom-breadcumb";
import Heading from "./heading";
import DebtCustomerTableData from "./card-table";
import useGetCustomers from "@/components/customers/hooks/use-get-customers";
import { CustomerData } from "@/types/customer";

const DebtCustomersPage = () => {
  const { customers } = useGetCustomers();
  const data = customers.map((item) => item.customer);
  return (
    <>
      <Heading />
      <Custombreadcumb
        href2="/dashboard/report/finance"
        breadcumbItem="Báo cáo công nợ khách hàng"
        breadcumbPage="Danh sách báo cáo công nợ khách hàng"
        text={`Gỉai thích thuật ngữ`}
      />

      <DebtCustomerTableData data={data as unknown as CustomerData[]} />
    </>
  );
};

export default DebtCustomersPage;
