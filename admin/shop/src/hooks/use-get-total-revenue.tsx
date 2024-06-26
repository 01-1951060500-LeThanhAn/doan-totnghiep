import { ReportOrderMonth } from "@/types/report";
import { useEffect, useState } from "react";
import { useMonths } from "./use-month";
import { getOrderRevenueByMonth } from "@/api/reportApi";

const useGetTotalRevenue = () => {
  const { months } = useMonths();
  const [revenueMonth, setRevenueMonth] = useState<ReportOrderMonth[]>([]);
  useEffect(() => {
    try {
      const getRevenueMonth = async () => {
        const response = await getOrderRevenueByMonth();
        response.incomeData.map((item) =>
          setRevenueMonth((prev) => {
            return [
              ...prev,
              {
                month: [item._id],
                total_income: item.total_income,
              },
            ] as ReportOrderMonth[];
          })
        );
      };

      getRevenueMonth();
    } catch (error) {
      console.log(error);
    }
  }, [months]);

  return { revenueMonth };
};

export default useGetTotalRevenue;
