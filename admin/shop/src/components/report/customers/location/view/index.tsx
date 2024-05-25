import { getOrderCustomerbyLocation } from "@/api/reportApi";
import HomeLayout from "@/layouts/home-layout";
import { ReportCustomerByLocation } from "@/types/report";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import ChartReportCustomerByLocation from "./chart";
import { formatPrice } from "@/config/format-price";
import ReportCustomerByLocationTable from "./chart/components/card-table";

const ViewReportCustomerByLocation = () => {
  const [customerLocation, setCustomerLocation] = useState<
    ReportCustomerByLocation[]
  >([]);
  const [data, setData] = useState<ReportCustomerByLocation[]>([]);
  const { theme } = useTheme();
  useEffect(() => {
    try {
      const getCustomerLocationStats = async () => {
        const response = await getOrderCustomerbyLocation();
        setData(response);
        response.map((item) =>
          setCustomerLocation((prev) => {
            return [
              ...prev,
              {
                name: item?._id,
                "Số lượng khách hàng": item.totalCustomers,
                "Số lượng đơn hàng": item?.totalOrders,
                totalPrice: formatPrice(item?.totalPrice),
              },
            ] as ReportCustomerByLocation[];
          })
        );
      };

      getCustomerLocationStats();
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
          <ChartReportCustomerByLocation
            title="Biểu đồ khách hàng theo địa điểm"
            dataKey="Số khách hàng"
            grid={true}
            data={customerLocation as ReportCustomerByLocation[]}
          />
        </div>
        <ReportCustomerByLocationTable
          data={data as ReportCustomerByLocation[]}
        />
      </HomeLayout>
    </>
  );
};

export default ViewReportCustomerByLocation;
