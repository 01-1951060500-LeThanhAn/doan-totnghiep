import express from "express";
import { verifyTokenAndAuthorization } from "../middleware/auth";
import {
  createStockAdjustment,
  deleteStockAdjustment,
  getStockAdjustment,
  updateStockAdjustment,
  getDetailStockAdjustment,
  searchStockAdjustmentOrder,
} from "../controller/stockAdjustmentController";
const router = express.Router();

router.post(`/`, verifyTokenAndAuthorization, createStockAdjustment);

router.get(`/`, verifyTokenAndAuthorization, getStockAdjustment);

router.get(`/:id`, verifyTokenAndAuthorization, getDetailStockAdjustment);

router.patch(`/:id`, verifyTokenAndAuthorization, updateStockAdjustment);

router.delete(`/:id`, verifyTokenAndAuthorization, deleteStockAdjustment);

router.get(
  "/search/status-stock-adjustment",
  verifyTokenAndAuthorization,
  searchStockAdjustmentOrder
);

export default router;
