import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Search } from "lucide-react";

import { links } from "@/constants/links";
import { Link } from "react-router-dom";
import { Separator } from "@/components/ui/separator";
import { useTheme } from "next-themes";

const ListRouteModal = () => {
  const { theme } = useTheme();
  return (
    <>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <div className="p-2 cursor-pointer border rounded-full">
            <Search className="w-5 h-5" />
          </div>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogDescription>Khung tìm kiếm</AlertDialogDescription>

            <Separator />
          </AlertDialogHeader>

          <div className="max-h-[400px] overflow-scroll overflow-x-hidden">
            {links.map((link, index) => (
              <Link to={`${link.href}`}>
                <div
                  className={`py-3 ${
                    theme === "dark"
                      ? "hover:bg-slate-900"
                      : "hover:bg-slate-200"
                  } p-3 rounded-lg`}
                  key={index}
                >
                  <p className="text-sm">{link.name}</p>
                  <p className="font-semibold text-sm">{link.href}</p>
                </div>
              </Link>
            ))}
          </div>
          <AlertDialogFooter>
            <AlertDialogAction>
              <p>Đóng</p>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default ListRouteModal;
