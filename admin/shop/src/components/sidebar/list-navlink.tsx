import { buttonVariants } from "@/components/ui/button";
import links from "@/constants/links";
import { cn } from "@/lib/utils";

import { Link, useLocation } from "react-router-dom";

const ListNavLinks = () => {
  const location = useLocation();
  const pathname = location.pathname;

  return (
    <>
      {links.map((link) => {
        const isActive = pathname === link.href;
        const LinkIcon = link.icon;
        return (
          <Link
            to={link.href}
            key={link.name}
            className={buttonVariants({
              variant: isActive ? "secondary" : "ghost",
              className: cn("navLink", {
                "hidden md:flex": link.hideOnMobile,
              }),
              size: "lg",
            })}
          >
            <LinkIcon />
            <p
              className={`${cn("hidden lg:block", {
                "font-extrabold": isActive,
              })}`}
            >
              {" "}
              {link.name}
            </p>
          </Link>
        );
      })}
    </>
  );
};

export default ListNavLinks;
