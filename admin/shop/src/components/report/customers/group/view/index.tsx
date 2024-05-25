import { getOrderCustomerbyGroup } from "@/api/reportApi";
import { formatPrice } from "@/config/format-price";
import HomeLayout from "@/layouts/home-layout";
import { ReportCustomerByGroup } from "@/types/report";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import ChartReportCustomerByGroup from "./chart";
import ReportCustomerByGroupTable from "./table";

const ViewReportCustomerByGroup = () => {
  const [customerGroup, setCustomerGroup] = useState<ReportCustomerByGroup[]>(
    []
  );
  const [data, setData] = useState<ReportCustomerByGroup[]>([]);
  const { theme } = useTheme();

  useEffect(() => {
    try {
      const getCustomerGroupStats = async () => {
        const response = await getOrderCustomerbyGroup();
        setData(response);
        response.map((item) =>
          setCustomerGroup((prev) => {
            return [
              ...prev,
              {
                name: item?._id,
                "Số lượng khách hàng": item.totalCustomers,
                "Số lượng đơn hàng": item?.totalOrders,
                totalPrice: formatPrice(item?.totalPrice),
              },
            ] as ReportCustomerByGroup[];
          })
        );
      };

      getCustomerGroupStats();
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
          <ChartReportCustomerByGroup
            title="Biểu đồ khách hàng theo nhóm khách hàng"
            dataKey="Số khách hàng"
            grid={true}
            data={customerGroup as ReportCustomerByGroup[]}
          />
        </div>
        <ReportCustomerByGroupTable data={data as ReportCustomerByGroup[]} />
      </HomeLayout>
    </>
  );
};

export default ViewReportCustomerByGroup;
