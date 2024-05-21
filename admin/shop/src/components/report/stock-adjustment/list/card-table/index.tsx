import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import HomeLayout from "@/layouts/home-layout";
import { ProductData } from "@/types/product";
import { useTheme } from "next-themes";
import { Link } from "react-router-dom";
type Props = {
  data: ProductData[];
};

const StockAdjustmentReportTableData = ({ data }: Props) => {
  const { theme } = useTheme();

  return (
    <>
      <HomeLayout>
        <div
          className={`w-full mb-8  p-3 rounded-lg h-auto ${
            theme === "dark" ? "bg-[#29343F]" : "shadow-md"
          }`}
        >
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>STT</TableHead>
                <TableHead>Mã SKU </TableHead>
                <TableHead>Tên sản phẩm</TableHead>
                <TableHead>Đơn vị tính</TableHead>
                <TableHead>Tồn kho</TableHead>
                <TableHead>Đang giao dịch</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data &&
                data?.map((item, index) => (
                  <>
                    <TableRow>
                      <TableCell>
                        <p>{index + 1}</p>
                      </TableCell>
                      <TableCell>
                        <Link to={`/dashboard/product/${item?._id}/detail`}>
                          <p className="text-blue-600">{item?.code}</p>
                        </Link>
                      </TableCell>
                      <TableCell>
                        <p>{item?.name_product}</p>
                      </TableCell>
                      <TableCell>
                        <p>{item?.unit}</p>
                      </TableCell>
                      <TableCell>
                        <p>{item?.inventory_number}</p>
                      </TableCell>

                      <TableCell>
                        <p
                          className={`${
                            item?.pendingOrderQuantity > 0 && "text-blue-600"
                          }`}
                        >
                          {item?.pendingOrderQuantity}
                        </p>
                      </TableCell>
                    </TableRow>
                  </>
                ))}
            </TableBody>
          </Table>
        </div>
      </HomeLayout>
    </>
  );
};

export default StockAdjustmentReportTableData;
