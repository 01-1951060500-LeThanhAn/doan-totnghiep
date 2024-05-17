import express from "express";
import {
  verifyTokenAndAdmin,
  verifyTokenAndAuthorization,
} from "../middleware/auth";
import {
  getAllTransactions,
  getDetailTransaction,
  deleteTransaction,
  deleteAllTransaction,
} from "../controller/transactionController";

const router = express.Router();

router.get("/", verifyTokenAndAuthorization, getAllTransactions);

router.get("/:id", verifyTokenAndAuthorization, getDetailTransaction);

router.delete("/:id", verifyTokenAndAdmin, deleteTransaction);

router.delete("/", verifyTokenAndAuthorization, deleteAllTransaction);

export default router;
