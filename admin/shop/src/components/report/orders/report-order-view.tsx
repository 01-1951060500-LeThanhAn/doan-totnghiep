import HomeLayout from "@/layouts/home-layout";
import { Box, CircleDollarSign, CreditCard, Truck } from "lucide-react";
import { useTheme } from "next-themes";
import { Link } from "react-router-dom";
const ReportOrderView = () => {
  const { theme } = useTheme();
  return (
    <>
      <HomeLayout>
        <div className="grid grid-cols-2 mt-4 md:grid-cols-2 lg:grid-cols-3 gap-3 xl:grid-cols-4">
          <div
            className={`${
              theme === "dark" ? "bg-[#212B36] " : "shadow-lg"
            } rounded-lg p-3`}
          >
            <Link to={`/dashboard/report/order/analytic_orders/revenue`}>
              <div className="flex flex-col items-center gap-x-2 ">
                <CircleDollarSign />
                <div className="my-2">
                  <p className="text-base text-center">
                    Báo cáo doanh thu cửa hàng
                  </p>
                </div>
              </div>
            </Link>
          </div>
          <div
            className={`${
              theme === "dark" ? "bg-[#212B36] " : "shadow-lg"
            } rounded-lg p-3`}
          >
            <Link to={`/dashboard/report/order/analytic_orders/shipments`}>
              <div className="flex flex-col items-center gap-x-2">
                <Truck />
                <div className="my-2">
                  <p className="text-base text-center">
                    Báo cáo thông tin giao hàng
                  </p>
                </div>
              </div>
            </Link>
          </div>
          <div
            className={`${
              theme === "dark" ? "bg-[#212B36] " : "shadow-lg"
            } rounded-lg p-3`}
          >
            <Link
              to={`/dashboard/report/order/analytic_customers/customer_by_location`}
            >
              <div className="flex flex-col items-center gap-x-2">
                <Box />
                <div className="my-2">
                  <p className="text-base text-center">Báo cáo trả hàng</p>
                </div>
              </div>
            </Link>
          </div>
          <div
            className={`${
              theme === "dark" ? "bg-[#212B36] " : "shadow-lg"
            } rounded-lg p-3`}
          >
            <Link to={`/dashboard/report/order/analytic_orders/payments`}>
              <div className="flex flex-col items-center gap-x-2">
                <CreditCard />
                <div className="my-2">
                  <p className="text-base text-center">Báo cáo thanh toán</p>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </HomeLayout>
    </>
  );
};

export default ReportOrderView;
