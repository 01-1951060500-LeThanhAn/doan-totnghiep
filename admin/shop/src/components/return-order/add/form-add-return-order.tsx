import useGetOrders from "@/components/order/hooks/use-get-orders";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import FormReturnOrder from "../form-return-order";
import { CreateReturnOrderData } from "@/types/return_order";
import { OrdersData } from "@/types/orders";

const FormAddReturnOrder = () => {
  const [data, setData] = useState<CreateReturnOrderData>();
  const [ordersData, setOrdersData] = useState<OrdersData>();
  const { orders } = useGetOrders();
  const { returnOrderId } = useParams<{ returnOrderId: string }>();

  useEffect(() => {
    const selectedOrder = orders?.find((item) => item._id === returnOrderId);
    if (!selectedOrder) return;
    setData({
      _id: "",
      orderId: selectedOrder._id ? selectedOrder._id : "",
      code: "",
      return_reason: "",
      generalId: selectedOrder?.generalId?._id ?? "",
      customerId: selectedOrder?.customerId?._id ?? "",
      refund_status: "",
      products: selectedOrder?.products.map((product) => ({
        productId: product.productId ?? "",
        quantity: product.quantity ?? 0,
      })),
    });
    setOrdersData(selectedOrder);
  }, [returnOrderId, orders]);

  return (
    <>
      <FormReturnOrder
        selectedOrder={ordersData as OrdersData}
        initialValues={data as CreateReturnOrderData}
      />
    </>
  );
};

export default FormAddReturnOrder;
