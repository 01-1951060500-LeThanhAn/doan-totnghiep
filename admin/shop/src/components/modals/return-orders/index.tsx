import useGetOrders from "@/components/order/hooks/use-get-orders";
import ModalReturnOrderTable from "./table";
import { OrdersData } from "@/types/orders";

const ReturnOrderModal = () => {
  const { orders } = useGetOrders();
  return (
    <>
      <ModalReturnOrderTable data={orders as OrdersData[]} />
    </>
  );
};

export default ReturnOrderModal;
