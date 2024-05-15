import express from "express";
import { verifyTokenAndAuthorization } from "../middleware/auth";
import {
  createReceiptSupplier,
  deleteReceiptSupplier,
  getInfoReceiptSupplier,
  getReceiptSupplier,
} from "../controller/receiptWarehouseController";
const router = express.Router();

router.post(`/`, verifyTokenAndAuthorization, createReceiptSupplier);

router.get(`/`, verifyTokenAndAuthorization, getReceiptSupplier);

router.delete("/:id", verifyTokenAndAuthorization, deleteReceiptSupplier);
router.get("/:id", verifyTokenAndAuthorization, getInfoReceiptSupplier);

export default router;
