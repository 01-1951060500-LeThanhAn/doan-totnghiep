import express from "express";
import { verifyTokenAndAdmin } from "../middleware/auth";
import {
  createCustomer,
  deleteCustomer,
  getHistoryOrder,
  getInfoCustomer,
  getListCustomer,
} from "../controller/customerController";

const router = express.Router();

router.post("/", verifyTokenAndAdmin, createCustomer);

router.get(`/`, verifyTokenAndAdmin, getListCustomer);

router.get("/:id", getInfoCustomer);

router.delete("/:id", deleteCustomer);

router.get("/history/:id", verifyTokenAndAdmin, getHistoryOrder);

export default router;
