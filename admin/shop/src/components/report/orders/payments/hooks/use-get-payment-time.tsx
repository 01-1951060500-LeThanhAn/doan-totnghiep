import { getOrderPaymentByTime } from "@/api/reportApi";
import { ReportPaymentByTime } from "@/types/report";
import { useEffect, useState } from "react";

const useGetPaymentByTime = () => {
  const [paymentTimes, setPaymentTimes] = useState<ReportPaymentByTime[]>([]);
  useEffect(() => {
    const fetchPaymentByTime = async () => {
      const response = await getOrderPaymentByTime();
      setPaymentTimes(response);
    };

    fetchPaymentByTime();
  }, []);

  return { paymentTimes };
};

export default useGetPaymentByTime;
