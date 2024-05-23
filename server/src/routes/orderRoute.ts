import express from "express";
import {
  createOrder,
  getAllOrder,
  updateOrder,
  deleteOrder,
  getDetailOrder,
  getIncomeOrders,
  searchOrder,
  searchDateOrders,
  getIncomeOrdersCustomer,
  getIncomeOrdersGeneral,
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

router.get("/income/total-orders", verifyTokenAndAdmin, getIncomeOrders);

router.get(
  "/income/total-orders-general",
  verifyTokenAndAdmin,
  getIncomeOrdersGeneral
);

router.get(
  "/income/total-orders-customer",
  verifyTokenAndAdmin,
  getIncomeOrdersCustomer
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

router.get("/search/status-orders", verifyTokenAndAuthorization, searchOrder);

router.get(
  "/search/date-orders",
  verifyTokenAndAuthorization,
  searchDateOrders
);
export default router;
