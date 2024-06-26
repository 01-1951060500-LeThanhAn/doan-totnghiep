import { OrdersData, UpdateOrders } from "@/types/orders";
import { useEffect, useState } from "react";
import useGetOrders from "../hooks/use-get-orders";
import { useParams } from "react-router-dom";
import FormOrder from "../form-order";

const FormEditOrder = () => {
  const [data, setData] = useState<OrdersData>();
  const { orders } = useGetOrders();
  const { orderId } = useParams<{ orderId: string }>();

  useEffect(() => {
    const selectedOrder = orders?.find((item) => item._id === orderId);

    setData(selectedOrder);
  }, [orderId, orders]);

  return (
    <>
      <FormOrder
        orderId={orderId}
        initialValues={data as unknown as UpdateOrders}
      />
    </>
  );
};

export default FormEditOrder;
