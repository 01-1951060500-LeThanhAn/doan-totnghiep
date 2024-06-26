import { UserData } from "@/types";

type Props = {
  data: UserData;
  id: string;
};

const DetailInforStaff = ({ data }: Props) => {
  return (
    <>
      <div className="grid grid-cols-2 gap-3">
        <div className="col-span-1">
          <div>
            <p>Tên nhân viên </p>
            <p className="font-semibold">{data?.username} </p>
          </div>
          <div className="py-2">
            <p>Email nhân viên </p>
            <p className="font-semibold">{data?.email} </p>
          </div>
        </div>
        <div className="col-span-1">
          <div>
            <p>Địa chỉ nhân viên </p>
            <p className="font-semibold">{data?.address} </p>
          </div>
          <div className="py-2">
            <p>Số điện thoại</p>
            <p className="font-semibold">{data?.phone} </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default DetailInforStaff;
