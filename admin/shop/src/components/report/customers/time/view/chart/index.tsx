import { getTotalCustomers } from "@/api/reportApi";
import HomeLayout from "@/layouts/home-layout";
import { ReportCustomer } from "@/types/report";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import ChartReportCustomer from "./chart-customer-report";
import ReportCustomerTable from "./components/card-table";

const ViewReportCustomer = () => {
  const [customerStats, setCustomerStats] = useState<ReportCustomer[]>([]);
  const [data, setData] = useState<ReportCustomer[]>([]);
  const { theme } = useTheme();
  useEffect(() => {
    try {
      const getCustomerStats = async () => {
        const response = await getTotalCustomers();
        setData(response);
        response.map((item) =>
          setCustomerStats((prev) => {
            return [
              ...prev,
              { name: item?._id, "Số khách hàng": item.total },
            ] as ReportCustomer[];
          })
        );
      };

      getCustomerStats();
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <>
      <HomeLayout>
        <div
          className={`${
            theme === "dark" ? "bg-[#212B36] " : "shadow-lg"
          } rounded-lg lg:p-3 `}
        >
          <ChartReportCustomer
            title="Biểu đồ khách mua hàng"
            data={customerStats as ReportCustomer[]}
            dataKey="Số khách hàng"
            grid={true}
          />
        </div>
        <ReportCustomerTable data={data as ReportCustomer[]} />
      </HomeLayout>
    </>
  );
};

export default ViewReportCustomer;
