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
import { ChevronDown, EyeIcon, Pencil, Trash2 } from "lucide-react";
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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import HomeLayout from "@/layouts/home-layout";
import { Link } from "react-router-dom";
import CustomScrollbarTable from "@/features/custom-scrollbar";
import { Badge } from "@/components/ui/badge";
import { CustomSkeleton } from "@/features/custom-skeleton";
import CustomPagination from "@/features/custom-pagination";
import { UserDataTableProps } from "@/types";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";

import { AppDispatch } from "@/redux/store";
import StaffDetailView from "../../view";

type Data = {
  theme: string | undefined;
  dispatch: AppDispatch;
  onDeleteStaff: (id: string) => void;
  currentUser: UserDataTableProps;
};

export const columns: ColumnDef<UserDataTableProps>[] = [
  {
    accessorKey: "username",
    header: "Tên nhân viên",
    cell: ({ row }) => (
      <p className="capitalize text-blue-400 ">{row.getValue("username")}</p>
    ),
  },
  {
    accessorKey: "_id",
    header: "",
    cell: ({ row }) => <p className="capitalize">{row.getValue("")}</p>,
  },
  {
    accessorKey: "email",
    header: "Email nhân viên",
    cell: ({ row }) => {
      return <p className="capitalize">{row.getValue("email")}</p>;
    },
  },
  {
    accessorKey: "picture",
    header: "Hình ảnh nhân viên",
    cell: ({ row }) => {
      return (
        <Avatar>
          <AvatarImage
            src={row.getValue("picture")}
            alt={row.getValue("username")}
            className="object-cover"
          />
        </Avatar>
      );
    },
  },
  {
    accessorKey: "phone",
    header: "Số điện thoại",
    cell: ({ row }) => <p className="capitalize">{row.getValue("phone")}</p>,
  },

  {
    accessorKey: "address",
    header: "Địa chỉ",
    cell: ({ row }) => <p className="capitalize">{row.getValue("address")}</p>,
  },
  {
    accessorKey: "role",
    header: "Vai trò",
    cell: ({ row, table }) => {
      const { theme } = table.options.meta as Data;
      return (
        <p className="capitalize">
          {row.getValue("role") === "admin" ? (
            <>
              {theme === "light" ? (
                <Badge variant="secondary" className="capitalize">
                  Quản trị viên
                </Badge>
              ) : (
                <Badge variant="outline" className="capitalize">
                  Quản trị viên
                </Badge>
              )}
            </>
          ) : (
            <>
              {theme === "light" ? (
                <Badge variant="default" className="capitalize">
                  Nhân viên
                </Badge>
              ) : (
                <Badge variant="default" className="capitalize">
                  Nhân viên
                </Badge>
              )}
            </>
          )}
        </p>
      );
    },
  },
  {
    accessorKey: "action",
    header: "Hành động",
    cell: ({ row, table }) => {
      const { onDeleteStaff, currentUser } = table.options.meta as Data;
      const staffId = row.getValue("_id") as string;
      return (
        <div className="flex items-center gap-2">
          <div className="bg-blue-500 cursor-pointer text-white p-2">
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <EyeIcon />
              </AlertDialogTrigger>
              <AlertDialogContent className="max-w-3xl">
                <AlertDialogHeader>
                  <AlertDialogTitle>
                    <p>Thông tin chi tiết tài khoản nhân viên</p>
                  </AlertDialogTitle>
                </AlertDialogHeader>
                <StaffDetailView id={row.getValue("_id")} />
                <AlertDialogFooter>
                  <AlertDialogAction>Đóng</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>

          {currentUser?.isAdmin && (
            <>
              <div className="bg-yellow-500 text-white p-2">
                <Link
                  className=""
                  to={`/dashboard/management/staff/${row.getValue("_id")}/edit`}
                >
                  <Pencil />
                </Link>
              </div>
              <div
                onClick={() => onDeleteStaff(staffId)}
                className="bg-red-500 cursor-pointer text-white p-2"
              >
                <Trash2 />
              </div>
            </>
          )}
        </div>
      );
    },
  },
];

type Props = {
  data: UserDataTableProps[];
  onDeleteStaff: (id: string) => void;
  loading: boolean;
};

export default function StaffTableData({
  data,
  onDeleteStaff,
  loading,
}: Props) {
  const [startIndex, setStartIndex] = React.useState(0);
  const [endIndex, setEndIndex] = React.useState(4);
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const { theme } = useTheme();
  const dispatch = useAppDispatch();
  const { currentUser } = useAppSelector((state) => state.auth);
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
      currentUser,
      dispatch,
      onDeleteStaff,
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
              placeholder="Tìm kiếm tên nhân viên..."
              value={
                (table.getColumn("username")?.getFilterValue() as string) ?? ""
              }
              onChange={(event) =>
                table.getColumn("username")?.setFilterValue(event.target.value)
              }
              className="max-w-sm"
            />
            <Input
              placeholder="Tìm kiếm email nhân viên..."
              value={
                (table.getColumn("email")?.getFilterValue() as string) ?? ""
              }
              onChange={(event) =>
                table.getColumn("email")?.setFilterValue(event.target.value)
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
