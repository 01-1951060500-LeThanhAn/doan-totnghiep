import {
  Activity,
  CircleDollarSign,
  Eye,
  ShoppingBasket,
  ShoppingCart,
} from "lucide-react";
import { useTheme } from "next-themes";

const ViewBox = () => {
  const { theme } = useTheme();
  return (
    <>
      <div className="my-4">
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-3 xl:grid-cols-4">
          <div
            className={`shadow-md flex items-center justify-between  rounded-xl ${
              theme === "dark" ? "bg-[#212B36]" : ""
            }`}
          >
            <div className=" flex items-center text-slate-600 p-6 h-auto">
              <div className="bg-[#f5f4f7] p-3">
                <Eye color="red" />
              </div>
              <div className="ml-3">
                <p className="text-sm text-slate-400">Total Users</p>
                <span className="text-2xl font-bold">20</span>
              </div>
            </div>
            <div className="p-3 flex items-center">
              <Activity className="text-green-500" />
              <span className="ml-2 text-green-500 text-sm font-bold">
                +30%
              </span>
            </div>
          </div>

          <div
            className={`shadow-md flex items-center justify-between  rounded-xl ${
              theme === "dark" ? "bg-[#212B36]" : ""
            }`}
          >
            <div className=" flex items-center text-slate-600 p-6 h-auto">
              <div className="bg-[#f5f4f7] p-3">
                <CircleDollarSign className="text-yellow-500" />
              </div>
              <div className="ml-3">
                <p className="text-sm text-slate-400">Total Income</p>
                <span className="text-2xl font-bold">$20</span>
              </div>
            </div>
            <div className="p-3 flex items-center">
              <Activity className="text-green-500" />
              <span className="ml-2 text-green-500 text-sm font-bold">
                +12.5%
              </span>
            </div>
          </div>
          <div
            className={`shadow-md flex items-center justify-between  rounded-xl ${
              theme === "dark" ? "bg-[#212B36]" : ""
            }`}
          >
            <div className=" flex items-center text-slate-600 p-6 h-auto">
              <div className="bg-[#f5f4f7] p-3">
                <ShoppingBasket color="green" />
              </div>
              <div className="ml-3">
                <p className="text-sm text-slate-400">Total Products</p>
                <span className="text-2xl font-bold">20</span>
              </div>
            </div>
            <div className="p-3 flex items-center">
              <Activity className="text-green-500" />
              <span className="ml-2 text-green-500 text-sm font-bold">
                +12.5%
              </span>
            </div>
          </div>
          <div
            className={`shadow-md flex items-center justify-between  rounded-xl ${
              theme === "dark" ? "bg-[#212B36]" : ""
            }`}
          >
            <div className=" flex items-center text-slate-600 p-6 h-auto">
              <div className="bg-[#f5f4f7] p-3">
                <ShoppingCart color="violet" />
              </div>
              <div className="ml-3">
                <p className="text-sm text-slate-400">Total Order</p>
                <span className="text-2xl font-bold">$20</span>
              </div>
            </div>
            <div className="p-3 flex items-center">
              <Activity className="text-green-500" />
              <span className="ml-2 text-green-500 text-sm font-bold">
                +12.5%
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewBox;
