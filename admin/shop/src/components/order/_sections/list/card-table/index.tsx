import * as React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
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
import { OrdersData } from "@/types/orders";
import { formatPrice } from "@/config/format-price";

type Data = {
  theme: string | undefined;
};

export const columns: ColumnDef<OrdersData>[] = [
  {
    accessorKey: "code",
    header: "Mã đơn hàng",
    cell: ({ row }) => (
      <Link to={`/dashboard/orders/${row.getValue("_id")}/detail`}>
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
    accessorKey: "createdAt",
    header: "Ngày tạo đơn",
    cell: ({ row }) => {
      return (
        <Link to={`/dashboard/orders/${row.getValue("_id")}/detail`}>
          <p className="capitalize">
            {new Date(row.getValue("createdAt")).toLocaleString()}
          </p>
        </Link>
      );
    },
  },
  {
    accessorKey: "received_date",
    header: "Ngày giao đơn",
    cell: ({ row }) => (
      <p className="capitalize">
        {new Date(row.getValue("received_date")).toLocaleDateString()}
      </p>
    ),
  },
  {
    accessorKey: "userId",
    header: "Người tạo",
    cell: ({ row }) => <p className="capitalize">{row.getValue("userId")}</p>,
  },
  {
    accessorKey: "customerId",
    header: "Tên khách hàng",
    cell: ({ row }) => (
      <p className="capitalize">{row.getValue("customerId")}</p>
    ),
  },
  // {
  //   accessorKey: "general",
  //   header: "Kho giao dịch",
  //   cell: ({ row }) => <p className="capitalize">{row.getValue("general")}</p>,
  // },
  {
    accessorKey: "order_status",
    header: "Trạng thái đơn hàng",
    cell: ({ row, table }) => {
      const { theme } = table.options.meta as Data;
      return (
        <p className="capitalize">
          {row.getValue("order_status") === "pending" ? (
            <>
              {theme === "light" ? (
                <Badge variant="default" className="capitalize">
                  Đang giao dịch
                </Badge>
              ) : (
                <Badge variant="default" className="capitalize">
                  Đang giao dịch
                </Badge>
              )}
            </>
          ) : (
            <>
              {row.getValue("order_status") === "cancelled" ? (
                <>
                  {theme === "light" ? (
                    <Badge variant="destructive" className="capitalize">
                      Đã hủy
                    </Badge>
                  ) : (
                    <Badge variant="destructive" className="capitalize">
                      Đã hủy
                    </Badge>
                  )}
                </>
              ) : (
                <>
                  {theme === "light" ? (
                    <Badge variant="secondary" className="capitalize">
                      Hoàn thành
                    </Badge>
                  ) : (
                    <Badge variant="outline" className="capitalize">
                      Hoàn thành
                    </Badge>
                  )}
                </>
              )}
            </>
          )}
        </p>
      );
    },
  },
  {
    accessorKey: "payment_status",
    header: "Trạng thái thanh toán",
    cell: ({ row, table }) => {
      const { theme } = table.options.meta as Data;
      return (
        <p className="capitalize">
          {row.getValue("payment_status") === "unpaid" ? (
            <>
              {theme === "light" ? (
                <Badge variant="default" className="capitalize">
                  Chưa thanh toán
                </Badge>
              ) : (
                <Badge variant="default" className="capitalize">
                  Chưa thanh toán
                </Badge>
              )}
            </>
          ) : (
            <>
              {theme === "light" ? (
                <Badge variant="secondary" className="capitalize">
                  Đã thanh toán
                </Badge>
              ) : (
                <Badge variant="outline" className="capitalize">
                  Đã thanh toán
                </Badge>
              )}
            </>
          )}
        </p>
      );
    },
  },

  {
    accessorKey: "totalCustomerPay",
    header: "Khách phải trả",
    cell: ({ row }) => (
      <p className="capitalize">
        {formatPrice(row.getValue("totalCustomerPay"))}
      </p>
    ),
  },
];

type Props = {
  data: OrdersData[];
};

export default function OrderTableData({ data }: Props) {
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
          className={`rounded-xl mt-3 mb-4 ${
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
                      <TableCell colSpan={9} className="h-24 ">
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
