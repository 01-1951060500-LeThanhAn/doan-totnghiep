import { useAppSelector } from "@/hooks/hooks";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Link } from "react-router-dom";

const Header = () => {
  const { currentUser } = useAppSelector((state) => state.auth);

  return (
    <>
      <div className="flex justify-between flex-wrap space-y-3 items-center">
        <div className="">
          <p className="text-slate-600 text-base mb-2 md:mb-0">
            Hello, {currentUser?.username}
          </p>
          <p className="text-2xl font-bold">
            Công ty dịch vụ nguyên phụ liệu may mặc An Việt
          </p>
        </div>
        <div className="flex items-center">
          <div className="mr-2">
            <p className="text-base font-semibold">{currentUser?.username}</p>
            <p className="text-sm text-slate-400">Quản lý kho </p>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Avatar>
                <AvatarImage
                  className="w-12 h-12 rounded-full object-cover"
                  src={currentUser?.picture ? currentUser?.picture : undefined}
                  alt=""
                />
                <AvatarFallback>{currentUser?.username}</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="mr-4">
              <DropdownMenuItem>
                <p>{currentUser?.username}</p>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <p>{currentUser?.email}</p>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <p>{currentUser?.phone}</p>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <p>{currentUser?.address}</p>
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
