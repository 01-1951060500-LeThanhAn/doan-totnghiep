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
import { SupplierData } from "@/types/supplier";
import CustomScrollbarTable from "@/features/custom-scrollbar";
import { CustomSkeleton } from "@/features/custom-skeleton";
import CustomPagination from "@/features/custom-pagination";
import { formatPrice } from "@/config/format-price";

export const columns: ColumnDef<SupplierData>[] = [
  {
    accessorKey: "supplier_code",
    header: "Mã nhà cung cấp",
    cell: ({ row }) => {
      return (
        <Link to={`/dashboard/supplier/${row.getValue("_id")}/detail`}>
          <p className="capitalize text-blue-400">
            {row.getValue("supplier_code")}
          </p>
        </Link>
      );
    },
  },
  {
    accessorKey: "supplier_name",
    header: "Tên nhà cung cấp",
    cell: ({ row }) => (
      <p className="capitalize">{row.getValue("supplier_name")}</p>
    ),
  },
  {
    accessorKey: "_id",
    header: "",
    cell: ({ row }) => <p className="capitalize">{row.getValue("")}</p>,
  },

  {
    accessorKey: "email_supplier",
    header: "Email nhà cung cấp",
    cell: ({ row }) => (
      <p className="capitalize">{row.getValue("email_supplier")}</p>
    ),
  },

  {
    accessorKey: "phone",
    header: "Số điện thoại cung cấp",
    cell: ({ row }) => <p className="capitalize">{row.getValue("phone")}</p>,
  },
  {
    accessorKey: "website",
    header: "Website",
    cell: ({ row }) => <p className="capitalize">{row.getValue("website")}</p>,
  },
  {
    accessorKey: "totalOrders",
    header: "Tổng SL đơn nhập",
    cell: ({ row }) => {
      return <p className="capitalize">{row.getValue("totalOrders")}</p>;
    },
  },
  {
    accessorKey: "totalPrice",
    header: "Tổng tiền nhập",
    cell: ({ row }) => {
      return (
        <p className="capitalize">{formatPrice(row.getValue("totalPrice"))}</p>
      );
    },
  },
];

type Props = {
  data: SupplierData[];
};

export default function SuppliersTableData({ data }: Props) {
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
              placeholder="Tìm kiếm tên nhà cung cấp..."
              value={
                (table
                  .getColumn("supplier_name")
                  ?.getFilterValue() as string) ?? ""
              }
              onChange={(event) =>
                table
                  .getColumn("supplier_name")
                  ?.setFilterValue(event.target.value)
              }
              className="max-w-sm"
            />
            <Input
              placeholder="Tìm kiếm mã nhà cung cấp..."
              value={
                (table
                  .getColumn("supplier_code")
                  ?.getFilterValue() as string) ?? ""
              }
              onChange={(event) =>
                table
                  .getColumn("supplier_code")
                  ?.setFilterValue(event.target.value)
              }
              className="max-w-sm mx-3"
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
