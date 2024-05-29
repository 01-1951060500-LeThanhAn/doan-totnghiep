import HomeLayout from "@/layouts/home-layout";
import { Box, CreditCard } from "lucide-react";
import { useTheme } from "next-themes";
import { Link } from "react-router-dom";

const ReportGrnView = () => {
  const { theme } = useTheme();
  return (
    <>
      <HomeLayout>
        <div className="grid grid-cols-2 mt-4 gap-3">
          <div
            className={`${
              theme === "dark" ? "bg-[#212B36] " : "shadow-lg"
            } rounded-lg p-3`}
          >
            <Link to={`/dashboard/report/grn/analytic_grn/revenue`}>
              <div className="flex flex-col items-center gap-x-2 ">
                <Box />
                <div className="my-2">
                  <p className="text-base text-center">Báo cáo hàng nhập kho</p>
                </div>
              </div>
            </Link>
          </div>
          <div
            className={`${
              theme === "dark" ? "bg-[#212B36] " : "shadow-lg"
            } rounded-lg p-3`}
          >
            <Link to={`/dashboard/report/grn/analytic_grn/shipments`}>
              <div className="flex flex-col items-center gap-x-2">
                <CreditCard />
                <div className="my-2">
                  <p className="text-base text-center">
                    Báo cáo thanh toán nhập hàng
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

export default ReportGrnView;
