import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import HomeLayout from "@/layouts/home-layout";
import { Link, useNavigate } from "react-router-dom";
import TableTerminology from "./table/table-terminology";
import ReturnOrderModal from "@/components/modals/return-orders";

type BreadcumbData = {
  breadcumbItem: string;
  href2: string;
  breadcumbPage: string;
  linkBtn?: string;
  title?: string;
  text?: string;
  file?: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  ordersTitle?: string;
};

export function Custombreadcumb({
  href2,
  breadcumbItem,
  breadcumbPage,
  linkBtn,
  title,
  text,
  file,
  onClick,
  ordersTitle,
}: BreadcumbData) {
  const navigate = useNavigate();
  const handleClick = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    link1?: string
  ) => {
    event.preventDefault();
    navigate(`${link1}`);
  };
  return (
    <HomeLayout className="flex justify-between gap-3 flex-wrap nowrap items-center">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink onClick={(e) => handleClick(e, `/dashboard`)}>
              Trang chủ
            </BreadcrumbLink>
          </BreadcrumbItem>

          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink onClick={(e) => handleClick(e, `${href2}`)}>
              {breadcumbItem}
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{breadcumbPage}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div>
        {linkBtn && (
          <Link to={linkBtn}>
            <Button>
              <p>{title}</p>
            </Button>
          </Link>
        )}

        {file && (
          <Button onClick={onClick} type="submit">
            <span>{file}</span>
          </Button>
        )}

        {text && (
          <AlertDialog>
            <AlertDialogTrigger>
              <Button>
                <p>{text}</p>
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  <p>Bảng giải thích thuật ngữ</p>
                </AlertDialogTitle>
                <AlertDialogDescription>
                  <TableTerminology />
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Đóng</AlertDialogCancel>
                <AlertDialogAction>OK</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        )}

        {ordersTitle && (
          <AlertDialog>
            <AlertDialogTrigger>
              <Button>
                <p>{ordersTitle}</p>
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent className="max-w-5xl">
              <AlertDialogHeader>
                <AlertDialogTitle>
                  <p>Chọn đơn hàng để trả </p>
                </AlertDialogTitle>
                <AlertDialogDescription>
                  <ReturnOrderModal />
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Đóng</AlertDialogCancel>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        )}
      </div>
    </HomeLayout>
  );
}
