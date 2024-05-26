import CustomerPage from "@/components/customers/_sections/list/page";
import DetailCustomerPage from "@/components/customers/detail/page";
import DeliveryNotePage from "@/components/delivery-note/_sections/list/page";
import DetailDeliveryNotepage from "@/components/delivery-note/detail/page";
import DetailGoodReceivedNotePage from "@/components/good-received-note/detail/page";
import DetailCategoryPage from "@/components/management/category/detail/page";
import DetailManagementGeneralPage from "@/components/management/general/detail/page";
import GeneralManagementPage from "@/components/management/general/list/_sections/general";
import DetailOrderPage from "@/components/order/detail/page";
import ProductPage from "@/components/products/_sections/list/page";
import ProductDetailPage from "@/components/products/detail/page";
import DetailPurchaseOrderPage from "@/components/purchase-order/detail/page";
import DetailReceiptSupplierPage from "@/components/receipts/receipt-supplier/detail/page";
import DetailReceiptCustomerPage from "@/components/receipts/receipts-customer/detail/page";
import ReportCustomerByGroupPage from "@/components/report/customers/group/page";
import ReportCustomerByLocationPage from "@/components/report/customers/location/page";
import ReportCustomerByProductPage from "@/components/report/customers/product/page";
import ReportCustomerByTimePage from "@/components/report/customers/time/page";
import DebtCustomersPage from "@/components/report/finance/debt-customers/list/page";
import DebtSuppliersPage from "@/components/report/finance/debt-suppliers/list/page";
import DetailReportGeneralPage from "@/components/report/general/detail/page";
import DetailReportInventoriesPage from "@/components/report/general/view";
import ReportRevenuePage from "@/components/report/orders/revenue/page";
import ReportShipmentPage from "@/components/report/orders/shipments/page";
import DetailReturnOrderPage from "@/components/return-order/detail/page";
import DetailShippingPartnerPage from "@/components/shipping-partner/detail/page";
import DetailStockAdjustmentPage from "@/components/stock-adjustments/detail/page";
import SupplierPage from "@/components/suppliers/_sections/list/page";
import DetailSupplierPage from "@/components/suppliers/detail/page";
import DashBoardLayout from "@/layouts/layout";
import AddCustomerPage from "@/pages/customer/add/page";
import EditCustomerPage from "@/pages/customer/edit/page";
import AddDeliveryNotePage from "@/pages/delivery-note/add/page";
import AddGoodReceivedNotePage from "@/pages/good-received-note/add/page";
import ViewGoodReceivedPage from "@/pages/good-received-note/page";
import HomePage from "@/pages/home/page";
import LoginPage from "@/pages/login/page";
import AddCategoryPage from "@/pages/management/category/add/page";
import ViewCategoryPage from "@/pages/management/category/page";
import AddGeneralPage from "@/pages/management/general/add/page";
import EditGeneralPage from "@/pages/management/general/edit/page";
import GeneralPage from "@/pages/management/general/page";
import EditAdjustmentPricePage from "@/pages/management/price/edit/page";
import AdjustmentPricePage from "@/pages/management/price/page";
import AddStaffPage from "@/pages/management/staff/add/page";
import EditStaffPage from "@/pages/management/staff/edit/page";
import StaffPage from "@/pages/management/staff/page";
import AddOrderPage from "@/pages/order/add/page";
import ViewOrderPage from "@/pages/order/page";
import AddProductPage from "@/pages/products/product-add/page";
import EditProductPage from "@/pages/products/product-edit/page";
import AddPurchaseOrderPage from "@/pages/purchase-order/add/page";
import ViewPurchaseOrderPage from "@/pages/purchase-order/page";
import AddReceiptCustomerPage from "@/pages/receipts/receipt-customer/add/page";
import ViewReceiptCustomerPage from "@/pages/receipts/receipt-customer/page";
import AddReceiptSupplierPage from "@/pages/receipts/receipt-supplier/add/page";
import ViewReceiptSupplierPage from "@/pages/receipts/receipt-supplier/page";
import ReportCustomerPage from "@/pages/report/customers/page";
import FinancePage from "@/pages/report/finance/page";
import OverStockingPage from "@/pages/report/general/overstocking/page";
import ReportGeneralPage from "@/pages/report/general/page";
import ReportTransactionPage from "@/pages/report/general/transaction/page";
import ReportOrderPage from "@/pages/report/orders/page";
import ReportPage from "@/pages/report/page";
import StockAdjustmentPage from "@/pages/report/stock-adjustments/page";
import AddReturnOrderPage from "@/pages/return-order/add/page";
import ViewReturnOrderPage from "@/pages/return-order/page";
import ViewShipmentsPage from "@/pages/shipments/page";
import AddShippingPartnerPage from "@/pages/shipping-partner/add/page";
import EditShippingPartnerPage from "@/pages/shipping-partner/edit/page";
import ViewShippingPartnerPage from "@/pages/shipping-partner/page";
import AddStockAdjustmentPage from "@/pages/stock-adjustments/add/page";
import ViewStockAdjustmentPage from "@/pages/stock-adjustments/page";
import AddSupplierPage from "@/pages/supplers/suppliers-add/page";
import EditSupplierPage from "@/pages/supplers/suppliers-edit/page";

const routes = [
  {
    path: "/dashboard",
    element: <HomePage />,
    name: "Dashboard",
  },
  {
    path: "/dashboard/login",
    element: <LoginPage />,
    name: "Đăng nhập",
  },
  {
    path: "/dashboard/add-product",
    element: (
      <DashBoardLayout>
        <AddProductPage />
      </DashBoardLayout>
    ),
    name: "Thêm sản phẩm",
  },
  {
    path: "/dashboard/product",
    element: (
      <DashBoardLayout>
        <ProductPage />
      </DashBoardLayout>
    ),
    name: "Danh sách sản phẩm",
  },
  {
    path: "/dashboard/product/:productId/edit",
    element: (
      <DashBoardLayout>
        <EditProductPage />
      </DashBoardLayout>
    ),
    name: "Chỉnh sửa sản phẩm",
  },
  {
    path: "/dashboard/product/:productId/detail",
    element: (
      <DashBoardLayout>
        <ProductDetailPage />
      </DashBoardLayout>
    ),
    name: "Chi tiết sản phẩm",
  },
  {
    path: "/dashboard/customer/create",
    element: (
      <DashBoardLayout>
        <AddCustomerPage />
      </DashBoardLayout>
    ),
    name: "Thêm khách hàng",
  },
  {
    path: "/dashboard/customer",
    element: (
      <DashBoardLayout>
        <CustomerPage />
      </DashBoardLayout>
    ),
    name: "Danh sách khách hàng",
  },
  {
    path: "/dashboard/customer/:customerId/detail",
    element: (
      <DashBoardLayout>
        <DetailCustomerPage />
      </DashBoardLayout>
    ),
    name: "Thông tin khách hàng",
  },
  {
    path: "/dashboard/customer/:customerId/edit",
    element: (
      <DashBoardLayout>
        <EditCustomerPage />
      </DashBoardLayout>
    ),
    name: "Chỉnh sửa khách hàng",
  },
  {
    path: "/dashboard/supplier",
    element: (
      <DashBoardLayout>
        <SupplierPage />
      </DashBoardLayout>
    ),
    name: "Danh sách nhà cung cấp",
  },
  {
    path: "/dashboard/supplier/create",
    element: (
      <DashBoardLayout>
        <AddSupplierPage />
      </DashBoardLayout>
    ),
    name: "Thêm nhà cung cấp",
  },
  {
    path: "/dashboard/supplier/:supplierId/edit",
    element: (
      <DashBoardLayout>
        <EditSupplierPage />
      </DashBoardLayout>
    ),
    name: "Chỉnh sửa nhà cung cấp",
  },
  {
    path: "/dashboard/supplier/:supplierId/detail",
    element: (
      <DashBoardLayout>
        <DetailSupplierPage />
      </DashBoardLayout>
    ),
    name: "Thông tin nhà cung cấp",
  },

  {
    path: "/dashboard/good-received-note",
    element: (
      <DashBoardLayout>
        <ViewGoodReceivedPage />
      </DashBoardLayout>
    ),
    name: "Danh sách đơn nhập hàng",
  },
  {
    path: "/dashboard/good-received-note/create",
    element: (
      <DashBoardLayout>
        <AddGoodReceivedNotePage />
      </DashBoardLayout>
    ),
    name: "Tạo đơn nhập hàng",
  },
  {
    path: "/dashboard/good-received-note/:grnId/detail",
    element: (
      <DashBoardLayout>
        <DetailGoodReceivedNotePage />
      </DashBoardLayout>
    ),
    name: "Chi tiết đơn nhập hàng",
  },
  {
    path: "/dashboard/stock_adjustments",
    element: (
      <DashBoardLayout>
        <ViewStockAdjustmentPage />
      </DashBoardLayout>
    ),
    name: "Danh sách đơn kiểm hàng",
  },
  {
    path: "/dashboard/stock_adjustments/create",
    element: (
      <DashBoardLayout>
        <AddStockAdjustmentPage />
      </DashBoardLayout>
    ),
    name: "Tạo đơn kiểm hàng",
  },
  {
    path: "/dashboard/stock_adjustments/:stockAdjustmentId/detail",
    element: (
      <DashBoardLayout>
        <DetailStockAdjustmentPage />
      </DashBoardLayout>
    ),
    name: "Chi tiết đơn kiểm hàng",
  },
  {
    path: "/dashboard/purchase-order",
    element: (
      <DashBoardLayout>
        <ViewPurchaseOrderPage />
      </DashBoardLayout>
    ),
    name: "Danh sách đơn đặt hàng",
  },
  {
    path: "/dashboard/purchase-order/create",
    element: (
      <DashBoardLayout>
        <AddPurchaseOrderPage />
      </DashBoardLayout>
    ),
    name: "Tạo đơn đặt hàng",
  },
  {
    path: "/dashboard/purchase-order/:purchaseOrderId/detail",
    element: (
      <DashBoardLayout>
        <DetailPurchaseOrderPage />
      </DashBoardLayout>
    ),
    name: "Chi tiết đơn đặt hàng",
  },
  {
    path: "/dashboard/orders",
    element: (
      <DashBoardLayout>
        <ViewOrderPage />
      </DashBoardLayout>
    ),
    name: "Danh sách đơn hàng",
  },
  {
    path: "/dashboard/orders/create",
    element: (
      <DashBoardLayout>
        <AddOrderPage />
      </DashBoardLayout>
    ),
    name: "Tạo đơn hàng",
  },
  {
    path: "/dashboard/orders/:orderId/detail",
    element: (
      <DashBoardLayout>
        <DetailOrderPage />
      </DashBoardLayout>
    ),
    name: "Chi tiết đơn hàng",
  },
  {
    path: "/dashboard/shipping-partner",
    element: (
      <DashBoardLayout>
        <ViewShippingPartnerPage />
      </DashBoardLayout>
    ),
    name: "Danh sách đối tác vận chuyển",
  },

  {
    path: "/dashboard/shipping-partner/create",
    element: (
      <DashBoardLayout>
        <AddShippingPartnerPage />
      </DashBoardLayout>
    ),
    name: "Tạo đối tác vận chuyển",
  },
  {
    path: "/dashboard/shipping-partner/:shipId/detail",
    element: (
      <DashBoardLayout>
        <DetailShippingPartnerPage />
      </DashBoardLayout>
    ),
    name: "Thông tin đối tác vận chuyển",
  },
  {
    path: "/dashboard/shipping-partner/:shipId/edit",
    element: (
      <DashBoardLayout>
        <EditShippingPartnerPage />
      </DashBoardLayout>
    ),
    name: "Chỉnh sửa đối tác vận chuyển",
  },
  {
    path: "/dashboard/shipments",
    element: (
      <DashBoardLayout>
        <ViewShipmentsPage />
      </DashBoardLayout>
    ),
    name: "Danh sách đối tác vận chuyển",
  },
  {
    path: "/dashboard/management",
    element: (
      <DashBoardLayout>
        <GeneralPage />
      </DashBoardLayout>
    ),
    name: "Quản lý kho",
  },
  {
    path: "/dashboard/management/general",
    element: (
      <DashBoardLayout>
        <GeneralManagementPage />
      </DashBoardLayout>
    ),
    name: "Quản lý kho",
  },
  {
    path: "/dashboard/management/general/create",
    element: (
      <DashBoardLayout>
        <AddGeneralPage />
      </DashBoardLayout>
    ),
    name: "Tạo kho hàng",
  },
  {
    path: "/dashboard/management/general/:generalId/detail",
    element: (
      <DashBoardLayout>
        <DetailManagementGeneralPage />
      </DashBoardLayout>
    ),
    name: "Thông tin kho hàng",
  },
  {
    path: "/dashboard/management/general/:generalId/edit",
    element: (
      <DashBoardLayout>
        <EditGeneralPage />
      </DashBoardLayout>
    ),
    name: "Chỉnh sửa Thông tin kho hàng",
  },
  {
    path: "/dashboard/management/staff",
    element: (
      <DashBoardLayout>
        <StaffPage />
      </DashBoardLayout>
    ),
    name: "Danh sách nhân viên",
  },
  {
    path: "/dashboard/management/staff/create",
    element: (
      <DashBoardLayout>
        <AddStaffPage />
      </DashBoardLayout>
    ),
    name: "Tạo mới nhân viên",
  },
  {
    path: "/dashboard/management/staff/:staffId/edit",
    element: (
      <DashBoardLayout>
        <EditStaffPage />
      </DashBoardLayout>
    ),
    name: "Chỉnh sửa thông tin nhân viên",
  },
  {
    path: "/dashboard/report/general/detail",
    element: (
      <DashBoardLayout>
        <DetailReportGeneralPage />
      </DashBoardLayout>
    ),
    name: "Báo cáo tồn kho chi tiết",
  },
  {
    path: "/dashboard/report/general/:generalId/inventories",
    element: (
      <DashBoardLayout>
        <DetailReportInventoriesPage />
      </DashBoardLayout>
    ),
    name: "Báo cáo tồn kho chi tiết",
  },
  {
    path: "/dashboard/delivery-note",
    element: (
      <DashBoardLayout>
        <DeliveryNotePage />
      </DashBoardLayout>
    ),
    name: "Danh sách phiếu chuyển hàng",
  },
  {
    path: "/dashboard/delivery-note/create",
    element: (
      <DashBoardLayout>
        <AddDeliveryNotePage />
      </DashBoardLayout>
    ),
    name: "Tạo phiếu chuyển hàng",
  },
  {
    path: "/dashboard/delivery-note/:deliveryNoteId/detail",
    element: (
      <DashBoardLayout>
        <DetailDeliveryNotepage />
      </DashBoardLayout>
    ),
    name: "Thông tin phiếu chuyển hàng",
  },
  {
    path: "/dashboard/management/category",
    element: (
      <DashBoardLayout>
        <ViewCategoryPage />
      </DashBoardLayout>
    ),
    name: "Quản lý loại sản phẩm",
  },
  {
    path: "/dashboard/management/category/create",
    element: (
      <DashBoardLayout>
        <AddCategoryPage />
      </DashBoardLayout>
    ),
    name: "Tạo loại sản phẩm",
  },
  {
    path: "/dashboard/management/category/:categoryId/detail",
    element: (
      <DashBoardLayout>
        <DetailCategoryPage />
      </DashBoardLayout>
    ),
    name: "Chi tiết loại sản phẩm",
  },
  {
    path: "/dashboard/management/adjustment_price",
    element: (
      <DashBoardLayout>
        <AdjustmentPricePage />
      </DashBoardLayout>
    ),
    name: "Quản lý giá cả",
  },
  {
    path: "/dashboard/management/adjustment_price/:adjustmentpriceId/edit",
    element: (
      <DashBoardLayout>
        <EditAdjustmentPricePage />
      </DashBoardLayout>
    ),
    name: "Chỉnh sửa giá cả",
  },
  {
    path: "/dashboard/return-order",
    element: (
      <DashBoardLayout>
        <ViewReturnOrderPage />
      </DashBoardLayout>
    ),
    name: "Danh sách phiếu trả hàng",
  },
  {
    path: "/dashboard/return-orders/:returnOrderId/create",
    element: (
      <DashBoardLayout>
        <AddReturnOrderPage />
      </DashBoardLayout>
    ),
    name: "Tạo phiếu trả hàng",
  },
  {
    path: "/dashboard/return-orders/:returnOrderId/detail",
    element: (
      <DashBoardLayout>
        <DetailReturnOrderPage />
      </DashBoardLayout>
    ),
    name: "Thông tin phiếu trả hàng",
  },
  {
    path: "/dashboard/receipt_vouchers/customers",
    element: (
      <DashBoardLayout>
        <ViewReceiptCustomerPage />
      </DashBoardLayout>
    ),
    name: "Danh sách phiếu công nợ khách hàng",
  },
  {
    path: "/dashboard/receipt_vouchers/customers/:receiptId/detail",
    element: (
      <DashBoardLayout>
        <DetailReceiptCustomerPage />
      </DashBoardLayout>
    ),
    name: "Thông tin phiếu công nợ khách hàng",
  },
  {
    path: "/dashboard/receipt_vouchers/customers/create",
    element: (
      <DashBoardLayout>
        <AddReceiptCustomerPage />
      </DashBoardLayout>
    ),
    name: "Tạo phiếu công nợ khách hàng",
  },
  {
    path: "/dashboard/receipt_vouchers/suppliers",
    element: (
      <DashBoardLayout>
        <ViewReceiptSupplierPage />
      </DashBoardLayout>
    ),
    name: "Danh sách phiếu công nợ nhà cung cấp",
  },
  {
    path: "/dashboard/receipt_vouchers/suppliers/:receiptId/detail",
    element: (
      <DashBoardLayout>
        <DetailReceiptSupplierPage />
      </DashBoardLayout>
    ),
    name: "Thông tin phiếu công nợ nhà cung cấp",
  },
  {
    path: "/dashboard/receipt_vouchers/suppliers/create",
    element: (
      <DashBoardLayout>
        <AddReceiptSupplierPage />
      </DashBoardLayout>
    ),
    name: "Tạo phiếu công nợ nhà cung cấp",
  },
  {
    path: "/dashboard/report",
    element: (
      <DashBoardLayout>
        <ReportPage />
      </DashBoardLayout>
    ),
    name: "Báo cáo",
  },
  {
    path: "/dashboard/report/general",
    element: (
      <DashBoardLayout>
        <ReportGeneralPage />
      </DashBoardLayout>
    ),
    name: "Báo cáo kho",
  },
  {
    path: "/dashboard/report/finance",
    element: (
      <DashBoardLayout>
        <FinancePage />
      </DashBoardLayout>
    ),
    name: "Báo cáo tài chính",
  },
  {
    path: "/dashboard/report/stock_adjustment",
    element: (
      <DashBoardLayout>
        <StockAdjustmentPage />
      </DashBoardLayout>
    ),
    name: "Báo cáo kiểm kê hàng hóa",
  },
  {
    path: "/dashboard/report/debt/customers",
    element: (
      <DashBoardLayout>
        <DebtCustomersPage />
      </DashBoardLayout>
    ),
    name: "Báo cáo công nợ khách hàng",
  },
  {
    path: "/dashboard/report/debt/suppliers",
    element: (
      <DashBoardLayout>
        <DebtSuppliersPage />
      </DashBoardLayout>
    ),
    name: "Báo cáo công nợ nhà cung cấp",
  },
  {
    path: "/dashboard/report/transaction",
    element: (
      <DashBoardLayout>
        <ReportTransactionPage />
      </DashBoardLayout>
    ),
    name: "Báo cáo sổ kho, lịch sử giao diện",
  },
  {
    path: "/dashboard/report/overstocking",
    element: (
      <DashBoardLayout>
        <OverStockingPage />
      </DashBoardLayout>
    ),
    name: "Báo cáo tồn kho vượt định mức",
  },
  {
    path: "/dashboard/report/customer/analytic_customers",
    element: (
      <DashBoardLayout>
        <ReportCustomerPage />
      </DashBoardLayout>
    ),
    name: "Báo cáo khách hàng",
  },
  {
    path: "/dashboard/report/customer/analytic_customers/customer_by_time",
    element: (
      <DashBoardLayout>
        <ReportCustomerByTimePage />
      </DashBoardLayout>
    ),
    name: "Báo cáo khách mua hàng theo thời gian",
  },
  {
    path: "/dashboard/report/customer/analytic_customers/customer_by_product",
    element: (
      <DashBoardLayout>
        <ReportCustomerByProductPage />
      </DashBoardLayout>
    ),
    name: "Báo cáo khách mua hàng theo sản phẩm",
  },
  {
    path: "/dashboard/report/customer/analytic_customers/customer_by_location",
    element: (
      <DashBoardLayout>
        <ReportCustomerByLocationPage />
      </DashBoardLayout>
    ),
    name: "Báo cáo khách mua hàng theo khu vực",
  },
  {
    path: "/dashboard/report/customer/analytic_customers/customer_by_group",
    element: (
      <DashBoardLayout>
        <ReportCustomerByGroupPage />
      </DashBoardLayout>
    ),
    name: "Báo cáo khách mua hàng theo nhóm khách hàng",
  },
  {
    path: "/dashboard/report/order/analytic_orders",
    element: (
      <DashBoardLayout>
        <ReportOrderPage />
      </DashBoardLayout>
    ),
    name: "Báo cáo bán hàng",
  },
  {
    path: "/dashboard/report/order/analytic_orders/revenue",
    element: (
      <DashBoardLayout>
        <ReportRevenuePage />
      </DashBoardLayout>
    ),
    name: "Báo cáo doanh thu bán hàng",
  },
  {
    path: "/dashboard/report/order/analytic_orders/shipments",
    element: (
      <DashBoardLayout>
        <ReportShipmentPage />
      </DashBoardLayout>
    ),
    name: "Báo cáo thông tin giao hàng",
  },
];

export default routes;
