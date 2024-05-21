import HomeLayout from "@/layouts/home-layout";
import { DetailStockAdjustment } from "@/types/stock_adjustment";
import { useTheme } from "next-themes";
import TableProductStockAdjustmentData from "./components/table";

type Props = {
  data: DetailStockAdjustment;
};
const DetailStockAdjustmentView = ({ data }: Props) => {
  const { theme } = useTheme();
  return (
    <>
      <HomeLayout>
        <div className="grid  grid-cols-1 xl:grid-cols-3 xl:gap-4 gap-y-4 h-full w-auto">
          <div
            className={`w-full  col-span-2 p-4 rounded-lg h-auto ${
              theme === "dark" ? "bg-[#29343F]" : "shadow-md"
            }`}
          >
            <div className="flex gap-x-8 justify-between">
              <div className="w-1/2">
                <p className="text-xl font-bold mb-3">
                  Thông tin phiếu kiểm hàng{" "}
                </p>
                <div className="flex items-center justify-between">
                  <p>Mã phiếu kiểm : </p>
                  <span className="text-blue-400">{data?.code}</span>
                </div>
                <div className="flex items-center justify-between my-3">
                  <p>Chi nhánh kiểm : </p>
                  <span className="font-bold">{data?.generalId?.name}</span>
                </div>
                <div className="flex items-center justify-between my-3">
                  <p>Nhân viên tạo : </p>
                  <span className="text-sky-600">
                    {data?.staffId?.username}
                  </span>
                </div>
                <div className="flex items-center justify-between my-3">
                  <p>Nhân viên kiểm : </p>
                  <span className="text-sky-600">
                    {data?.staffId?.username}
                  </span>
                </div>
                <div className="flex items-center justify-between my-3">
                  <p>Nhân viên cân bằng : </p>
                  <span className="text-sky-600">
                    {data?.staffId?.username}
                  </span>
                </div>
              </div>
              <div className="w-1/2 mt-2">
                <p className="text-xl font-bold mb-3 my-8"></p>
                <div className="flex items-center justify-between my-3">
                  <p>Ngày tạo phiếu kiểm : </p>
                  <span>{new Date(data?.createdAt).toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between my-3">
                  <p>Ngày cân bằng: </p>
                  <span>{new Date(data?.updatedAt).toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>
          <div
            className={`w-full p-4 rounded-lg h-auto ${
              theme === "dark" ? "bg-[#29343F]" : "shadow-md"
            }`}
          >
            <div>
              <p className="text-xl font-bold mb-3">Thông tin bổ sung </p>
              <div className="flex items-center justify-between">
                <p>Tags: </p>
                <span>___</span>
              </div>
              <div className="flex items-center justify-between my-2">
                <p>Ghi chú: </p>
                <span>{data?.desc}</span>
              </div>
            </div>
          </div>
        </div>

        <div
          className={`w-full mt-4 mb-16 p-4 rounded-lg h-auto ${
            theme === "dark" ? "bg-[#29343F]" : "shadow-md"
          }`}
        >
          <TableProductStockAdjustmentData
            data={data as DetailStockAdjustment}
          />
        </div>
      </HomeLayout>
    </>
  );
};

export default DetailStockAdjustmentView;
