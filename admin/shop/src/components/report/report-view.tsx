import HomeLayout from "@/layouts/home-layout";
import { useTheme } from "next-themes";
import { Link } from "react-router-dom";

const ReportView = () => {
  const { theme } = useTheme();
  return (
    <>
      <HomeLayout>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
          <div
            className={`${
              theme === "dark" ? "bg-[#212B36] " : "shadow-lg"
            } rounded-lg p-3`}
          >
            <Link to={`/dashboard/report/general`}>
              <div className="flex items-center gap-x-2">
                <img
                  src="https://res.cloudinary.com/dhwufmyi4/image/upload/v1714748713/Screenshot_2024-05-03_215559-removebg-preview_pi2f8e.png"
                  alt=""
                />
                <div className="image">
                  <p className="text-base font-semibold">Báo cáo tồn kho</p>
                  <p className="text-sm">
                    Báo cáo số lượng sản phẩm, số lượng tồn kho...
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
            <Link to={`/dashboard/report/general/detail`}>
              <div className="flex items-center gap-x-2">
                <img
                  src="https://res.cloudinary.com/dhwufmyi4/image/upload/v1715999814/Screenshot_2024-05-18_093518-removebg-preview_pytttw.png"
                  alt=""
                />
                <div className="image">
                  <p className="text-base font-semibold">
                    Báo cáo tồn kho chi tiết
                  </p>
                  <p className="text-sm">
                    Quản lý hàng hóa ở các trạng thái khác nhau...
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
            <Link to={`/dashboard/report/transaction`}>
              <div className="flex items-center gap-x-2">
                <img
                  src="https://res.cloudinary.com/dhwufmyi4/image/upload/v1715222359/Screenshot_2024-05-09_093755-removebg-preview_e2xejo.png"
                  alt=""
                />
                <div className="image">
                  <p className="text-base font-semibold">Sổ kho</p>
                  <p className="text-sm">
                    Quản lý lịch sử giao dịch xuất nhập kho...
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
                  <p className="text-base font-semibold">
                    Báo cáo tồn kho vượt định mức
                  </p>
                  <p className="text-sm">
                    Quản lý sản phẩm có số lượng tồn kho vượt định mức
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
            <Link to={`/dashboard/report/stock_adjustment`}>
              <div className="flex items-center gap-x-2">
                <img
                  src="https://res.cloudinary.com/dhwufmyi4/image/upload/v1716214422/Screenshot_2024-05-20_211137-removebg-preview_vroe5t.png"
                  alt=""
                />
                <div className="image">
                  <p className="text-base font-semibold">
                    Báo cáo kiểm kê hàng hóa
                  </p>
                  <p className="text-sm">
                    Quản lý các thông tin khi kiểm hàng, số lượng hàng hỏng và
                    lý do
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

export default ReportView;
