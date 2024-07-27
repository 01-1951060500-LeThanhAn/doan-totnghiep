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
import { Badge } from "@/components/ui/badge";
import { Historywarehouse } from "@/types/supplier";
import CustomScrollbarTable from "@/features/custom-scrollbar";
import CustomPagination from "@/features/custom-pagination";
import { formatPrice } from "@/config/format-price";

type Data = {
  theme: string | undefined;
};

export const columns: ColumnDef<Historywarehouse>[] = [
  {
    accessorKey: "code",
    header: "Mã đơn nhập",
    cell: ({ row }) => (
      <p className="capitalize text-blue-500">{row.getValue("code")}</p>
    ),
  },
  {
    accessorKey: "_id",
    header: "",
    cell: ({ row }) => <p className="capitalize">{row.getValue("")}</p>,
  },
  {
    accessorKey: "order_status",
    header: "Trạng thái hàng",
    cell: ({ row, table }) => {
      const { theme } = table.options.meta as Data;
      return (
        <p className="capitalize">
          {row.getValue("order_status") === "entered" ? (
            <>
              {theme === "light" ? (
                <Badge variant="secondary" className="capitalize">
                  Đã nhập
                </Badge>
              ) : (
                <Badge variant="outline" className="capitalize">
                  Đã nhập
                </Badge>
              )}
            </>
          ) : (
            <Badge variant="default" className="capitalize">
              Đang vận chuyển
            </Badge>
          )}
        </p>
      );
    },
  },
  {
    accessorKey: "totalSupplierPay",
    header: "Tổng tiền",
    cell: ({ row }) => (
      <p className="capitalize">
        {formatPrice(row.getValue("totalSupplierPay"))}
      </p>
    ),
  },

  {
    accessorKey: "createdAt",
    header: "Ngày tạo đơn",
    cell: ({ row }) => (
      <p className="capitalize">
        {new Date(row.getValue("createdAt")).toLocaleDateString()}
      </p>
    ),
  },
  {
    accessorKey: "generalId",
    header: "Chi nhánh",
    cell: ({ row }) => <p>{row.getValue("generalId")}</p>,
  },

  {
    accessorKey: "totalQuantity",
    header: "Số lượng nhập",
    cell: ({ row }) => (
      <p className="capitalize">{row.getValue("totalQuantity")}</p>
    ),
  },
  {
    accessorKey: "payment_status",
    header: "Trạng thái sản phẩm",
    cell: ({ row, table }) => {
      const { theme } = table.options.meta as Data;
      return (
        <p className="capitalize">
          {row.getValue("payment_status") === "delivered" ? (
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
          ) : (
            <Badge variant="default" className="capitalize">
              Chưa thanh toán
            </Badge>
          )}
        </p>
      );
    },
  },
];

type Props = {
  data: Historywarehouse[];
};

export default function TableWarehouseSupplier({ data }: Props) {
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
    data: data ?? [],
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
      theme: theme,
      loading,
      setLoading,
    },
  });

  return (
    <CustomScrollbarTable>
      <div
        className={`w-full rounded-xl my-4 ${
          theme === "dark" ? "shadow-md bg-[#212B36]" : "shadow-md"
        }`}
      >
        <div className="flex items-center py-4 px-4">
          <Input
            placeholder="Tìm kiếm mã đơn..."
            value={(table.getColumn("code")?.getFilterValue() as string) ?? ""}
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
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    <p>Chưa có đơn nhập nào.</p>
                  </TableCell>
                </TableRow>
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
  );
}
