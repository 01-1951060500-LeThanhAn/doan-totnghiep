import useGetProducts from "@/components/products/hooks/use-get-products";
import * as React from "react";

import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import HomeLayout from "@/layouts/home-layout";
import Heading from "./heading";
import { Custombreadcumb } from "@/features/custom-breadcumb";
import { useTheme } from "next-themes";
import { ProductData } from "@/types/product";
import { Box, Collapse, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import CustomScrollbarTable from "@/features/custom-scrollbar";

type Props = {
  item: ProductData;
  index: number;
};

function Row({ item, index }: Props) {
  const [open, setOpen] = React.useState(false);
  const { theme } = useTheme();
  return (
    <>
      <TableRow>
        <TableCell
          sx={
            theme === "dark"
              ? { color: "white", border: 0 }
              : { color: "black", border: 0 }
          }
        >
          <IconButton
            sx={
              theme === "dark"
                ? { color: "white", border: 0 }
                : { color: "black", border: 0 }
            }
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell
          sx={
            theme === "dark"
              ? { color: "white", border: 0 }
              : { color: "black", border: 0 }
          }
        >
          {index + 1}
        </TableCell>
        <TableCell
          sx={
            theme === "dark"
              ? { color: "white", border: 0 }
              : { color: "black", border: 0 }
          }
        >
          {item.code}
        </TableCell>
        <TableCell
          sx={
            theme === "dark"
              ? { color: "white", border: 0 }
              : { color: "black", border: 0 }
          }
        >
          {item.name_product}
        </TableCell>
        <TableCell
          sx={
            theme === "dark"
              ? { color: "white", border: 0 }
              : { color: "black", border: 0 }
          }
        >
          {item.unit}
        </TableCell>
        <TableCell
          sx={
            theme === "dark"
              ? { color: "white", border: 0 }
              : { color: "black", border: 0 }
          }
        >
          {item.inventory_number}
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell
          style={{
            paddingBottom: 0,
            paddingTop: 0,
            borderBottom: 0,
            border: 0,
          }}
          sx={
            theme === "dark"
              ? { color: "white", border: 0 }
              : { color: "black", border: 0 }
          }
          colSpan={6}
        >
          <Collapse in={open} timeout="auto">
            <Box
              sx={
                theme === "dark"
                  ? {
                      backgroundColor: "#374049",
                      borderRadius: "10px",
                      margin: 1,
                      padding: 2,
                    }
                  : {
                      backgroundColor: "#fff",
                      borderRadius: "10px",
                      boxShadow: "10px 10px 10px rgba(0,0,0,0.1)",
                      margin: 1,
                      padding: 2,
                    }
              }
            >
              <Typography variant="h6" component="div">
                <p className="text-lg">Lịch sử kiểm hàng</p>
              </Typography>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell
                      sx={
                        theme === "dark"
                          ? { color: "white", border: 0 }
                          : { color: "black", border: 0 }
                      }
                    >
                      Mã phiếu kiểm
                    </TableCell>
                    <TableCell
                      sx={
                        theme === "dark"
                          ? { color: "white", border: 0 }
                          : { color: "black", border: 0 }
                      }
                    >
                      Lý do
                    </TableCell>
                    <TableCell
                      sx={
                        theme === "dark"
                          ? { color: "white", border: 0 }
                          : { color: "black", border: 0 }
                      }
                    >
                      Chi nhánh kiểm
                    </TableCell>
                    <TableCell
                      sx={
                        theme === "dark"
                          ? { color: "white", border: 0 }
                          : { color: "black", border: 0 }
                      }
                    >
                      Nhân viên kiểm
                    </TableCell>
                    <TableCell
                      sx={
                        theme === "dark"
                          ? { color: "white", border: 0 }
                          : { color: "black", border: 0 }
                      }
                    >
                      Ngày kiểm
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {item?.stockAdjustmentHistory?.map((item) => (
                    <TableRow
                      style={{
                        padding: "20px 0",
                      }}
                      key={item?.stockAjustmentId?._id}
                    >
                      <TableCell
                        sx={{ color: "blue", border: 0 }}
                        component="th"
                        scope="row"
                      >
                        <Link
                          to={`/dashboard/stock_adjustments/${item?.stockAjustmentId?._id}/detail`}
                        >
                          {item.stockAjustmentId?.code}
                        </Link>
                      </TableCell>
                      <TableCell
                        sx={
                          theme === "dark"
                            ? { color: "white", border: 0 }
                            : { color: "black", border: 0 }
                        }
                      >
                        {item.stockAjustmentId?.desc}
                      </TableCell>
                      <TableCell
                        sx={
                          theme === "dark"
                            ? { color: "white", border: 0 }
                            : { color: "black", border: 0 }
                        }
                      >
                        {item.stockAjustmentId?.generalId?.name}
                      </TableCell>
                      <TableCell
                        sx={
                          theme === "dark"
                            ? { color: "white", border: 0 }
                            : { color: "black", border: 0 }
                        }
                      >
                        {item.stockAjustmentId?.staffId?.username}
                      </TableCell>
                      <TableCell
                        sx={
                          theme === "dark"
                            ? { color: "white", border: 0 }
                            : { color: "black", border: 0 }
                        }
                      >
                        {new Date(
                          item.stockAjustmentId?.createdAt
                        ).toLocaleString()}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}

const ViewStockAdjustmentPage = () => {
  const { products } = useGetProducts();
  const { theme } = useTheme();
  return (
    <>
      <Heading />
      <Custombreadcumb
        href2="/dashboard/report"
        breadcumbItem="Kiểm kho"
        breadcumbPage="Báo cáo kiểm kho hàng"
      />
      <HomeLayout>
        <div
          className={`w-full mb-8 col-span-2 p-3 rounded-lg h-auto ${
            theme === "dark" ? "bg-[#29343F]" : "shadow-md"
          }`}
        >
          <CustomScrollbarTable>
            <TableContainer
              sx={{
                backgroundColor: `${theme === "dark" ? "#29343F" : "#fff"}`,
              }}
              component={Paper}
            >
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell
                      sx={
                        theme === "dark"
                          ? { color: "white", border: 0 }
                          : { color: "black", border: 0 }
                      }
                    />
                    <TableCell
                      sx={
                        theme === "dark"
                          ? { color: "white", border: 0 }
                          : { color: "black", border: 0 }
                      }
                    >
                      <p>STT</p>
                    </TableCell>
                    <TableCell
                      sx={
                        theme === "dark"
                          ? { color: "white", border: 0 }
                          : { color: "black", border: 0 }
                      }
                    >
                      <p>Mã sản phẩm</p>
                    </TableCell>
                    <TableCell
                      sx={
                        theme === "dark"
                          ? { color: "white", border: 0 }
                          : { color: "black", border: 0 }
                      }
                    >
                      <p>Tên sản phẩm</p>
                    </TableCell>
                    <TableCell
                      sx={
                        theme === "dark"
                          ? { color: "white", border: 0 }
                          : { color: "black", border: 0 }
                      }
                    >
                      <p>Loại sản phẩm</p>
                    </TableCell>
                    <TableCell
                      sx={
                        theme === "dark"
                          ? { color: "white", border: 0 }
                          : { color: "black", border: 0 }
                      }
                    >
                      <p>Tồn kho</p>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {products.map((item, index) => (
                    <Row key={item._id} item={item} index={index} />
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </CustomScrollbarTable>
        </div>
      </HomeLayout>
    </>
  );
};

export default ViewStockAdjustmentPage;
