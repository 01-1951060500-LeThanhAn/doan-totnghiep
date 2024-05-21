import HomeLayout from "@/layouts/home-layout";
import { Historywarehouse, SupplierDetailData } from "@/types/supplier";
import { useTheme } from "next-themes";
import TableWarehouseSupplier from "../components/table/table-warehouse-supplier";

type Props = {
  supplier: SupplierDetailData;
};

const DetailSupplierView = ({ supplier }: Props) => {
  const { theme } = useTheme();
  const history_warehouses = supplier?.history_warehouse?.map((item) => ({
    _id: item._id,
    code: item?.code,
    import_price: item?.import_price,
    totalSupplierPay: item?.totalSupplierPay,
    totalQuantity: item?.totalQuantity,
    payment_status: item?.payment_status,
    order_status: item?.order_status,
    createdAt: item?.createdAt,
    updatedAt: item?.updatedAt,

    generalId: item?.generalId?.name,
  }));

  return (
    <>
      <HomeLayout>
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 h-full w-auto">
          <div
            className={`w-full p-4 rounded-lg h-auto ${
              theme === "dark" ? "bg-[#29343F]" : "shadow-md"
            }`}
          >
            <div>
              <p className="text-xl font-bold mb-3">Thông tin cá nhân</p>
              <div className="flex items-center justify-between">
                <p>Tên nhà cung cấp : </p>
                <span className="font-bold">
                  {supplier?.results?.supplier_name}
                </span>
              </div>
            </div>
            <div className="my-3">
              <div className="flex items-center justify-between">
                <p className="">Mã nhà cung cấp:</p>
                <span>{supplier?.results?.supplier_code}</span>
              </div>
            </div>
            <div className="my-3">
              <div className="flex items-center justify-between">
                <p className="">Số điện thoại:</p>
                <span>{supplier?.results?.phone}</span>
              </div>
            </div>
            <div className="my-3">
              <div className="flex items-center justify-between">
                <p className="">Email nhà cung cấp:</p>
                <span>{supplier?.results?.email_supplier}</span>
              </div>
            </div>
            <div className="my-3">
              <div className="flex items-center justify-between">
                <p className="">Địa chỉ nhà cung cấp:</p>
                <span>{supplier?.results?.address_supplier}</span>
              </div>
            </div>
            <div className="my-3">
              <div className="flex items-center justify-between">
                <p className="">Website:</p>
                <span>{supplier?.results?.website}</span>
              </div>
            </div>
          </div>
          <div
            className={`w-full p-4 rounded-lg h-auto ${
              theme === "dark" ? "bg-[#29343F]" : "shadow-md"
            }`}
          >
            <div>
              <p className="text-xl font-bold mb-3">Thông tin khác</p>
              <div className="flex items-center justify-between">
                <p>Mã số thuế: </p>
                <span className="font-bold">
                  {supplier?.results?.supplier_name}
                </span>
              </div>
            </div>
            <div className="my-3">
              <div className="flex items-center justify-between">
                <p className="">Mô tả:</p>
                <span>{supplier?.results?.desc}</span>
              </div>
            </div>
            <div className="my-3">
              <div className="flex items-center justify-between">
                <p className="">Người phụ trách:</p>
                <span>Admin</span>
              </div>
            </div>
            <div className="my-3">
              <div className="flex items-center justify-between">
                <p className="">Gía mặc định:</p>
                <span>___</span>
              </div>
            </div>
            <div className="my-3">
              <div className="flex items-center justify-between">
                <p className="">Hình thức thanh toán:</p>
                <span>___</span>
              </div>
            </div>
            <div className="my-3">
              <div className="flex items-center justify-between">
                <p className="">Công nợ:</p>
                <span>0</span>
              </div>
            </div>
          </div>
        </div>

        <TableWarehouseSupplier
          data={history_warehouses as unknown as Historywarehouse[]}
        />
      </HomeLayout>
    </>
  );
};

export default DetailSupplierView;
