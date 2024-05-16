import { CustomerData, UpdateCustomerData } from "@/types/customer";
import { useEffect, useState } from "react";
import useGetCustomers from "../hooks/use-get-customers";
import { useParams } from "react-router-dom";
import FormCustomer from "../form-customer";

const FormEditCustomer = () => {
  const [data, setData] = useState<CustomerData>();
  const { customers } = useGetCustomers();
  const { customerId } = useParams<{ customerId: string }>();

  useEffect(() => {
    const selectedCustomer = customers?.find(
      (item) => item.customer?._id === customerId
    );
    setData(selectedCustomer?.customer);
  }, [customerId, customers]);

  return (
    <>
      <FormCustomer
        customerId={customerId}
        initialValues={data as UpdateCustomerData}
      />
    </>
  );
};

export default FormEditCustomer;
