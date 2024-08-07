import express from "express";
import { verifyTokenAndAuthorization } from "../middleware/auth";
import {
  createReturnOrder,
  getReturnOrder,
  getDetailReturnOrder,
  deleteReturnOrder,
  updateReturnOrders,
  getIncomeReturnOrderByProduct,
} from "../controller/returnOrderController";

const router = express.Router();

router.post(`/`, verifyTokenAndAuthorization, createReturnOrder);

router.get(`/`, verifyTokenAndAuthorization, getReturnOrder);

router.get(`/:id`, verifyTokenAndAuthorization, getDetailReturnOrder);

router.patch("/:id", verifyTokenAndAuthorization, updateReturnOrders);

router.delete(`/:id`, verifyTokenAndAuthorization, deleteReturnOrder);

router.get(
  "/income/return-order-product",
  verifyTokenAndAuthorization,
  getIncomeReturnOrderByProduct
);

export default router;
