import HomeLayout from "@/layouts/home-layout";
import { CustomerDetailResponse } from "@/types/customer";
import TableOrderCustomer from "../detail/table/table-customer";
import { useTheme } from "next-themes";

type Props = {
  customer: CustomerDetailResponse;
};
const DetailCustomerPage = ({ customer }: Props) => {
  const { theme } = useTheme();

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
                <p>Tên khách hàng: </p>
                <span className="font-bold">{customer?.results?.username}</span>
              </div>
            </div>
            <div className="my-3">
              <div className="flex items-center justify-between">
                <p className="">Mã khách hàng:</p>
                <span>{customer?.results?.code}</span>
              </div>
            </div>
            <div className="my-3">
              <div className="flex items-center justify-between">
                <p className="">Loại khách hàng:</p>
                <span>{customer?.results?.type}</span>
              </div>
            </div>
            <div className="my-3">
              <div className="flex items-center justify-between">
                <p className="">Email khách hàng:</p>
                <span>{customer?.results?.email}</span>
              </div>
            </div>
            <div className="my-3">
              <div className="flex items-center justify-between">
                <p className="">Nhóm khách hàng:</p>
                <span>{customer?.results?.level}</span>
              </div>
            </div>
            <div className="my-3">
              <div className="flex items-center justify-between">
                <p className="">Số điện thoại:</p>
                <span>{customer?.results?.phone}</span>
              </div>
            </div>
          </div>
          <div
            className={`w-full p-4 rounded-lg h-auto ${
              theme === "dark" ? "bg-[#29343F]" : "shadow-md"
            }`}
          >
            <div>
              <p className="text-xl font-bold mb-3">Thông tin bổ sung</p>
              <div className="flex items-center justify-between">
                <p>Mã số thuế: </p>
                <span className="font-bold">___</span>
              </div>
            </div>
            <div className="my-3">
              <div className="flex items-center justify-between">
                <p className="">Website:</p>
                <span>{customer?.results?.website}</span>
              </div>
            </div>
            <div className="my-3">
              <div className="flex items-center justify-between">
                <p className="">Ngày sinh:</p>
                <span>{customer?.results?.birth}</span>
              </div>
            </div>
            <div className="my-3">
              <div className="flex items-center justify-between">
                <p className="">Mô tả:</p>
                <span>{customer?.results?.note}</span>
              </div>
            </div>
            <div className="my-3">
              <div className="flex items-center justify-between">
                <p className="">Số fax:</p>
                <span>{customer?.results?.tax_code}</span>
              </div>
            </div>
          </div>
        </div>
        <TableOrderCustomer orders={customer?.orders} />
      </HomeLayout>
    </>
  );
};

export default DetailCustomerPage;
