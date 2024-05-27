import express from "express";
import {
  createOrder,
  getAllOrder,
  updateOrder,
  deleteOrder,
  getDetailOrder,
  getIncomeOrders,
  searchOrder,
  getRevenueOrdersMonth,
  getRevenueOrdersStaff,
  getRevenueOrdersProducts,
  searchDateOrders,
  getRevenueOrdersCustomer,
  getShipmentOrdersTime,
  getShipmentOrdersStaff,
  getShipmentOrderPartner,
  getShipmentOrderGeneral,
  getPaymentOrderTime,
  getPaymentOrderStaff,
  getRevenueOrdersCustomerGroup,
  getIncomeOrdersGeneral,
  getIncomeOrdersCustomerGroup,
  getIncomeOrdersProduct,
  getIncomeOrdersArea,
} from "../controller/orderController";
import {
  verifyTokenAndAdmin,
  verifyTokenAndAuthorization,
} from "../middleware/auth";

const router = express.Router();

router.post(`/`, verifyTokenAndAuthorization, createOrder);

router.get(`/`, verifyTokenAndAuthorization, getAllOrder);

router.get(`/:id`, verifyTokenAndAuthorization, getDetailOrder);

router.patch(`/:id`, verifyTokenAndAuthorization, updateOrder);

router.delete("/:id", verifyTokenAndAuthorization, deleteOrder);

router.get("/income/revenue-orders-day", verifyTokenAndAdmin, getIncomeOrders);

router.get(
  "/income/revenue-orders-month",
  verifyTokenAndAdmin,
  getRevenueOrdersMonth
);

router.get(
  "/income/revenue-orders-staff",
  verifyTokenAndAdmin,
  getRevenueOrdersStaff
);

router.get(
  "/income/revenue-orders-product",
  verifyTokenAndAdmin,
  getRevenueOrdersProducts
);

router.get(
  "/income/revenue-orders-customer",
  verifyTokenAndAdmin,
  getRevenueOrdersCustomer
);

router.get(
  "/income/revenue-orders-customer-group",
  verifyTokenAndAdmin,
  getRevenueOrdersCustomerGroup
);

router.get(
  "/income/shipments-orders-time",
  verifyTokenAndAdmin,
  getShipmentOrdersTime
);

router.get(
  "/income/shipments-orders-staff",
  verifyTokenAndAdmin,
  getShipmentOrdersStaff
);

router.get(
  "/income/shipments-orders-partner",
  verifyTokenAndAdmin,
  getShipmentOrderPartner
);

router.get(
  "/income/shipments-orders-general",
  verifyTokenAndAdmin,
  getShipmentOrderGeneral
);

router.get(
  "/income/payments-orders-time",
  verifyTokenAndAdmin,
  getPaymentOrderTime
);

router.get(
  "/income/payments-orders-staff",
  verifyTokenAndAdmin,
  getPaymentOrderStaff
);

router.get(
  "/income/total-orders-general",
  verifyTokenAndAdmin,
  getIncomeOrdersGeneral
);

router.get(
  "/income/total-orders-area",
  verifyTokenAndAdmin,
  getIncomeOrdersArea
);

router.get(
  "/income/total-orders-product",
  verifyTokenAndAdmin,
  getIncomeOrdersProduct
);

router.get(
  "/income/total-orders-customer-group",
  verifyTokenAndAdmin,
  getIncomeOrdersCustomerGroup
);

router.get("/search/status-orders", verifyTokenAndAuthorization, searchOrder);

router.get(
  "/search/date-orders",
  verifyTokenAndAuthorization,
  searchDateOrders
);
export default router;
