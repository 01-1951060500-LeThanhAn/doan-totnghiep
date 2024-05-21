import { configureStore, combineReducers } from "@reduxjs/toolkit";
import productSlice from "./slices/productSlice";
import authSlice from "./slices/authSlice";
import { userSlice } from "./slices/userSlice";
import supplierSlice from "./slices/supplierSlice";
import { grnSlice } from "./slices/grnSlice";
import purchaseOrderSlice from "./slices/purchaseOrderSlice";
import partnerSlice from "./slices/partnerSlice";
import orderSlice from "./slices/orderSlice";
import deliverySlice from "./slices/deliverySlice";
import { generalSlice } from "./slices/generalSlice";
import staffSlice from "./slices/staffSlice";
import categorySlice from "./slices/categorySlice";
import returnOrderSlice from "./slices/returnOrderSlice";
import customerSlice from "./slices/customerSlice";
import receiptSlice from "./slices/receiptSlice";
import receiptSupplierSlice from "./slices/receiptSupplierSlice";
import transactionSlice from "./slices/transactionSlice";
import stockAdjustmentSlice from "./slices/stockAdjustmentSlice";

const rootRSlice = combineReducers({
  auth: authSlice,
  products: productSlice,
  users: userSlice,
  suppliers: supplierSlice,
  grn: grnSlice,
  purchaseOrders: purchaseOrderSlice,
  partner: partnerSlice,
  orders: orderSlice,
  deliveryNotes: deliverySlice,
  generals: generalSlice,
  staffs: staffSlice,
  categorys: categorySlice,
  returnOrders: returnOrderSlice,
  customer: customerSlice,
  receipt: receiptSlice,
  receiptSupplier: receiptSupplierSlice,
  transaction: transactionSlice,
  stockAdjustment: stockAdjustmentSlice,
});

export const store = configureStore({
  reducer: rootRSlice,
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
