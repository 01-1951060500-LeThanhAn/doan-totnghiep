import { getOrderPaymentByStaff } from "@/api/reportApi";
import { ReportPaymentByStaff } from "@/types/report";
import { useEffect, useState } from "react";

const useGetPaymentByStaff = () => {
  const [paymentStaff, setPaymentStaff] = useState<ReportPaymentByStaff[]>([]);
  useEffect(() => {
    const fetchPaymentByTime = async () => {
      const response = await getOrderPaymentByStaff();
      setPaymentStaff(response);
    };

    fetchPaymentByTime();
  }, []);

  return { paymentStaff };
};

export default useGetPaymentByStaff;
