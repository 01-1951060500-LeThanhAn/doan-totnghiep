import * as React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useTheme } from "next-themes";

import HomeLayout from "@/layouts/home-layout";
import { Link } from "react-router-dom";
import CustomScrollbarTable from "@/features/custom-scrollbar";
import { Badge } from "@/components/ui/badge";
import { CustomSkeleton } from "@/features/custom-skeleton";
import CustomPagination from "@/features/custom-pagination";
import { formatPrice } from "@/config/format-price";
import { ReceiptCustomerTableProps } from "@/types/receipt";

type Data = {
  theme: string | undefined;
};

export const columns: ColumnDef<ReceiptCustomerTableProps>[] = [
  {
    accessorKey: "code",
    header: "Mã phiếu thu",
    cell: ({ row }) => (
      <Link
        to={`/dashboard/receipt_vouchers/customers/${row.getValue(
          "_id"
        )}/detail`}
      >
        <p className="capitalize text-blue-400 ">{row.getValue("code")}</p>
      </Link>
    ),
  },
  {
    accessorKey: "_id",
    header: "",
    cell: ({ row }) => <p className="capitalize">{row.getValue("")}</p>,
  },
  {
    accessorKey: "order_code",
    header: "Mã đơn hàng",
    cell: ({ row }) => (
      <Link to={`/dashboard/orders/${row.getValue("order_id")}/detail`}>
        <p className="capitalize text-blue-400 ">
          {row.getValue("order_code")}
        </p>
      </Link>
    ),
  },
  {
    accessorKey: "order_id",
    header: "",
    cell: ({ row }) => <p className="capitalize">{row.getValue("")}</p>,
  },

  {
    accessorKey: "receipt_type",
    header: "Loại phiếu",
    cell: ({ row }) => (
      <p className="capitalize">
        {row.getValue("receipt_type") === "debt-customer" ? (
          <p>Thanh toán cho đơn hàng</p>
        ) : (
          <p>Thu nợ khách hàng</p>
        )}
      </p>
    ),
  },

  {
    accessorKey: "submitter",
    header: "Nhóm khách hàng",
    cell: ({ row }) => (
      <p className="capitalize">
        {row.getValue("submitter") === "customer" ? (
          <p>Khách hàng</p>
        ) : (
          <p>Nhà cung cấp</p>
        )}
      </p>
    ),
  },

  {
    accessorKey: "customer",
    header: "Tên người nộp",
    cell: ({ row }) => <p className="capitalize">{row.getValue("customer")}</p>,
  },
  {
    accessorKey: "payment_status",
    header: "Trạng thái ",
    cell: ({ row, table }) => {
      const { theme } = table.options.meta as Data;
      return (
        <p className="capitalize">
          {row.getValue("payment_status") === "unpaid" ? (
            <>
              {theme === "light" ? (
                <Badge variant="default" className="capitalize">
                  Chưa nhận
                </Badge>
              ) : (
                <Badge variant="default" className="capitalize">
                  Chưa nhận
                </Badge>
              )}
            </>
          ) : (
            <>
              {theme === "light" ? (
                <Badge variant="secondary" className="capitalize">
                  Đã nhận
                </Badge>
              ) : (
                <Badge variant="outline" className="capitalize">
                  Đã nhận
                </Badge>
              )}
            </>
          )}
        </p>
      );
    },
  },
  {
    accessorKey: "staff",
    header: "Nhân viên tạo đơn",
    cell: ({ row }) => <p className="capitalize">{row.getValue("staff")}</p>,
  },
  {
    accessorKey: "totalPrice",
    header: "Số tiền thu",
    cell: ({ row }) => (
      <p className="capitalize">{formatPrice(row.getValue("totalPrice"))}</p>
    ),
  },
];

type Props = {
  data: ReceiptCustomerTableProps[];
};

export default function ReceiptCustomerTableData({ data }: Props) {
  const [startIndex, setStartIndex] = React.useState(0);
  const [endIndex, setEndIndex] = React.useState(4);
  const [loading, setLoading] = React.useState(false);
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const { theme } = useTheme();
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
    meta: {
      products: data,
      theme: theme,
      loading,
      setLoading,
    },
  });

  return (
    <HomeLayout>
      <CustomScrollbarTable>
        <div
          className={`w-full rounded-xl my-4 ${
            theme === "dark" ? "shadow-md bg-[#212B36]" : "shadow-md"
          }`}
        >
          <div className="flex items-center py-4 px-4">
            <Input
              placeholder="Tìm kiếm tên mã đơn..."
              value={
                (table.getColumn("code")?.getFilterValue() as string) ?? ""
              }
              onChange={(event) =>
                table.getColumn("code")?.setFilterValue(event.target.value)
              }
              className="max-w-sm"
            />

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="ml-auto">
                  Columns <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {table
                  .getAllColumns()
                  .filter((column) => column.getCanHide())
                  .map((column) => {
                    return (
                      <DropdownMenuCheckboxItem
                        key={column.id}
                        className="capitalize"
                        checked={column.getIsVisible()}
                        onCheckedChange={(value) =>
                          column.toggleVisibility(!!value)
                        }
                      >
                        {column.id}
                      </DropdownMenuCheckboxItem>
                    );
                  })}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div className="rounded-md border">
            <Table className="">
              <TableHeader className="h-20">
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow
                    className={theme === "dark" ? "bg-[#29343F]" : "#F4F6F8"}
                    key={headerGroup.id}
                  >
                    {headerGroup.headers.map((header) => {
                      return (
                        <TableHead key={header.id}>
                          {header.isPlaceholder
                            ? null
                            : flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                              )}
                        </TableHead>
                      );
                    })}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody>
                {table.getRowModel().rows?.length && !loading ? (
                  table
                    .getRowModel()

                    .rows.slice(startIndex, endIndex)
                    .map((row) => (
                      <TableRow
                        className={
                          theme === "dark"
                            ? "hover:bg-[#29343F]"
                            : "hover:bg-[#F6F7F8]"
                        }
                        key={row.id}
                        data-state={row.getIsSelected() && "selected"}
                      >
                        {row.getVisibleCells().map((cell) => (
                          <TableCell key={cell.id}>
                            {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext()
                            )}
                          </TableCell>
                        ))}
                      </TableRow>
                    ))
                ) : (
                  <>
                    <TableRow>
                      <TableCell colSpan={10} className="h-24 ">
                        <CustomSkeleton />
                      </TableCell>
                    </TableRow>
                  </>
                )}
              </TableBody>
            </Table>
          </div>
          <div className="flex items-center justify-end space-x-2 py-4 px-4">
            <div className="flex-1 text-sm text-muted-foreground">
              {table.getFilteredSelectedRowModel().rows.length} of{" "}
              {table.getFilteredRowModel().rows.length} row(s) selected.
            </div>
            <div className="space-x-2">
              <CustomPagination
                startIndex={startIndex}
                setStartIndex={setStartIndex}
                endIndex={endIndex}
                setEndIndex={setEndIndex}
              />
            </div>
          </div>
        </div>
      </CustomScrollbarTable>
    </HomeLayout>
  );
}