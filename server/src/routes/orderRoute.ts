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
  getRevenueOrdersGeneral,
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
  verifyTokenAndAuthorization,
  getRevenueOrdersMonth
);

router.get(
  "/income/revenue-orders-general",
  verifyTokenAndAuthorization,
  getRevenueOrdersGeneral
);

router.get(
  "/income/revenue-orders-staff",
  verifyTokenAndAuthorization,
  getRevenueOrdersStaff
);

router.get(
  "/income/revenue-orders-product",
  verifyTokenAndAuthorization,
  getRevenueOrdersProducts
);

router.get(
  "/income/revenue-orders-customer",
  verifyTokenAndAuthorization,
  getRevenueOrdersCustomer
);

router.get(
  "/income/revenue-orders-customer-group",
  verifyTokenAndAuthorization,
  getRevenueOrdersCustomerGroup
);

router.get(
  "/income/shipments-orders-time",
  verifyTokenAndAuthorization,
  getShipmentOrdersTime
);

router.get(
  "/income/shipments-orders-staff",
  verifyTokenAndAuthorization,
  getShipmentOrdersStaff
);

router.get(
  "/income/shipments-orders-partner",
  verifyTokenAndAuthorization,
  getShipmentOrderPartner
);

router.get(
  "/income/shipments-orders-general",
  verifyTokenAndAuthorization,
  getShipmentOrderGeneral
);

router.get(
  "/income/payments-orders-time",
  verifyTokenAndAuthorization,
  getPaymentOrderTime
);

router.get(
  "/income/payments-orders-staff",
  verifyTokenAndAuthorization,
  getPaymentOrderStaff
);

router.get(
  "/income/total-orders-general",
  verifyTokenAndAuthorization,
  getIncomeOrdersGeneral
);

router.get(
  "/income/total-orders-area",
  verifyTokenAndAuthorization,
  getIncomeOrdersArea
);

router.get(
  "/income/total-orders-product",
  verifyTokenAndAuthorization,
  getIncomeOrdersProduct
);

router.get(
  "/income/total-orders-customer-group",
  verifyTokenAndAuthorization,
  getIncomeOrdersCustomerGroup
);

router.get("/search/status-orders", verifyTokenAndAuthorization, searchOrder);

router.get(
  "/search/date-orders",
  verifyTokenAndAuthorization,
  searchDateOrders
);
export default router;
