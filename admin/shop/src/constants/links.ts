import {
  Home,
  Handshake,
  NotepadText,
  ShoppingCart,
  User2,
  Warehouse,
  Box,
  Receipt,
} from "lucide-react";

const links = [
  { name: "Tổng quan", href: "/dashboard", icon: Home },
  {
    name: "Đơn hàng",
    href: "/dashboard/orders",
    icon: ShoppingCart,
    hideOnMobile: true,
    data: [
      {
        name: "Tạo đơn và giao hàng",
        href: "/dashboard/orders/create",
      },
      {
        name: "Danh sách đơn hàng",
        href: "/dashboard/orders",
      },
      {
        name: "Kết nối đối tác",
        href: "/dashboard/shipping-partner",
      },
      {
        name: "Khách trả hàng",
        href: "/dashboard/return-order",
      },
    ],
  },
  {
    name: "Sản phẩm",
    href: "/dashboard/product",
    icon: Box,
    hideOnMobile: true,
    data: [
      {
        name: "Danh sách sản phẩm",
        href: "/dashboard/product",
      },
      {
        name: "Đặt hàng nhập",
        href: "/dashboard/purchase-order",
      },
      {
        name: "Nhập hàng",
        href: "/dashboard/good-received-note",
      },
      {
        name: "Chuyển hàng",
        href: "/dashboard/delivery-note",
      },
    ],
  },
  {
    name: "Khách Hàng",
    href: "/dashboard/customer",
    icon: User2,
    hideOnMobile: true,
    data: [
      {
        name: "Danh sách khách hàng",
        href: "/dashboard/customer",
      },
      {
        name: "Tạo khách hàng",
        href: "/dashboard/customer/create",
      },
    ],
  },
  {
    name: "Nhà cung cấp",
    href: "/dashboard/supplier",
    icon: Handshake,
  },
  {
    name: "Công nợ",
    href: "/dashboard/vouchers",
    data: [
      {
        name: "Phiếu thu khách hàng",
        href: "/dashboard/receipt_vouchers/customers",
      },
      {
        name: "Phiếu thu nhà cung cấp",
        href: "/dashboard/receipt_vouchers/suppliers",
      },
    ],
    icon: Receipt,
    hideOnMobile: true,
  },
  {
    name: "Báo cáo kho",
    href: "/dashboard/report",
    icon: NotepadText,
    hideOnMobile: true,
    data: [
      {
        name: "Báo cáo nhập kho",
        href: "/dashboard/report/import",
      },
      {
        name: "Báo cáo xuất kho",
        href: "/dashboard/report/export",
      },
      {
        name: "Báo cáo khách hàng",
        href: "/dashboard/report/customer",
      },
      {
        name: "Báo cáo kho",
        href: "/dashboard/report/general",
      },
      {
        name: "Báo cáo tài chính",
        href: "/dashboard/report/finance",
      },
    ],
  },
  {
    name: "Quản lý kho",
    href: "/dashboard/management",
    icon: Warehouse,
  },
];

export default links;
