import { buttonVariants } from "@/components/ui/button";
import { links, linkSub } from "@/constants/links";
import { cn } from "@/lib/utils";

import { Link, useLocation } from "react-router-dom";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { useAppSelector } from "@/hooks/hooks";

const ListNavLinks = () => {
  const location = useLocation();
  const pathname = location.pathname;
  const { currentUser } = useAppSelector((state) => state.auth);

  return (
    <>
      {currentUser && currentUser?.role === "admin"
        ? links.map((link, index) => {
            const isActive = pathname === link.href;
            const LinkIcon = link.icon;
            return (
              <TooltipProvider key={index}>
                <Tooltip>
                  <TooltipTrigger>
                    <Link
                      to={link.href}
                      key={link.name || index}
                      className={buttonVariants({
                        variant: isActive ? "secondary" : "ghost",
                        className: cn("navLink", {
                          " md:flex": link.hideOnMobile,
                        }),
                        size: "lg",
                      })}
                    >
                      <LinkIcon />
                      <p
                        className={`${cn("hidden lg:block", {
                          "": isActive,
                        })}`}
                      >
                        {link.name}
                      </p>
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent>
                    {link?.data?.length &&
                      link.data?.map((item, index) => (
                        <Link
                          to={item.href}
                          key={index}
                          className={buttonVariants({
                            variant: isActive ? "secondary" : "ghost",
                            className: cn("navLink", {
                              " md:flex ": link.hideOnMobile,
                            }),
                            size: "lg",
                          })}
                        >
                          <p
                            className={`${cn(" lg:block", {
                              "": isActive,
                            })}`}
                          >
                            {item.name}
                          </p>
                        </Link>
                      ))}
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            );
          })
        : linkSub.map((link, index) => {
            const isActive = pathname === link.href;
            const LinkIcon = link.icon;
            return (
              <TooltipProvider key={index}>
                <Tooltip>
                  <TooltipTrigger>
                    <Link
                      to={link.href}
                      key={link.name || index}
                      className={buttonVariants({
                        variant: isActive ? "secondary" : "ghost",
                        className: cn("navLink", {
                          " md:flex": link.hideOnMobile,
                        }),
                        size: "lg",
                      })}
                    >
                      <LinkIcon />
                      <p
                        className={`${cn("hidden lg:block", {
                          "": isActive,
                        })}`}
                      >
                        {link.name}
                      </p>
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent>
                    {link?.data?.length &&
                      link.data?.map((item, index) => (
                        <Link
                          to={item.href}
                          key={index}
                          className={buttonVariants({
                            variant: isActive ? "secondary" : "ghost",
                            className: cn("navLink", {
                              " md:flex ": link.hideOnMobile,
                            }),
                            size: "lg",
                          })}
                        >
                          <p
                            className={`${cn(" lg:block", {
                              "": isActive,
                            })}`}
                          >
                            {item.name}
                          </p>
                        </Link>
                      ))}
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            );
          })}
    </>
  );
};

export default ListNavLinks;
