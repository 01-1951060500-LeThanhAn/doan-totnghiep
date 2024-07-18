import { useAppSelector } from "@/hooks/hooks";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Link } from "react-router-dom";
import useGetDetailUser from "@/hooks/use-get-detail-user";

const Header = () => {
  const { currentUser } = useAppSelector((state) => state.auth);

  const { user } = useGetDetailUser({ id: currentUser?._id });

  return (
    <>
      <div className="flex justify-between gap-x-3 space-y-3 items-center">
        <div className="max-w-2xl">
          <p className="text-slate-600 text-base mb-2 md:mb-0">
            Xin chào, {currentUser?.username}
          </p>
          <p className="text-2xl font-bold">
            Công ty dịch vụ nguyên phụ liệu may mặc An Việt
          </p>
        </div>
        <div className="flex justify-center items-center">
          <div className="mr-2 hidden xl:block">
            <p className="text-base font-semibold">{user?.results?.username}</p>
            <p className="text-sm text-slate-400">
              {currentUser?.isAdmin === true ? "Quản lý kho" : "Nhân viên kho"}{" "}
            </p>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Avatar>
                <AvatarImage
                  className="w-12 h-12 rounded-full object-cover"
                  src={
                    user?.results?.picture ? user?.results?.picture : undefined
                  }
                  alt=""
                />
                <AvatarFallback>{user?.results?.username}</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="mr-4">
              <DropdownMenuItem>
                <p>{user?.results?.username}</p>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <p>{user?.results?.email}</p>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <p>{user?.results?.phone}</p>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <p>{user?.results?.address}</p>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link
                  to={`/dashboard/management/staff/${currentUser?._id}/edit`}
                >
                  <p>Chỉnh sửa profile</p>
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </>
  );
};

export default Header;
