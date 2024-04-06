import { Link, useLocation } from "react-router-dom";
import MobileHeader from "./MobileHeader";
import { Phone, User } from "lucide-react";
import MainLayout from "@/layout/layout";
import DesktopHeader from "./DesktopHeader";
import { listNavbar } from "@/constant";
import Auth from "../auth";
const Header = () => {
  const location = useLocation();
  return (
    <>
      <div className="border-b-1 border-t-0 border pb-2 mb-3  mt-8 ">
        <div className="flex justify-between items-center mx-[2%] md:mx-[5%] xl:mx-[10%]">
          <div className=" flex items-center font-semibold ">
            <Phone className="text-slate-400 w-4 h-4" />
            <p className="text-slate-400 ml-2 font-[400] text-sm">
              Hotline: 0969 713 359
            </p>
          </div>

          <div className="flex items-center">
            <User className="w-4 h-4 text-slate-400 mr-2" />

            <Auth />
            <div className="w-[1px] h-5 bg-slate-400 mx-2"></div>
            <p className="text-sm text-slate-500">Register</p>
          </div>
        </div>
      </div>

      <MainLayout>
        <div className="mt-8">
          <div className=" flex justify-between items-center">
            <Link className=" flex items-center font-bold " to={``}>
              <Link className="" to={`/`}>
                <p className="text-3xl">
                  LTA<span className="text-yellow-500">SHOP</span>
                </p>
              </Link>
            </Link>

            <div className="hidden lg:block">
              <div className="flex items-center">
                {listNavbar.map((item) => (
                  <Link to={item.href}>
                    <p
                      className={`mx-5 text-sm font-[500] ${
                        location.pathname === item.href ? "text-yellow-400" : ""
                      }`}
                      key={item.id}
                    >
                      {item.title}
                    </p>
                  </Link>
                ))}
              </div>
            </div>

            <div className="lg:hidden">
              <MobileHeader />
            </div>
            <div className="hidden lg:block">
              <DesktopHeader />
            </div>
          </div>
        </div>
      </MainLayout>
    </>
  );
};

export default Header;
