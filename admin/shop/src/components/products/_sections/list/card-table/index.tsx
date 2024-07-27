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
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { ProductTableProps } from "@/types/product";
import CustomScrollbarTable from "@/features/custom-scrollbar";
import { CustomSkeleton } from "@/features/custom-skeleton";
import CustomPagination from "@/features/custom-pagination";

type Data = {
  theme: string | undefined;
};

export const columns: ColumnDef<ProductTableProps>[] = [
  {
    accessorKey: "code",
    header: "Mã sản phẩm",
    cell: ({ row }) => {
      return (
        <Link to={`/dashboard/product/${row.getValue("_id")}/detail`}>
          <p className="capitalize text-blue-400">{row.getValue("code")}</p>
        </Link>
      );
    },
  },
  {
    accessorKey: "name_product",
    header: "Tên sản phẩm",
    cell: ({ row }) => (
      <p className="capitalize">{row.getValue("name_product")}</p>
    ),
  },
  {
    accessorKey: "_id",
    header: "",
    cell: ({ row }) => <p className="capitalize">{row.getValue("")}</p>,
  },

  {
    accessorKey: "img",
    header: "Hình ảnh sản phẩm",
    cell: ({ row }) => (
      <img
        src={`${row.getValue("img")}`}
        className="capitalize  object-contain  w-36 h-12"
      />
    ),
  },
  {
    accessorKey: "type",
    header: "Loại sản phẩm",
    cell: ({ row }) => <p className="capitalize">{row.getValue("type")}</p>,
  },
  {
    accessorKey: "unit",
    header: "Đơn vị sản phẩm",
    cell: ({ row }) => <p>{row.getValue("unit")}</p>,
  },

  {
    accessorKey: "inventory_number",
    header: "Số lượng",
    cell: ({ row }) => {
      return (
        <>
          <p className="capitalize">{row.getValue("inventory_number")}</p>
        </>
      );
    },
  },
  {
    accessorKey: "general",
    header: "Kho quản lý ",
    cell: ({ row }) => <p className="capitalize">{row.getValue("general")}</p>,
  },
  {
    accessorKey: "status",
    header: "Trạng thái sản phẩm",
    cell: ({ row, table }) => {
      const { theme } = table.options.meta as Data;
      const inventoryNumber = row.getValue("inventory_number") as number;
      return (
        <p className="capitalize">
          {inventoryNumber > 0 ? (
            inventoryNumber < 10 ? (
              <>
                <Badge variant="remain" className="capitalize">
                  Sắp hết hàng
                </Badge>
              </>
            ) : (
              <>
                {theme === "light" ? (
                  <Badge variant="secondary" className="capitalize">
                    Còn hàng
                  </Badge>
                ) : (
                  <Badge variant="outline" className="capitalize">
                    Còn hàng
                  </Badge>
                )}
              </>
            )
          ) : (
            <Badge variant="destructive" className="capitalize">
              Hết hàng
            </Badge>
          )}
        </p>
      );
    },
  },
];

type Props = {
  products: ProductTableProps[];
};

export default function ProductTableData({ products }: Props) {
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
    data: products,
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
      theme: theme,
      loading,
      setLoading,
    },
  });

  return (
    <HomeLayout>
      <CustomScrollbarTable>
        <div
          className={`w-full rounded-xl my-2 ${
            theme === "dark" ? "shadow-md bg-[#212B36]" : "shadow-md"
          }`}
        >
          <div className="flex items-center py-4 px-4">
            <Input
              placeholder="Tìm kiếm tên sản phẩm..."
              value={
                (table.getColumn("name_product")?.getFilterValue() as string) ??
                ""
              }
              onChange={(event) =>
                table
                  .getColumn("name_product")
                  ?.setFilterValue(event.target.value)
              }
              className="max-w-sm"
            />
            <Input
              placeholder="Tìm kiếm mã sản phẩm..."
              value={
                (table.getColumn("code")?.getFilterValue() as string) ?? ""
              }
              onChange={(event) =>
                table.getColumn("code")?.setFilterValue(event.target.value)
              }
              className="max-w-sm mx-3"
            />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="ml-auto">
                  <p>Columns </p>
                  <ChevronDown className="ml-2 h-4 w-4" />
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
