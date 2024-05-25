import { getOrderRevenueByCustomerGroup } from "@/api/reportApi";
import { ReportRevenueByCustomerGroupData } from "@/types/report";
import { useEffect, useState } from "react";

const useGetRevenueByCustomerGroup = () => {
  const [revenueCustomerGroup, setRevenueCustomerGroup] = useState<
    ReportRevenueByCustomerGroupData[]
  >([]);
  useEffect(() => {
    const fetchRevenueByCustomerGroup = async () => {
      const response = await getOrderRevenueByCustomerGroup();
      setRevenueCustomerGroup(response);
    };

    fetchRevenueByCustomerGroup();
  }, []);

  return { revenueCustomerGroup };
};

export default useGetRevenueByCustomerGroup;
