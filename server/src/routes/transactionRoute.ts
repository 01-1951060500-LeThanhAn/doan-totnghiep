import express from "express";
import {
  verifyTokenAndAdmin,
  verifyTokenAndAuthorization,
} from "../middleware/auth";
import {
  getAllTransactions,
  getDetailTransaction,
  deleteTransaction,
} from "../controller/transactionController";

const router = express.Router();

router.get("/", verifyTokenAndAuthorization, getAllTransactions);

router.get("/:id", verifyTokenAndAdmin, getDetailTransaction);

router.delete("/:id", verifyTokenAndAdmin, deleteTransaction);

export default router;
