import { Route, Routes, useNavigate } from "react-router-dom";
import LoginPage from "./pages/login/page";
import { useEffect } from "react";
import HomePage from "./pages/home/page";
import { useAppDispatch } from "./hooks/hooks";
import { logOut } from "./redux/slices/authSlice";
import setAuthToken from "./lib/setAuthToken";
import DashBoardLayout from "./layouts/layout";

import { jwtDecode, JwtPayload } from "jwt-decode";
import EditProductPage from "./pages/products/product-edit/page";
import AddProductPage from "./pages/products/product-add/page";
import AddCustomerPage from "./pages/customer/add/page";
import CustomerPage from "./components/customers/_sections/list/page";
import DetailCustomerPage from "./components/customers/detail/page";
import AddSupplierPage from "./pages/supplers/suppliers-add/page";
import SupplierPage from "./components/suppliers/_sections/list/page";
import EditSupplierPage from "./pages/supplers/suppliers-edit/page";
import DetailSupplierPage from "./components/suppliers/detail/page";
import ProductPage from "./components/products/_sections/list/page";
import ProductDetailPage from "./components/products/detail/page";
import ViewGoodReceivedPage from "./pages/good-received-note/page";
import AddGoodReceivedNotePage from "./pages/good-received-note/add/page";
import DetailGoodReceivedNotePage from "./components/good-received-note/detail/page";
import AddPurchaseOrderPage from "./pages/purchase-order/add/page";
import ViewPurchaseOrderPage from "./pages/purchase-order/page";
import DetailPurchaseOrderPage from "./components/purchase-order/detail/page";
import AddOrderPage from "./pages/order/add/page";
import AddShippingPartnerPage from "./pages/shipping-partner/add/page";
import ViewShippingPartnerPage from "./pages/shipping-partner/page";
import ViewOrderPage from "./pages/order/page";
import DetailOrderPage from "./components/order/detail/page";
import GeneralPage from "./pages/management/general/page";
import GeneralManagementPage from "./components/management/general/list/_sections/general";
import DetailManagementGeneralPage from "./components/management/general/detail/page";
import DetailShippingPartnerPage from "./components/shipping-partner/detail/page";
import EditShippingPartnerPage from "./pages/shipping-partner/edit/page";
import DeliveryNotePage from "./pages/delivery-note/page";
import AddDeliveryNotePage from "./pages/delivery-note/add/page";
import DetailDeliveryNotepage from "./components/delivery-note/detail/page";
import StaffPage from "./pages/management/staff/page";
import AddStaffPage from "./pages/management/staff/add/page";
import AddGeneralPage from "./pages/management/general/add/page";
import EditGeneralPage from "./pages/management/general/edit/page";
import ViewCategoryPage from "./pages/management/category/page";
import AddCategoryPage from "./pages/management/category/add/page";
import DetailCategoryPage from "./components/management/category/detail/page";
import ReportPage from "./pages/report/page";
import ReportGeneralPage from "./pages/report/general/page";
import ReportTransactionPage from "./pages/report/general/transaction/page";
import OverStockingPage from "./pages/report/general/overstocking/page";
import FinancePage from "./pages/report/finance/page";
import DebtCustomersPage from "./components/report/finance/debt-customers/list/page";
import DebtSuppliersPage from "./components/report/finance/debt-suppliers/list/page";
import AdjustmentPricePage from "./pages/management/price/page";
import EditAdjustmentPricePage from "./pages/management/price/edit/page";
import ViewReturnOrderPage from "./pages/return-order/page";
import AddReturnOrderPage from "./pages/return-order/add/page";
import DetailReturnOrderPage from "./components/return-order/detail/page";
import EditCustomerPage from "./pages/customer/edit/page";
import DetailReceiptCustomerPage from "./components/receipts/receipts-customer/detail/page";
import AddReceiptCustomerPage from "./pages/receipts/receipt-customer/add/page";
import ViewReceiptCustomerPage from "./pages/receipts/receipt-customer/page";
import ViewReceiptSupplierPage from "./pages/receipts/receipt-supplier/page";
import AddReceiptSupplierPage from "./pages/receipts/receipt-supplier/add/page";
import DetailReceiptSupplierPage from "./components/receipts/receipt-supplier/detail/page";

const App = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("token") === null) {
      dispatch(logOut());
      navigate("/dashboard/login");
    } else {
      setAuthToken(localStorage.getItem("token"));
    }
  }, [dispatch, navigate]);
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decodedToken = jwtDecode<JwtPayload>(token);
        if (decodedToken && decodedToken.exp) {
          const expireTime = decodedToken.exp * 1000;
          if (Date.now() > expireTime) {
            localStorage.removeItem("token");
            localStorage.removeItem("userInfo");
          }
        }
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    }
  }, []);

  return (
    <Routes>
      <Route path="/dashboard/login" element={<LoginPage />} />
      <Route path="/dashboard" element={<HomePage />} />
      <Route
        path="/dashboard/add-product"
        element={
          <DashBoardLayout>
            <AddProductPage />
          </DashBoardLayout>
        }
      />
      <Route
        path="/dashboard/product"
        element={
          <DashBoardLayout>
            <ProductPage />
          </DashBoardLayout>
        }
      />
      <Route
        path="/dashboard/product/:productId/detail"
        element={
          <DashBoardLayout>
            <ProductDetailPage />
          </DashBoardLayout>
        }
      />
      <Route
        path="/dashboard/product/:productId/edit"
        element={
          <DashBoardLayout>
            <EditProductPage />
          </DashBoardLayout>
        }
      />

      <Route
        path="/dashboard/customer/create"
        element={
          <DashBoardLayout>
            <AddCustomerPage />
          </DashBoardLayout>
        }
      />
      <Route
        path="/dashboard/customer"
        element={
          <DashBoardLayout>
            <CustomerPage />
          </DashBoardLayout>
        }
      />
      <Route
        path="/dashboard/customer/:customerId/detail"
        element={
          <DashBoardLayout>
            <DetailCustomerPage />
          </DashBoardLayout>
        }
      />

      <Route
        path="/dashboard/customer/:customerId/edit"
        element={
          <DashBoardLayout>
            <EditCustomerPage />
          </DashBoardLayout>
        }
      />

      <Route
        path="/dashboard/supplier"
        element={
          <DashBoardLayout>
            <SupplierPage />
          </DashBoardLayout>
        }
      />

      <Route
        path="/dashboard/supplier/create"
        element={
          <DashBoardLayout>
            <AddSupplierPage />
          </DashBoardLayout>
        }
      />
      <Route
        path="/dashboard/supplier/:supplierId/edit"
        element={
          <DashBoardLayout>
            <EditSupplierPage />
          </DashBoardLayout>
        }
      />

      <Route
        path="/dashboard/supplier/:supplierId/detail"
        element={
          <DashBoardLayout>
            <DetailSupplierPage />
          </DashBoardLayout>
        }
      />

      <Route
        path="/dashboard/good-received-note"
        element={
          <DashBoardLayout>
            <ViewGoodReceivedPage />
          </DashBoardLayout>
        }
      />

      <Route
        path="/dashboard/good-received-note/create"
        element={
          <DashBoardLayout>
            <AddGoodReceivedNotePage />
          </DashBoardLayout>
        }
      />
      <Route
        path="/dashboard/good-received-note/:grnId/detail"
        element={
          <DashBoardLayout>
            <DetailGoodReceivedNotePage />
          </DashBoardLayout>
        }
      />
      <Route
        path="/dashboard/purchase-order"
        element={
          <DashBoardLayout>
            <ViewPurchaseOrderPage />
          </DashBoardLayout>
        }
      />
      <Route
        path="/dashboard/purchase-order/:purchaseOrderId/detail"
        element={
          <DashBoardLayout>
            <DetailPurchaseOrderPage />
          </DashBoardLayout>
        }
      />
      <Route
        path="/dashboard/purchase-order/create"
        element={
          <DashBoardLayout>
            <AddPurchaseOrderPage />
          </DashBoardLayout>
        }
      />

      <Route
        path="/dashboard/orders"
        element={
          <DashBoardLayout>
            <ViewOrderPage />
          </DashBoardLayout>
        }
      />
      <Route
        path="/dashboard/orders/create"
        element={
          <DashBoardLayout>
            <AddOrderPage />
          </DashBoardLayout>
        }
      />

      <Route
        path="/dashboard/orders/:orderId/detail"
        element={
          <DashBoardLayout>
            <DetailOrderPage />
          </DashBoardLayout>
        }
      />

      <Route
        path="/dashboard/shipping-partner"
        element={
          <DashBoardLayout>
            <ViewShippingPartnerPage />
          </DashBoardLayout>
        }
      />

      <Route
        path="/dashboard/shipping-partner/create"
        element={
          <DashBoardLayout>
            <AddShippingPartnerPage />
          </DashBoardLayout>
        }
      />

      <Route
        path="/dashboard/shipping-partner/:shipId/detail"
        element={
          <DashBoardLayout>
            <DetailShippingPartnerPage />
          </DashBoardLayout>
        }
      />

      <Route
        path="/dashboard/shipping-partner/:shipId/edit"
        element={
          <DashBoardLayout>
            <EditShippingPartnerPage />
          </DashBoardLayout>
        }
      />

      <Route
        path="/dashboard/management"
        element={
          <DashBoardLayout>
            <GeneralPage />
          </DashBoardLayout>
        }
      />

      <Route
        path="/dashboard/management/general"
        element={
          <DashBoardLayout>
            <GeneralManagementPage />
          </DashBoardLayout>
        }
      />

      <Route
        path="/dashboard/management/general/create"
        element={
          <DashBoardLayout>
            <AddGeneralPage />
          </DashBoardLayout>
        }
      />

      <Route
        path="/dashboard/management/general/:generalId/detail"
        element={
          <DashBoardLayout>
            <DetailManagementGeneralPage />
          </DashBoardLayout>
        }
      />
      <Route
        path="/dashboard/management/general/:generalId/edit"
        element={
          <DashBoardLayout>
            <EditGeneralPage />
          </DashBoardLayout>
        }
      />

      <Route
        path="/dashboard/management/staff"
        element={
          <DashBoardLayout>
            <StaffPage />
          </DashBoardLayout>
        }
      />

      <Route
        path="/dashboard/management/staff/create"
        element={
          <DashBoardLayout>
            <AddStaffPage />
          </DashBoardLayout>
        }
      />

      <Route
        path="/dashboard/delivery-note"
        element={
          <DashBoardLayout>
            <DeliveryNotePage />
          </DashBoardLayout>
        }
      />

      <Route
        path="/dashboard/delivery-note/:deliveryNoteId/detail"
        element={
          <DashBoardLayout>
            <DetailDeliveryNotepage />
          </DashBoardLayout>
        }
      />

      <Route
        path="/dashboard/delivery-note/create"
        element={
          <DashBoardLayout>
            <AddDeliveryNotePage />
          </DashBoardLayout>
        }
      />

      <Route
        path="/dashboard/management/category"
        element={
          <DashBoardLayout>
            <ViewCategoryPage />
          </DashBoardLayout>
        }
      />

      <Route
        path="/dashboard/management/adjustment_price"
        element={
          <DashBoardLayout>
            <AdjustmentPricePage />
          </DashBoardLayout>
        }
      />

      <Route
        path="/dashboard/management/adjustment_price/:adjustmentpriceId/edit"
        element={
          <DashBoardLayout>
            <EditAdjustmentPricePage />
          </DashBoardLayout>
        }
      />

      <Route
        path="/dashboard/management/category/create"
        element={
          <DashBoardLayout>
            <AddCategoryPage />
          </DashBoardLayout>
        }
      />

      <Route
        path="/dashboard/management/category/:categoryId/detail"
        element={
          <DashBoardLayout>
            <DetailCategoryPage />
          </DashBoardLayout>
        }
      />

      <Route
        path="/dashboard/return-order"
        element={
          <DashBoardLayout>
            <ViewReturnOrderPage />
          </DashBoardLayout>
        }
      />

      <Route
        path="/dashboard/return-orders/:returnOrderId/create"
        element={
          <DashBoardLayout>
            <AddReturnOrderPage />
          </DashBoardLayout>
        }
      />

      <Route
        path="/dashboard/return-orders/:returnOrderId/detail"
        element={
          <DashBoardLayout>
            <DetailReturnOrderPage />
          </DashBoardLayout>
        }
      />

      <Route
        path="/dashboard/receipt_vouchers/customers"
        element={
          <DashBoardLayout>
            <ViewReceiptCustomerPage />
          </DashBoardLayout>
        }
      />

      <Route
        path="/dashboard/receipt_vouchers/customers/:receiptId/detail"
        element={
          <DashBoardLayout>
            <DetailReceiptCustomerPage />
          </DashBoardLayout>
        }
      />

      <Route
        path="/dashboard/receipt_vouchers/customers/create"
        element={
          <DashBoardLayout>
            <AddReceiptCustomerPage />
          </DashBoardLayout>
        }
      />

      <Route
        path="/dashboard/receipt_vouchers/suppliers"
        element={
          <DashBoardLayout>
            <ViewReceiptSupplierPage />
          </DashBoardLayout>
        }
      />

      <Route
        path="/dashboard/receipt_vouchers/suppliers/:receiptId/detail"
        element={
          <DashBoardLayout>
            <DetailReceiptSupplierPage />
          </DashBoardLayout>
        }
      />

      <Route
        path="/dashboard/receipt_vouchers/suppliers/create"
        element={
          <DashBoardLayout>
            <AddReceiptSupplierPage />
          </DashBoardLayout>
        }
      />

      <Route
        path="/dashboard/report"
        element={
          <DashBoardLayout>
            <ReportPage />
          </DashBoardLayout>
        }
      />

      <Route
        path="/dashboard/report/general"
        element={
          <DashBoardLayout>
            <ReportGeneralPage />
          </DashBoardLayout>
        }
      />

      <Route
        path="/dashboard/report/finance"
        element={
          <DashBoardLayout>
            <FinancePage />
          </DashBoardLayout>
        }
      />

      <Route
        path="/dashboard/report/debt/customers"
        element={
          <DashBoardLayout>
            <DebtCustomersPage />
          </DashBoardLayout>
        }
      />

      <Route
        path="/dashboard/report/debt/suppliers"
        element={
          <DashBoardLayout>
            <DebtSuppliersPage />
          </DashBoardLayout>
        }
      />

      <Route
        path="/dashboard/report/transaction"
        element={
          <DashBoardLayout>
            <ReportTransactionPage />
          </DashBoardLayout>
        }
      />

      <Route
        path="/dashboard/report/overstocking"
        element={
          <DashBoardLayout>
            <OverStockingPage />
          </DashBoardLayout>
        }
      />
    </Routes>
  );
};

export default App;
