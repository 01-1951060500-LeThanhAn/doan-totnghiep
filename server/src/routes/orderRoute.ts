import express from "express";
import {
  createOrder,
  getAllOrder,
  updateOrder,
  deleteOrder,
  getDetailOrder,
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

// router.post("/:id/payment", processPayment);

export default router;
