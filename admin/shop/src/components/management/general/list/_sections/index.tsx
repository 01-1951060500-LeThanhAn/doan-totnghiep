import HomeLayout from "@/layouts/home-layout";
import { useTheme } from "next-themes";
import { Link } from "react-router-dom";

const GeneralView = () => {
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
            <Link to={`/dashboard/management/general`}>
              <div className="flex items-center gap-x-2">
                <img
                  src="https://res.cloudinary.com/dhwufmyi4/image/upload/v1714748713/Screenshot_2024-05-03_215559-removebg-preview_pi2f8e.png"
                  alt=""
                />
                <div className="image">
                  <p className="text-base font-semibold">Quản lý kho</p>
                  <p className="text-sm">
                    Quản lý số lượng sản phẩm, số lượng tồn kho...
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
            <Link to={`/dashboard/management/staff`}>
              <div className="flex items-center gap-x-2">
                <img
                  src="https://res.cloudinary.com/dhwufmyi4/image/upload/v1714748713/Screenshot_2024-05-03_215559-removebg-preview_pi2f8e.png"
                  alt=""
                />
                <div className="image">
                  <p className="text-base font-semibold">Quản lý nhân sự</p>
                  <p className="text-sm">
                    Quản lý vai trò, chức vụ của nhân viên...
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
            <Link to={`/dashboard/management/category`}>
              <div className="flex items-center gap-x-2">
                <img
                  src="https://res.cloudinary.com/dhwufmyi4/image/upload/v1714748713/Screenshot_2024-05-03_215559-removebg-preview_pi2f8e.png"
                  alt=""
                />
                <div className="image">
                  <p className="text-base font-semibold">Quản lý sản phẩm</p>
                  <p className="text-sm">Quản lý danh mục sản phẩm...</p>
                </div>
              </div>
            </Link>
          </div>
          <div
            className={`${
              theme === "dark" ? "bg-[#212B36] " : "shadow-lg"
            } rounded-lg p-3`}
          >
            <Link to={`/dashboard/management/adjustment_price`}>
              <div className="flex items-center gap-x-2">
                <img
                  src="https://res.cloudinary.com/dhwufmyi4/image/upload/v1714748713/Screenshot_2024-05-03_215559-removebg-preview_pi2f8e.png"
                  alt=""
                />
                <div className="image">
                  <p className="text-base font-semibold">
                    Điều chỉnh giá cả linh hoạt
                  </p>
                  <p className="text-sm">
                    Quản lý giá cả sản phẩm linh hoạt thị trường...
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

export default GeneralView;
