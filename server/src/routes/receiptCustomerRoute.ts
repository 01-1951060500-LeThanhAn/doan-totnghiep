import express from "express";
import { verifyTokenAndAuthorization } from "../middleware/auth";
import {
  createReceipt,
  getReceipt,
  deleteReceipt,
  getInfoReceipt,
} from "../controller/receiptOrderController";

const router = express.Router();

router.post("/", verifyTokenAndAuthorization, createReceipt);

router.get("/", verifyTokenAndAuthorization, getReceipt);

router.delete("/:id", verifyTokenAndAuthorization, deleteReceipt);

router.get("/:id", verifyTokenAndAuthorization, getInfoReceipt);

export default router;
