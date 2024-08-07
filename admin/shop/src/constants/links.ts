import {
  Handshake,
  ShoppingCart,
  Warehouse,
  Box,
  Receipt,
  Truck,
  LineChart,
  Palette,
  Users,
} from "lucide-react";

const links = [
  { name: "Trang chủ", href: "/dashboard", icon: Palette },
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
        name: "Tìm kiếm đơn hàng theo ngày ",
        href: "/dashboard/report/shipments",
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
        name: "Đặt hàng ",
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
      {
        name: "Kiểm hàng",
        href: "/dashboard/stock_adjustments",
      },
    ],
  },
  {
    name: "Khách Hàng",
    href: "/dashboard/customer",
    icon: Users,
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
    data: [
      {
        name: "Danh sách nhà cung cấp",
        href: "/dashboard/supplier",
      },
      {
        name: "Tạo nhà cung cấp",
        href: "/dashboard/supplier/create",
      },
    ],
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
    name: "Quản lý kho",
    href: "/dashboard/management",
    icon: Warehouse,
    data: [
      {
        name: "Quản lý nhập kho",
        href: "/dashboard/good-received-note",
      },
      {
        name: "Quản lý xuất kho",
        href: "/dashboard/orders",
      },
      {
        name: "Quản lý kiểm kê hàng hóa",
        href: "/dashboard/stock_adjustments",
      },
    ],
  },
  {
    name: "Vận chuyển",
    href: "/dashboard/shipments",
    icon: Truck,
    hideOnMobile: true,
    data: [
      {
        name: "Quản lý vận đơn",
        href: "/dashboard/shipments",
      },

      {
        name: "Đối tác vận chuyển",
        href: "/dashboard/shipping-partner",
      },
    ],
  },
  {
    name: "Báo cáo",
    href: "/dashboard/report",
    icon: LineChart,
    hideOnMobile: true,
    data: [
      {
        name: "Báo cáo nhập hàng",
        href: "/dashboard/report/grn/analytic_grn",
      },
      {
        name: "Báo cáo đặt hàng",
        href: "/dashboard/report/purchase_orders/analytic_purchase_orders",
      },
      {
        name: "Báo cáo bán hàng",
        href: "/dashboard/report/order/analytic_orders",
      },
      {
        name: "Báo cáo khách hàng",
        href: "/dashboard/report/customer/analytic_customers",
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
];

const linkSub = [
  { name: "Trang chủ", href: "/dashboard", icon: Palette },
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
        name: "Tìm kiếm đơn hàng theo ngày",
        href: "/dashboard/report/shipments",
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
      // {
      //   name: "Đặt hàng nhập",
      //   href: "/dashboard/purchase-order",
      // },
      // {
      //   name: "Nhập hàng",
      //   href: "/dashboard/good-received-note",
      // },
      // {
      //   name: "Chuyển hàng",
      //   href: "/dashboard/delivery-note",
      // },
      // {
      //   name: "Kiểm hàng",
      //   href: "/dashboard/stock_adjustments",
      // },
    ],
  },
  {
    name: "Khách Hàng",
    href: "/dashboard/customer",
    icon: Users,
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
  // {
  //   name: "Nhà cung cấp",
  //   href: "/dashboard/supplier",
  //   icon: Handshake,
  //   data: [
  //     {
  //       name: "Danh sách nhà cung cấp",
  //       href: "/dashboard/supplier",
  //     },
  //     // {
  //     //   name: "Tạo nhà cung cấp",
  //     //   href: "/dashboard/supplier/create",
  //     // },
  //   ],
  // },
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
    name: "Vận chuyển",
    href: "/dashboard/shipments",
    icon: Truck,
    hideOnMobile: true,
    data: [
      {
        name: "Quản lý vận đơn",
        href: "/dashboard/shipments",
      },

      {
        name: "Đối tác vận chuyển",
        href: "/dashboard/shipping-partner",
      },
    ],
  },
  {
    name: "Quản lý kho",
    href: "/dashboard/management",
    icon: Warehouse,
    data: [
      // {
      //   name: "Quản lý nhập kho",
      //   href: "/dashboard/good-received-note",
      // },
      {
        name: "Quản lý xuất kho",
        href: "/dashboard/orders",
      },
      // {
      //   name: "Quản lý kiểm kê hàng hóa",
      //   href: "/dashboard/stock_adjustments",
      // },
    ],
  },
  // {
  //   name: "Báo cáo",
  //   href: "/dashboard/report",
  //   icon: LineChart,
  //   hideOnMobile: true,
  //   data: [
  //     {
  //       name: "Báo cáo nhập hàng",
  //       href: "/dashboard/report/grn/analytic_grn",
  //     },
  //     {
  //       name: "Báo cáo đặt hàng",
  //       href: "/dashboard/report/purchase_orders/analytic_purchase_orders",
  //     },
  //     {
  //       name: "Báo cáo bán hàng",
  //       href: "/dashboard/report/order/analytic_orders",
  //     },
  //     {
  //       name: "Báo cáo khách hàng",
  //       href: "/dashboard/report/customer/analytic_customers",
  //     },
  //     {
  //       name: "Báo cáo kho",
  //       href: "/dashboard/report/general",
  //     },
  //     {
  //       name: "Báo cáo tài chính",
  //       href: "/dashboard/report/finance",
  //     },
  //   ],
  // },
];

export { links, linkSub };
