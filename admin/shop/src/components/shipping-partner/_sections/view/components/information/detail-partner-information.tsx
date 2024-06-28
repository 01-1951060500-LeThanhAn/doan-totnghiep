import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { DetailPartnerResults } from "@/types/partner";
import { useTheme } from "next-themes";

type Props = {
  data: DetailPartnerResults;
};

const DetailPartnerInformation = ({ data }: Props) => {
  const { theme } = useTheme();

  return (
    <>
      <div
        className={`w-full col-span-2 p-4 rounded-lg h-auto ${
          theme === "dark" ? "bg-[#29343F]" : "shadow-md"
        }`}
      >
        <div className="mb-4">
          <div className="flex items-center gap-3">
            <p className="text-xl font-semibold">Thông tin tổng quan</p>
            {data?.status === "active" ? (
              <Badge variant="outline" className="capitalize">
                <p> Đã kết nối</p>
              </Badge>
            ) : (
              <>
                <Badge variant="destructive" className="capitalize">
                  <p> Ngừng kết nối</p>
                </Badge>
              </>
            )}
          </div>

          <Separator className="my-3" />
        </div>
        <div className="flex justify-between flex-wrap gap-y-3">
          <div className="">
            <div>
              <div className="flex items-center justify-between">
                <p className="min-w-36">Tên đối tác : </p>
                <span className="font-bold">{data?.username}</span>
              </div>
              <div className="flex items-center justify-between my-3">
                <p className="min-w-36">Số điện thoại : </p>
                <span>{data?.phone}</span>
              </div>
              <div className="flex items-center justify-between my-3">
                <p className="min-w-36">Địa chỉ : </p>
                <span>{data?.address}</span>
              </div>
              <div className="flex items-center justify-between my-3">
                <p className="min-w-36">Email : </p>
                <span>{data?.email}</span>
              </div>
            </div>
          </div>
          <div className="">
            <div>
              <div className="flex items-center justify-between">
                <p className="min-w-36">Nhân viên phụ trách : </p>
                <span className="font-bold">
                  {data?.staffIncharge?.username}
                </span>
              </div>
              <div className="flex items-center justify-between my-3">
                <p className="min-w-36">Ghi chú : </p>
                <span>___</span>
              </div>
              <div className="flex items-center justify-between my-3">
                <p className="min-w-36">Mã đối tác : </p>
                <span>{data?.code}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DetailPartnerInformation;
