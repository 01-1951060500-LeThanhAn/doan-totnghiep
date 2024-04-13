import express from "express";
import {
  createOrder,
  getAllOrder,
  updateOrder,
  deleteOrder,
  getDetailOrder,
  getIncomeOrders,
  searchOrder,
} from "../controller/orderController";
import {
  verifyTokenAndAdmin,
  verifyTokenAndAuthorization,
} from "../middleware/auth";

const router = express.Router();

router.post(`/`, verifyTokenAndAdmin, createOrder);

router.get(`/`, verifyTokenAndAdmin, getAllOrder);

router.get(`/:id`, getDetailOrder);

router.patch(`/:id`, verifyTokenAndAuthorization, updateOrder);

router.delete("/:id", verifyTokenAndAuthorization, deleteOrder);

router.get("/income/total-orders", verifyTokenAndAdmin, getIncomeOrders);

router.get("/search/category-orders", searchOrder);

export default router;
