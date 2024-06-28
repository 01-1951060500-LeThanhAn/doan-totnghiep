import { Save, Search } from "lucide-react";
import { Button } from "../ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Separator } from "../ui/separator";
import { links } from "@/constants/links";
import { Link } from "react-router-dom";
type Props = {
  title: string;
  text1: string;
  text2: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

const Header = ({ title, text1, text2, onClick }: Props) => {
  return (
    <>
      <div className="border-b p-6 mb-4 flex flex-wrap gap-3 justify-between items-center">
        <div className="flex items-center">
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
                      className="py-3 hover:bg-slate-900 p-3 rounded-lg"
                      key={index}
                    >
                      <p className="text-slate-400 text-sm">{link.name}</p>
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

          <div className="mx-2">
            <span className="text-slate-400 text-sm">Quay lại trang chính</span>
            <p className="font-semibold">{title}</p>
          </div>
        </div>
        <div className="flex items-center">
          <Button
            onClick={onClick}
            type="submit"
            className="mr-3"
            variant="outline"
          >
            <Save className="mr-2" />
            <span>{text1}</span>
          </Button>
          <Button>
            <span>{text2}</span>
          </Button>
        </div>
      </div>
    </>
  );
};

export default Header;
