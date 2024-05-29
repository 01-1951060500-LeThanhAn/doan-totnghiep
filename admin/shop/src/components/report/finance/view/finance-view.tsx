import HomeLayout from "@/layouts/home-layout";
import { useTheme } from "next-themes";
import { Link } from "react-router-dom";

const FinanceView = () => {
  const { theme } = useTheme();
  return (
    <>
      <HomeLayout>
        <div className="grid grid-cols-1 mt-4 lg:grid-cols-2 gap-3">
          <div
            className={`${
              theme === "dark" ? "bg-[#212B36] " : "shadow-lg"
            } rounded-lg p-3`}
          >
            <Link to={`/dashboard/report/debt/customers`}>
              <div className="flex items-center gap-x-2">
                <img
                  src="https://res.cloudinary.com/dhwufmyi4/image/upload/v1715434803/Screenshot_2024-05-11_203431-removebg-preview_itlppm.png"
                  alt=""
                />
                <div className="image">
                  <p className="text-base font-semibold">
                    Báo cáo công nợ khách hàng
                  </p>
                  <p className="text-sm">
                    Theo dõi các khoản công nợ phải thu hoặc phải trả của khách
                    hàng
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
            <Link to={`/dashboard/report/debt/suppliers`}>
              <div className="flex items-center gap-x-2">
                <img
                  src="https://res.cloudinary.com/dhwufmyi4/image/upload/v1715434863/Screenshot_2024-05-11_204028-removebg-preview_ccjzuv.png"
                  alt=""
                />
                <div className="image">
                  <p className="text-base font-semibold">
                    Báo cáo công nợ nhà cung cấp
                  </p>
                  <p className="text-sm">
                    Theo dõi các khoản công nợ phải thu hoặc phải trả nhà cung
                    cấp
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
            <Link to={`/dashboard/report/overstocking`}>
              <div className="flex items-center gap-x-2">
                <img
                  src="https://res.cloudinary.com/dhwufmyi4/image/upload/v1715222562/Screenshot_2024-05-09_094142-removebg-preview_m9cxfd.png"
                  alt=""
                />
                <div className="image">
                  <p className="text-base font-semibold">Báo cáo lãi lỗ</p>
                  <p className="text-sm">
                    Theo dõi doanh thu chi phí và lợi nhuận của cửa hàng
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

export default FinanceView;
