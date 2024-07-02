import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatPrice } from "@/config/format-price";
import CustomScrollbarTable from "@/features/custom-scrollbar";
import HomeLayout from "@/layouts/home-layout";
import { CustomerData } from "@/types/customer";
import { useTheme } from "next-themes";
type Props = {
  data: CustomerData[];
};

const DebtCustomerTableData = ({ data }: Props) => {
  const { theme } = useTheme();

  return (
    <>
      <HomeLayout>
        <div
          className={`w-full  mb-8 col-span-2 p-3 rounded-lg h-auto ${
            theme === "dark" ? "bg-[#29343F]" : "shadow-md"
          }`}
        >
          <CustomScrollbarTable>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>
                    <p>STT</p>
                  </TableHead>
                  <TableHead>
                    <p>Mã khách hàng</p>
                  </TableHead>
                  <TableHead>
                    <p>Tên khách hàng</p>{" "}
                  </TableHead>

                  <TableHead>
                    <p>Tổng nợ</p>
                  </TableHead>
                  <TableHead>
                    <p>Nợ đã thanh toán</p>
                  </TableHead>
                  <TableHead>
                    <p>Nợ còn lại</p>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data &&
                  data?.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        <p>{index + 1}</p>
                      </TableCell>
                      <TableCell>
                        <p>{item?.code}</p>
                      </TableCell>
                      <TableCell>
                        <p>{item?.username}</p>
                      </TableCell>

                      <TableCell>
                        <p>{formatPrice(item?.balance_increases)}</p>
                      </TableCell>
                      <TableCell>
                        <p>{formatPrice(item?.balance_decreases)}</p>
                      </TableCell>
                      <TableCell>
                        <p>
                          {formatPrice(
                            item?.balance_increases - item?.balance_decreases
                          )}
                        </p>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </CustomScrollbarTable>
        </div>
      </HomeLayout>
    </>
  );
};

export default DebtCustomerTableData;
