import HomeLayout from "@/layouts/home-layout";
import { Barcode, CalendarDays, MapPin, User } from "lucide-react";
import { useTheme } from "next-themes";
import { Link } from "react-router-dom";

const ReportCustomerView = () => {
  const { theme } = useTheme();

  return (
    <>
      <HomeLayout>
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 xl:grid-cols-4">
          <div
            className={`${
              theme === "dark" ? "bg-[#212B36] " : "shadow-lg"
            } rounded-lg p-3`}
          >
            <Link
              to={`/dashboard/report/customer/analytic_customers/customer_by_time`}
            >
              <div className="flex flex-col items-center gap-x-2">
                <CalendarDays />
                <div className="my-2">
                  <p className="text-base text-center">
                    Khách mua hàng theo thời gian
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
              to={`/dashboard/report/customer/analytic_customers/customer_by_product`}
            >
              <div className="flex flex-col items-center gap-x-2">
                <Barcode />
                <div className="my-2">
                  <p className="text-base text-center">
                    Khách mua hàng theo sản phẩm
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
              to={`/dashboard/report/customer/analytic_customers/customer_by_location`}
            >
              <div className="flex flex-col items-center gap-x-2">
                <MapPin />
                <div className="my-2">
                  <p className="text-base text-center">
                    Khách mua hàng theo khu vực
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
              to={`/dashboard/report/customer/analytic_customers/customer_by_group`}
            >
              <div className="flex flex-col items-center gap-x-2">
                <User />
                <div className="my-2">
                  <p className="text-base text-center">
                    Khách mua hàng theo nhóm khách hàng
                  </p>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </HomeLayout>
    </>
  );
};

export default ReportCustomerView;
