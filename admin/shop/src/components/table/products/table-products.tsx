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
import { ArrowUpDown, ChevronDown, Pencil, Trash } from "lucide-react";
import moment from "moment";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
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
import { ProductData } from "@/types";
import { useTheme } from "next-themes";
import UserPagination from "../../pagination/user-or-product-pagination";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { adminApi } from "@/api";

type Data = {
  onDeleteProduct: (productId: string) => void;
  products: ProductData[];
  setProducts: (data: ProductData[]) => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
};

// eslint-disable-next-line react-refresh/only-export-components
export const columns: ColumnDef<ProductData>[] = [
  {
    accessorKey: "title",
    header: "Tên sản phẩm",
    cell: ({ row }) => {
      return (
        <div className="capitalize z-50">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <p>
                  {(row.getValue("title") as string)?.length > 30
                    ? (row.getValue("title") as string).slice(0, 30)
                    : "..."}
                </p>
              </TooltipTrigger>
              <TooltipContent>{row.getValue("title")}</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      );
    },
  },
  {
    accessorKey: "_id",
    header: "Mã sản phẩm",
    cell: ({ row }) => <p className="capitalize">{row.getValue("_id")}</p>,
  },
  {
    accessorKey: "desc",
    header: "Mô tả sản phẩm",
    cell: ({ row }) => {
      return (
        <div className="capitalize z-50">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <p>
                  {(row.getValue("desc") as string)?.length > 30
                    ? (row.getValue("desc") as string).slice(0, 70)
                    : "..."}
                </p>
              </TooltipTrigger>
              <TooltipContent className="w-80">
                {row.getValue("desc")}
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      );
    },
  },
  {
    accessorKey: "img",
    header: "Image",
    cell: ({ row }) => (
      <div className="capitalize">
        <img
          className="w-8 h-8 rounded-full object-cover "
          src={
            row.getValue("img") ||
            "https://raw.githubusercontent.com/Laosing/cute-cat-avatars/master/assets/img/tv.png"
          }
          alt=""
        />
      </div>
    ),
  },
  {
    accessorKey: "ram",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          SSD sản phẩm
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "ssd",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          RAM sản phẩm
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },

  {
    accessorKey: "createdAt",
    header: "Thời gian tạo",
    cell: ({ row }) => (
      <p className="w-24">
        {moment(row.getValue("createdAt")).format("YYYY-MM-DD")}
      </p>
    ),
  },
  {
    accessorKey: "action",
    header: "Action",
    cell: ({ row, table }) => {
      const { setLoading, setProducts, products } = table.options.meta as Data;
      return (
        <div className="capitalize flex items-center">
          <Link to={`/dashboard/edit-product/${row.getValue("_id")}`}>
            <Pencil className="cursor-pointer mr-3" color="blue" />
          </Link>
          <div
            onClick={async () => {
              if (window.confirm("Bạn có chắc chắn xóa sản phầm này không ?")) {
                setLoading(true);
                try {
                  await adminApi.delete(`/product/${row.getValue("_id")}`);

                  const updatedProduct = products.filter(
                    (item) => item._id !== row.getValue("_id")
                  );
                  setProducts(updatedProduct);
                  toast.success("Xóa sản phẩm thành công");
                } catch (error) {
                  setLoading(false);
                  console.log(error);
                }

                setLoading(false);
              }
            }}
          >
            <Trash className="cursor-pointer" color="red" />
          </div>
        </div>
      );
    },
  },
];

type Props = {
  data: ProductData[];
  onDeleteProduct: (productId: string) => void;
  type: string;
  setProducts: (data: ProductData[]) => void;
};

export default function TableProducts({
  data,
  onDeleteProduct,
  type,
  setProducts,
}: Props) {
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
      onDeleteProduct: onDeleteProduct,
      setProducts: setProducts,
      products: data,
      loading,
      setLoading,
    },
  });

  return (
    <div
      className={`w-full rounded-xl my-4 ${
        theme === "dark" ? "shadow-md bg-[#212B36]" : "shadow-md"
      }`}
    >
      <div className="flex items-center py-4 px-4">
        <Input
          placeholder="Filter desc..."
          value={(table.getColumn("desc")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("desc")?.setFilterValue(event.target.value)
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
                  No results.
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
          <UserPagination
            type={type}
            startIndex={startIndex}
            setStartIndex={setStartIndex}
            endIndex={endIndex}
            setEndIndex={setEndIndex}
          />
        </div>
      </div>
    </div>
  );
}
