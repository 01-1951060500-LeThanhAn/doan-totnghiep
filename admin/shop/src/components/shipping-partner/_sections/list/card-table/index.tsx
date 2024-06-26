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
import { ChevronDown, EllipsisVertical } from "lucide-react";
import { Button } from "@/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
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
import { CustomSkeleton } from "@/features/custom-skeleton";
import CustomPagination from "@/features/custom-pagination";
import { PartnerData } from "@/types/partner";
import { Badge } from "@/components/ui/badge";

type Data = {
  theme: string | undefined;
  onDisconnect: (id: string) => void;
  onConnect: (id: string) => void;
};
export const columns: ColumnDef<PartnerData>[] = [
  {
    accessorKey: "code",
    header: "Mã đối tác",
    cell: ({ row }) => {
      return (
        <Link to={`/dashboard/shipping-partner/${row.getValue("_id")}/detail`}>
          <p className="capitalize text-blue-400">{row.getValue("code")}</p>
        </Link>
      );
    },
  },
  {
    accessorKey: "username",
    header: "Tên đối tác",
    cell: ({ row }) => <p className="capitalize">{row.getValue("username")}</p>,
  },
  {
    accessorKey: "_id",
    header: "",
    cell: ({ row }) => <p className="capitalize">{row.getValue("")}</p>,
  },

  {
    accessorKey: "email",
    header: "Email đối tác",
    cell: ({ row }) => <p className="capitalize">{row.getValue("email")}</p>,
  },

  {
    accessorKey: "phone",
    header: "Số điện thoại đối tác",
    cell: ({ row }) => <p className="capitalize">{row.getValue("phone")}</p>,
  },
  {
    accessorKey: "status",
    header: "Trạng thái kết nối",
    cell: ({ row, table }) => {
      const { theme } = table.options.meta as Data;
      return (
        <p className="capitalize">
          {row.getValue("status") === "passive" ? (
            <>
              {theme === "light" ? (
                <Badge variant="destructive" className="capitalize">
                  Ngừng kết nối
                </Badge>
              ) : (
                <Badge variant="destructive" className="capitalize">
                  Ngừng kết nối
                </Badge>
              )}
            </>
          ) : (
            <>
              {theme === "light" ? (
                <Badge variant="secondary" className="capitalize">
                  Đang kết nối
                </Badge>
              ) : (
                <Badge variant="outline" className="capitalize">
                  Đang kết nối
                </Badge>
              )}
            </>
          )}
        </p>
      );
    },
  },
  {
    id: "actions",
    enableHiding: false,
    header: "Hành động",
    cell: ({ table, row }) => {
      const { onDisconnect, onConnect } = table.options.meta as Data;
      const shipId = row.getValue("_id") as string;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <EllipsisVertical className="h-6 w-6" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>
              <div onClick={() => onDisconnect(shipId)}>
                <p>Ngừng liên kết</p>
              </div>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <div onClick={() => onConnect(shipId)}>
                <p>Kích hoạt liên kết</p>
              </div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
type Props = {
  data: PartnerData[];
  onDisconnect: (id: string) => void;
  onConnect: (id: string) => void;
};

export default function SuppliersTableData({
  data,
  onDisconnect,

  onConnect,
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
      products: data,
      theme: theme,
      loading,
      setLoading,
      onDisconnect,

      onConnect,
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
              placeholder="Tìm kiếm tên đối tác..."
              value={
                (table.getColumn("username")?.getFilterValue() as string) ?? ""
              }
              onChange={(event) =>
                table.getColumn("username")?.setFilterValue(event.target.value)
              }
              className="max-w-sm"
            />
            <Input
              placeholder="Tìm kiếm mã đối tác..."
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
