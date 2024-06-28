import "./fake.css";
import { useEffect, useRef, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { ChevronLeft, LogOut, Moon, Settings, Sun } from "lucide-react";
import { cn } from "@/lib/utils";
import { Switch } from "@/components/ui/switch";
import { useAppDispatch } from "@/hooks/hooks";
import { logOut } from "@/redux/slices/authSlice";
import { useNavigate } from "react-router-dom";

const MoredropDown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showToggle, setShowToggle] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);
  const { theme, setTheme } = useTheme();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    const handleOutSideClick = (e: MouseEvent) => {
      if (!e.target) return;
      if (e.target && !ref.current?.contains(e.target as Node)) {
        setIsOpen(false);
        setShowToggle(false);
      }
    };

    document.addEventListener("mousedown", handleOutSideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutSideClick);
    };
  }, [ref]);

  const handeLogOut = () => {
    if (window.confirm("Bạn có chắc chắn đăng xuất không")) {
      dispatch(logOut());
      navigate("/dashboard/login");
    }
  };

  return (
    <>
      <DropdownMenu open={isOpen}>
        <DropdownMenuTrigger asChild>
          <Button
            onClick={() => setIsOpen(!isOpen)}
            size={"lg"}
            variant={"ghost"}
            className="md:w-full !justify-start !ml-2  space-x-2 !px-3"
          >
            <Settings className="setting" />
            <div className="hidden lg:block ">
              <p>Cài đặt</p>
            </div>
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          ref={ref}
          className={cn(
            "dark:bg-[#020817] w-64 !rounded-xl !p-0 transition-opacity"
          )}
          align="end"
          alignOffset={-40}
        >
          {!showToggle ? (
            <>
              <DropdownMenuItem className="menuItem">
                <Settings />
                <p className="ml-2">Cài đặt</p>
              </DropdownMenuItem>

              <DropdownMenuItem
                onClick={() => setShowToggle(true)}
                className="menuItem"
              >
                <Moon />
                <p className="ml-2">Dark/Mode</p>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handeLogOut} className="menuItem">
                <LogOut />
                <p className="ml-2">Đăng xuất</p>
              </DropdownMenuItem>
            </>
          ) : (
            <>
              <div className="flex items-center border-b border-gray-200 dark:border-neutral-700 py-3.5 px-2.5">
                <ChevronLeft size={18} onClick={() => setShowToggle(false)} />
                <p className="font-bold ml-1">Switch appearance</p>
                {theme === "dark" ? (
                  <Moon size={20} className="ml-auto" />
                ) : (
                  <Sun size={20} className="ml-auto" />
                )}
              </div>

              <Label htmlFor="dark-mode" className="menuItem">
                <p className="mx-4 my-4">Dark Mode</p>
                <DropdownMenuItem className="ml-auto !p-0">
                  <Switch
                    id="dark-mode"
                    className="ml-auto mr-3"
                    checked={theme === "dark"}
                    onCheckedChange={(checked: boolean) => {
                      setTheme(checked ? "dark" : "light");
                    }}
                  />
                </DropdownMenuItem>
              </Label>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default MoredropDown;
