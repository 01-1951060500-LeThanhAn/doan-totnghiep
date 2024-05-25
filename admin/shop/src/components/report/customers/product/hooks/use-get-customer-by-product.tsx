import { getOrderCustomerbyProducts } from "@/api/reportApi";
import { ReportCustomerByProduct } from "@/types/report";
import { useEffect, useState } from "react";

const useGetOrderCustomerByProducts = () => {
  const [orders, setOrders] = useState<ReportCustomerByProduct[]>([]);
  useEffect(() => {
    const fetchReportCustomerOrderByProducts = async () => {
      const response = await getOrderCustomerbyProducts();

      setOrders(response);
    };

    fetchReportCustomerOrderByProducts();
  }, []);
  return { orders };
};

export default useGetOrderCustomerByProducts;
