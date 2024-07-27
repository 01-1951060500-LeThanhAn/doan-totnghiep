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
import { SupplierData } from "@/types/supplier";
import { useTheme } from "next-themes";
type Props = {
  data: SupplierData[];
};

const DebtSupplierTableData = ({ data }: Props) => {
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
                    <p>Mã nhà cung cấp</p>
                  </TableHead>
                  <TableHead>
                    <p>Tên nhà cung cấp</p>{" "}
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
                        <p>{item?.supplier_code}</p>
                      </TableCell>
                      <TableCell>
                        <p>{item?.supplier_name}</p>
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

export default DebtSupplierTableData;
