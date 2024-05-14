import express from "express";
import { verifyTokenAndAuthorization } from "../middleware/auth";
import {
  createReceipt,
  getReceipt,
  deleteReceipt,
} from "../controller/receiptOrderController";

const router = express.Router();

router.post("/", verifyTokenAndAuthorization, createReceipt);

router.get("/", verifyTokenAndAuthorization, getReceipt);

router.delete("/:id", verifyTokenAndAuthorization, deleteReceipt);

export default router;
