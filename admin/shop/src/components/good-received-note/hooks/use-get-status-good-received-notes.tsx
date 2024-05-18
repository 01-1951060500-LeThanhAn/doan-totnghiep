import { getStatusWarehouseOrders } from "@/api/grnApi";
import { GoodReceivedNoteData } from "@/types/good_received_note";
import { useEffect, useState } from "react";

const useGetStatusGoodReceivedNoteOrders = () => {
  const [warehouseOrders, setStatusWarehouseOrders] = useState<
    GoodReceivedNoteData[]
  >([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const response = await getStatusWarehouseOrders();

      setStatusWarehouseOrders(response.data);
    };

    fetchOrders();
  }, []);

  return { warehouseOrders };
};

export default useGetStatusGoodReceivedNoteOrders;
