import { Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { listNavbar } from "@/constant";
import { Link } from "react-router-dom";

const MobileHeader = () => {
  return (
    <>
      <Sheet>
        <SheetTrigger>
          <Menu className="text-orange-500" />
        </SheetTrigger>
        <SheetContent>
          <SheetTitle>
            <p className="my-2 px-4">Welcome to Ecommerce Laptop</p>
          </SheetTitle>

          <SheetDescription>
            {listNavbar.map((item) => (
              <div className="my-3">
                <Link to={`${item.href}`}>
                  <p
                    className="hover:text-yellow-500 px-4 h-7 border border-b-1 border-t-0"
                    key={item.id}
                  >
                    {item.title}
                  </p>
                </Link>
              </div>
            ))}
          </SheetDescription>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default MobileHeader;
