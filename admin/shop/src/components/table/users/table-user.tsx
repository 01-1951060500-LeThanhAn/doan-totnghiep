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
import { UserTableData } from "@/types";
import { useTheme } from "next-themes";
import UserPagination from "../../pagination/user-or-product-pagination";
import { Link } from "react-router-dom";

export const columns: ColumnDef<UserTableData>[] = [
  {
    accessorKey: "_id",
    header: "Code",
    cell: ({ row }) => <div className="capitalize">{row.getValue("_id")}</div>,
  },
  {
    accessorKey: "username",
    header: "Username",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("username")}</div>
    ),
  },
  {
    accessorKey: "picture",
    header: "Avatar",
    cell: ({ row }) => (
      <div className="capitalize">
        <img
          className="w-12 h-12 rounded-full object-cover border-2"
          src={
            row.getValue("picture") ||
            "https://raw.githubusercontent.com/Laosing/cute-cat-avatars/master/assets/img/tv.png"
          }
          alt=""
        />
      </div>
    ),
  },
  {
    accessorKey: "email",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Email
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },

  {
    accessorKey: "createdAt",
    header: "Time Created",
    cell: ({ row }) => (
      <div className="capitalize">
        {moment(row.getValue("createdAt")).format("YYYY-MM-DD HH:mm:ss")}
      </div>
    ),
  },
  {
    accessorKey: "action",
    header: "Action",
    cell: ({ row }) => (
      <div className="capitalize flex items-center">
        <Link to={`/dashboard/edit-user/${row.getValue("_id")}`}>
          <Pencil className="cursor-pointer mr-3" color="blue" />
        </Link>
        <Trash className="cursor-pointer" color="red" />
      </div>
    ),
  },
];

type Props = {
  data: UserTableData[];
  type: string;
};

export default function TableUsers({ data, type }: Props) {
  const [startIndex, setStartIndex] = React.useState(0);
  const [endIndex, setEndIndex] = React.useState(4);

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
  });

  return (
    <div
      className={`w-full rounded-xl my-3 xl:my-0 ${
        theme === "dark" ? "shadow-md bg-[#212B36]" : "shadow-md"
      }`}
    >
      <div className="flex items-center py-4 px-4">
        <Input
          placeholder="Filter emails..."
          value={(table.getColumn("email")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("email")?.setFilterValue(event.target.value)
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
            {table.getRowModel().rows?.length ? (
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
