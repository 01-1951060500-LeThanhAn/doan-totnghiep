import { getOrderRevenueByCustomer } from "@/api/reportApi";
import { ReportRevenueByCustomerData } from "@/types/report";
import { useEffect, useState } from "react";

const useGetRevenueByCustomer = () => {
  const [revenueCustomer, setRevenueCustomer] = useState<
    ReportRevenueByCustomerData[]
  >([]);
  useEffect(() => {
    const fetchRevenueByCustomer = async () => {
      const response = await getOrderRevenueByCustomer();
      setRevenueCustomer(response);
    };

    fetchRevenueByCustomer();
  }, []);

  return { revenueCustomer };
};

export default useGetRevenueByCustomer;
