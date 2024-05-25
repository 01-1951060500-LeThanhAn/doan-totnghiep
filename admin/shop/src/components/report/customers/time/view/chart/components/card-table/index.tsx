import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import CustomScrollbarTable from "@/features/custom-scrollbar";
import { ReportCustomer } from "@/types/report";
import { useTheme } from "next-themes";
type Props = {
  data: ReportCustomer[];
};

const ReportCustomerTable = ({ data }: Props) => {
  const { theme } = useTheme();

  return (
    <>
      <div
        className={`${
          theme === "dark" ? "bg-[#212B36] " : "shadow-lg"
        } rounded-lg lg:p-3 my-4`}
      >
        <CustomScrollbarTable>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>
                  <p>Tháng</p>
                </TableHead>
                <TableHead>
                  <p>Số lượng khách hàng mới</p>
                </TableHead>
                <TableHead>
                  <p>Số lượng khách mua hàng</p>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data &&
                data?.map((item) => (
                  <TableRow key={item._id}>
                    <TableCell>
                      <p>{item?._id}</p>
                    </TableCell>
                    <TableCell>
                      <p>{item?.total}</p>
                    </TableCell>
                    <TableCell>
                      <p>{item?.total}</p>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </CustomScrollbarTable>
      </div>
    </>
  );
};

export default ReportCustomerTable;
