import {
  CircleDollarSign,
  Eye,
  ShoppingBasket,
  ShoppingCart,
} from "lucide-react";
import { useTheme } from "next-themes";
import useGetUsers from "../suppliers/hooks/use-get-users";
import useGetOrders from "../order/hooks/use-get-orders";
import useGetProducts from "../products/hooks/use-get-products";
import { formatPrice } from "@/config/format-price";
import useGetTotalRevenue from "@/hooks/use-get-total-revenue";

const ViewBox = () => {
  const { theme } = useTheme();
  const { users } = useGetUsers();
  const { orders } = useGetOrders();
  const { products } = useGetProducts();

  const { revenueMonth } = useGetTotalRevenue();

  const total = revenueMonth?.reduce((acc, item) => acc + item.total_income, 0);
  return (
    <>
      <div className="mt-4 mb-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 lg:grid-cols-3 xl:grid-cols-4">
          <div
            className={`shadow-md flex items-center justify-between  rounded-xl ${
              theme === "dark" ? "bg-[#212B36]" : ""
            }`}
          >
            <div className=" flex flex-wrap items-center text-slate-600 p-6 h-auto">
              <div
                className={`p-3 ${
                  theme === "dark"
                    ? "bg-[#2c3642] rounded-full"
                    : "bg-[#e0e5ea] rounded-full"
                }`}
              >
                <Eye />
              </div>
              <div className="ml-3">
                <p className="text-sm text-slate-400">Người dùng</p>
                <span className="text-2xl font-bold">{users?.length}</span>
              </div>
            </div>
          </div>

          <div
            className={`shadow-md flex items-center justify-between  rounded-xl ${
              theme === "dark" ? "bg-[#212B36]" : ""
            }`}
          >
            <div className=" flex items-center text-slate-600 p-6 h-auto">
              <div
                className={`p-3 ${
                  theme === "dark"
                    ? "bg-[#2c3642] rounded-full"
                    : "bg-[#e0e5ea] rounded-full"
                }`}
              >
                <CircleDollarSign className="text-yellow-500" />
              </div>
              <div className="ml-3">
                <p className="text-sm text-slate-400">Tổng doanh thu</p>
                <span className="text-2xl font-bold">{formatPrice(total)}</span>
              </div>
            </div>
          </div>
          <div
            className={`shadow-md flex items-center justify-between  rounded-xl ${
              theme === "dark" ? "bg-[#212B36]" : ""
            }`}
          >
            <div className=" flex items-center text-slate-600 p-6 h-auto">
              <div
                className={`p-3 ${
                  theme === "dark"
                    ? "bg-[#2c3642] rounded-full"
                    : "bg-[#e0e5ea] rounded-full"
                }`}
              >
                <ShoppingBasket color="green" />
              </div>
              <div className="ml-3">
                <p className="text-sm text-slate-400">Sản phẩm</p>
                <span className="text-2xl font-bold">{products?.length}</span>
              </div>
            </div>
            {/* <div className="p-3 flex items-center">
              <Activity className="text-green-500" />
              <span className="ml-2 text-green-500 text-sm font-bold">
                +12.5%
              </span>
            </div> */}
          </div>
          <div
            className={`shadow-md flex items-center justify-between  rounded-xl ${
              theme === "dark" ? "bg-[#212B36]" : ""
            }`}
          >
            <div className=" flex items-center text-slate-600 p-6 h-auto">
              <div
                className={`p-3 ${
                  theme === "dark"
                    ? "bg-[#2c3642] rounded-full"
                    : "bg-[#e0e5ea] rounded-full"
                }`}
              >
                <ShoppingCart color="violet" />
              </div>
              <div className="ml-3">
                <p className="text-sm text-slate-400">Đơn hàng</p>
                <span className="text-2xl font-bold">{orders?.length}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewBox;
